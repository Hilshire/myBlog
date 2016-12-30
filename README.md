# Hilshire's Blog

sqlite + express + webpack + vue

简易的博客，包含一个展示页面和一个后台管理页面。目前，仅完成初步的功能。这个初步是什么概念呢？就是说连分页都没有完成，嗯。

但它的基本功能是好的。你可以增加、修改和删除博客，并给它加tag。所以，我还是把它布到了网上。欢迎诸位去做客：

`www.hilshire.net`

用的搬瓦工的vps，没有专门去优化，如果没有vpn可能会上不去。
###start
该项目尚未完成，不过你可以调试它

    npm install             // 安装依赖
    node server/setup.js    // 创建数据库
    node server.js          // 运行服务

    // 调试
    npm run dev             

    // 部署
    npm run start

默认的用户名和密码，可以在`server／schema.sql`里修改。

username: admin

password: 123456

未来会逐渐完善功能与样式，直到它变成一个炫酷的网站，大概。
###环境
node v4.0以上
sqlite3
～～由于使用了fetch，目前仅支持chrome和firefox～～

### todos
不保证完成

- ～～fetch polyfil～～
- ～～分页～～
- 响应式
- 留言
- 搜索