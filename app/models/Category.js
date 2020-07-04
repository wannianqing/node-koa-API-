const { Sequelize,Model } = require('sequelize');
const connect = require('../utils/db');
const { ParameterException, HttpException } = require('../utils/http-exception');

class Category extends Model {
    static async verifyCategoryNameRepeat(categoryName){
        const category = await Category.findOne({
            where:{
                category_name:categoryName
            }
        })
        if(category){
            throw new ParameterException('分类已存在')
        }
        return category;
    }

    static async findAllCategory(prams){
        const {pageCurrent,pageSize,categoryName} = prams;
        let offset = pageCurrent ? (pageCurrent - 1) : 0;
        let limit = pageSize ? pageSize : 10;

        let whereObj = categoryName ? {category_name:categoryName} : {}

        const list = await Category.findAll({
            where:whereObj,
            limit,
            offset
        })

        const {count} = await Category.findAndCountAll();

        return {
            list,
            total:count,
            pageCurrent:offset+1,
            pageSize:limit
        }
    }

    static async updateCategory(prams){
        const {id, category_name, sort} = prams;
        if(!id){
            throw new HttpException()
        }

        const category = await Category.findOne({
            where:{
                id:id
            }
        })
        if(!category){
            throw new ParameterException('参数错误，分类不存在')
        }

        const result = await Category.update(
            {id, category_name, sort},{
                where:{
                    id:id
                }
            }
        )

        return result
        
    }
}

Category.init({
    'category_name':Sequelize.STRING,
    sort:Sequelize.INTEGER
},{
    sequelize:connect,
    tableName:'category'
})

module.exports = Category;