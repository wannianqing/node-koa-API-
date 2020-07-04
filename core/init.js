const requireDirectory = require('require-directory');
const Router = require('koa-router');
const config = require('../app/utils/config');

class InitManager{
    constructor(){

    }

    static init(app){
        InitManager.app = app;
        InitManager.initLoaderApi();
        InitManager.initConfig();
    }

    static initLoaderApi(){
        const requireApiDirectory = `${process.cwd()}/app/api`;
        
        requireDirectory(module,requireApiDirectory,{visit:visitor});

        function visitor(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes());
            }
        }
    }

    static initConfig(){
        global.config = config
    }
}

module.exports = InitManager;