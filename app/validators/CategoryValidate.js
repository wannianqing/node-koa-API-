const { HttpException,ParameterException } = require('../utils/http-exception');
const { validateNull } = require('../utils/util');
class CategoryValidate{
    constructor(param){
        this.param = param;
        

        this.validate();
    }

    validate(){
        const {category_name,sort} = this.param;
        
        if(validateNull(category_name)){
            throw new ParameterException('分类名称不能为空')
        }
    }

    get(p){
        const keys = Object.keys(this.param);
        if(keys.indexOf(p) < 0){
            throw new ParameterException('该字段不存在');
        }
        return this.param[p];
    }
}

module.exports = CategoryValidate;