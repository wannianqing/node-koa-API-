## 数据库设计

#### 创建数据库 node_blog

```sql
CREATE DATABASE IF NOT EXISTS node_blog DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```

#### 创建user表

```SQL
CREATE TABLE IF NOT EXISTS user(
	id INT(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '管理员id',
    username VARCHAR(10) NOT NULL COMMENT '管理员用户名',
    password VARCHAR(20) NOT NULL COMMENT '管理员密码',
    createAt INT(11) COMMENT '创建时间',
    updateAt INT(11) COMMENT '更改时间'
)ENGINE=InnoDB;
```

#### 创建category表

```sql
CREATE TABLE IF NOT EXISTS category(
	id INT(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '分类id',
    category_name VARCHAR(20) NOT NULL COMMENT '分类名',
    sort TINYINT NOT NULL DEFAULT 0 COMMENT '排序',
    createdAt INT(11) COMMENT '创建时间',
    updatedAt INT(11) COMMENT '更改时间'
)ENGINE=InnoDB;
```

#### 创建文章article表

```sql
CREATE TABLE IF NOT EXISTS article(
    
)ENGINE=InnoDB;
```





## 接口文档

#### 获取token

| 功能     | 接口      |
| -------- | --------- |
| URL      | /v1/token |
| 请求方式 | POST      |

请求参数

| 参数名   | 类型   | 是否必须 | 说明       |
| -------- | ------ | -------- | ---------- |
| username | String | 是       | 输入用户名 |
| password | String | 是       | 输入密码   |

返回数据

| 字段名 | 类型   | 说明        |
| ------ | ------ | ----------- |
| code   | Int    | 状态码      |
| msg    | String | 状态说明    |
| token  | String | token字符串 |

```json
{
    'code':200,
    'msg':'success',
    'token':'fwlejflgwg45w4gfewge45gwe64w6ge'
}
```



#### 登录

| 功能     | 接口   |
| -------- | ------ |
| URL      | /login |
| 请求方式 | POST   |

请求参数

| 参数名   | 类型   | 是否必须 | 说明           |
| -------- | ------ | -------- | -------------- |
| username | String | 是       | 后台登录用户名 |
| password | String | 是       | 后台登录密码   |

返回数据

| 字段名 | 类型   | 说明       |
| ------ | ------ | ---------- |
| code   | Int    | 错误码     |
| msg    | String | 错误信息   |
| token  | String | 管理员信息 |

示例

```json
{
    'code':200,
    'msg':'success',
    'token':'fwlejflgwg45w4gfewge45gwe64w6ge'
}
```



#### 文章分类添加

| 功能   | 接口         |
| ------ | ------------ |
| URL    | /article/add |
| METHOD | post         |

请求参数

| 参数名        | 类型   | 说明             |
| ------------- | ------ | ---------------- |
| category_name | String | 分类名           |
| sort          | Int    | 排序(越小排越后) |

返回数据

| 字段名 | 类型   | 说明                |
| ------ | ------ | ------------------- |
| code   | Int    | 错误码              |
| msg    | String | 错误信息            |
| data   |        | 成功为 1 错误为提示 |

示例

```json
{
    "code": 200,
    "msg": "success",
    "data": 1
}
```

#### 文章分类列表

| 功能   | 接口      |
| ------ | --------- |
| URL    | /category |
| METHOD | get       |

请求参数

| 参数名        | 类型   | 必需 | 说明         |
| ------------- | ------ | ---- | ------------ |
| pageCurrent   | Int    | 否   | 查找第几页   |
| pageSize      | Int    | 否   | 每页显示条数 |
| category_name | String | 否   | 按名称查找   |

返回数据

| 字段名        | 类型   | 说明             |
| ------------- | ------ | ---------------- |
| code          | Int    | 错误码           |
| msg           | String | 错误信息         |
| data          | Obj    | 分类数据对象信息 |
| list          | Array  | 分类信息列表     |
| id            | Int    | 分类id           |
| category_name | String | 分类名称         |
| sort          | Int    | 排序权重         |
| createdAt     | Int    | 创建时间         |
| updatedAt     | Int    | 更新时间         |
| total         | Int    | 列表总数         |
| pageCurrent   | Int    | 当前页           |
| pageSize      | Int    | 每页显示数量     |

```json
{
    "code": 200,
    "msg": "success",
    "data": {
        "list": [
            {
                "id": 1,
                "category_name": "HTML",
                "sort": 0,
                "createdAt": 2020,
                "updatedAt": 2020
            },
            {
                "id": 2,
                "category_name": "JAVASCRIPT",
                "sort": 0,
                "createdAt": 2020,
                "updatedAt": 2020
            }
        ],
        "total": 2,
        "pageCurrent": 1,
        "pageSize": 10
    }
}
```

#### 文章分类修改

| 功能   | 接口           |
| ------ | -------------- |
| URL    | /category/edit |
| METHOD | POST           |

请求参数

| 参数名        | 类型   | 必需 | 说明         |
| ------------- | ------ | ---- | ------------ |
| id            | Int    | 是   | 修改的分类id |
| category_name | String | 否   | 修改名       |
| sort          | Int    | 否   | 修改排序     |

返回数据

| 字段名 | 类型   | 说明     |
| ------ | ------ | -------- |
| code   | Int    | 错误码   |
| msg    | String | 错误信息 |
| data   |        | 成功为1  |

示例

```json
{
    "code": 200,
    "msg": "success",
    "data": 1
}
```



## 开发文档

#### 技术栈

服务端 Node+Koa框架开发API

数据库 mysql

#### 项目功能

- 分类管理
- 文章管理
- 小程序相关管理

#### 涉及到知识点

- koa koa-router开发api接口
- sequelize框架处理数据库操作
- koa-router路由拆分
- koa-bodyparser中间件接收body参数请求
- require-directory 处理路由文件自动引入
- jsonwebtoken生成令牌，检验令牌

#### 项目结构

<img src="https://ae01.alicdn.com/kf/He80de60eae6a417ca4d8f49531037d09g.jpg" />

主入口文件为index.js。 

```javascript
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const InitManager = require('./core/init');
const catcheError = require('./middlewares/catcheError');

const app = new Koa();

app.use(bodyParser());
app.use(catcheError);

InitManager.init(app);

app.listen(3001)
```

InitManager是自定义的一个初始化类

```javascript
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
```

中间件catcheError捕获全局异常

```javascript
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
```

api中按照功能模块拆分路由，如：article.js管理文章模块路由，category.js管理分类模块路由

category.js

```javascript
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
```

在api中引入对应模块的模型类，模型类也按照功能划分

models/category.js

```javascript
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
```





