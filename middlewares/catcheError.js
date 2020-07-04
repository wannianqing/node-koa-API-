const { HttpException } = require('../app/utils/http-exception');
const catcheError = async (ctx,next) => {
    try {
        await next();
    } catch (error) {
        ctx.body = {
            msg:error.msg,
            code:error.code,
            errorCode:error.errorCode
        }
    }
}

module.exports = catcheError;