const Router = require('koa-router');
const Auth = require('../../middlewares/auth');
const Category = require('../models/Category');
const CategoryValidate = require('../validators/CategoryValidate');
const { HttpException,ParameterException } = require('../utils/http-exception');

const router = new Router({
    prefix:'/category'
});

//添加分类路由
router.post('/add',async (ctx,next) => {
    /**
     * 参数： category_name   sort
     */
    const v = new CategoryValidate(ctx.request.body);
    const category_name = v.get('category_name');
    const sort = v.get('sort');

    await Category.verifyCategoryNameRepeat(category_name);

    const result = await Category.create({category_name,sort})
    if(result){
        ctx.body = {
            code:200,
            msg:'success',
            data:1
        }
    }else{
        ctx.body = {
            code:400,
            msg:'fail'
        }
    }
});    


//查询分类列表路由
router.get('/',async (ctx,next) => {
    /**
     * 参数：pageSize  pageCurrent   category_name
     */

    const result = await Category.findAllCategory(ctx.request.body);


    if(result){
        ctx.body = {
            code:200,
            msg:'success',
            data:result
        }
    }else{
        ctx.body = {
            code:400,
            msg:'fail'
        }
    }

});

//获取单个分类详情
router.get('/detail/:id',(ctx,next) => {
    /**
     * params: id
     */
});

//删除分类路由
router.post('/delete',(ctx,next) => {
    /**
     * 参数: id
     */
});

//修改分类
router.post('/edit',async (ctx,next) => {
    /**
     * 参数: id   category_name  sort
     */
    const result = await Category.updateCategory(ctx.request.body)
    if(result){
        ctx.body = {
            code:200,
            msg:'success',
            data:1
        }
    }else{
        ctx.body = {
            code:400,
            msg:'fail'
        }
    }
});

module.exports = router;