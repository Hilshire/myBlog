# myblog

hilshire's blog

sqlite + express + webpack + vue

简易的博客，（计划）包含一个展示页面和一个后台管理页面。目前，仅完成blog表的增删改查操纵。样式方面也没有调整
###start
该项目尚未完成，不过你可以调试它

    npm install

    node server.js

    npm run dev

第一次运行，需要手动运行server/schema.sql
然后访问 `http://localhost:8080/manager/login`
username: admin
password: 123456


未来会逐渐完善功能与样式，直到它变成一个炫酷的网站，大概。
### Q&A
Q:为什么写了这个项目

A:一方面自己用，一方面为了找工作时给人看。我到现在还记得找第一份工作时写的那个静态页面（笑）。

Q:why nodejs?

A:我本职是前端，第一次尝试搭建后台，于是在ruby、python和node中选择了node。此外，我觉得前端想要了解后端的知识是理所当然的事，反之亦然。

Q:你的后台代码看上去很乱

A:是的。我需要时间和经验。

Q:你几乎没有写样式

A:管理页要什么样式...其实最主要的还是时间不够。另一方面，我确实对交互逻辑更感兴趣。

Q:测试？

A:会有的。

Q:自己评价一下这个项目？

A:初学者水平的node（我也确实是初学者）和玩具般的vue运用。不过我自己倒是挺满意的。因为写了一些让我觉得有趣的代码。
