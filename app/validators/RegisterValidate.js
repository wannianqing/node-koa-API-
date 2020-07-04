const { HttpException,ParameterException } = require('../utils/http-exception');
const { validateNull } = require('../utils/util');
class RegisterValidate{
    constructor(param){
        this.param = param;
        this.pwdReg = /^[a-z]\w{5,9}$/;     //以字母开头的6~10位字符

        this.validate();
    }

    validate(){
        const {username,password} = this.param;
        
        if(validateNull(username)){
            throw new ParameterException('用户名不能为空');
        }

        if(!this.pwdReg.test(password)){
            throw new ParameterException('密码为6~10位字符，以字母开头');
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

module.exports = RegisterValidate;