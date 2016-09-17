# myblog

hilshire's blog

sqlite + express + webpack + vue

简易的博客，（计划）包含一个展示页面和一个后台管理页面。目前，仅完成blog表的增删改查操纵。样式方面也没有调整
###start
该项目尚未完成，不过你可以调试它
npm install
node server.js
npm run dev

访问localhost:8080/manager进入管理页面

第一次运行，需要手动运行server目录下的schema.sql

访问localhost:8080/login可以进入一个登录界面，但是网站本身没有账户管理功能，即使没有登录也可以访问管理页。

登录功能本身是有的，需要你手动插入一条记录到account表里。

未来会逐渐完善功能与样式，直到它变成一个炫酷的网站，大概。


