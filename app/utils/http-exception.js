class HttpException extends Error{
    constructor(msg='服务器错误',code=500,errorCode=10000){
        super();
        this.msg = msg;
        this.code = code;
        this.errorCode=10000
    }
}


class ParameterException extends HttpException{
    constructor(msg,errorCode){
        super();
        this.msg = msg || '参数错误';
        this.code = 400;
        this.errorCode = errorCode || '10001'
    }
}

class Forbbiden extends HttpException{
    constructor(msg,errorCode){
        super();
        this.msg = msg || '禁止访问';
        this.code = 403;
        this.errorCode = errorCode || '10001'
    }
}


module.exports = {
    HttpException,
    ParameterException,
    Forbbiden
}