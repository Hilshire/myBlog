# Hilshire's Blog

sqlite + express + webpack + vue

个人博客。在线地址：

`hilshire.net`

### start

    npm install             // 安装依赖
    node server/setup.js    // 创建数据库
    node server.js          // 运行服务

    // 调试
    npm run dev             

    // 启动
    npm run start

默认的用户名和密码，可以在`server／schema.sql`里修改。

username: admin

password: 123456

未来会逐渐完善功能与样式，直到它变成一个炫酷的网站，大概。

### 环境
node v7.0以上
sqlite3

### 关于测试
如您所见，这个项目是有测试的，但是这些测试已经过期了。在该项目中我没有做持续集成。

> Think before you type

在写这个项目时，我尚未正真理解这句话。

关于这个blog，我正考虑用koa2和react重写它。在那时我会仔细思考测试的位置，以及适当的做法。

### todos
不保证完成

- ~~fetch polyfil~~
- ~~分页~~
- ~~留言~~
- 搜索
