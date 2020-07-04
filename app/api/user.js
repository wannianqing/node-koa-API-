const Router = require('koa-router');
const { HttpException } = require('../../core/http-exception');

const router = new Router({
    prefix:'/user'
});

router.get('/',(ctx,next) => {

    throw new HttpException();

    ctx.body = {
        'user':'get user'
    }
});

module.exports = router;