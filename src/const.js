exports.base = {
    // ROOT: /^((?!manager).)*$/,
    ROOT: '/',
    MANAGER: '/manager/',
    LOGIN: '/manager/login',
}

exports.blog = {
    ROOT: '/manager/blog',
    VUE_ROOT: '/blog',
    ADD: '/manager/blog/add',
    DEL: '/manager/blog/del',
    UPDATE: '/manager/blog/update',
    QUERY_LIST: '/manager/blog/queryList',
    QUERY_BY_ID: '/manager/blog/queryId',
    TAG_INIT: '/manager/blog/tagInit',
    ADD_TAG: '/manager/blog/addTag',
    DEL_TAG: '/manager/blog/delTag'
}

exports.article = {
    ROOT: '/manager/article',
    VUE_ROOT: '/article',
    ADD: '/manager/article/add',
    DEL: '/manager/article/del',
    UPDATE: '/manager/article/update',
    QUERY_LIST: '/manager/article/queryList',
    QUERY_BY_ID: '/manager/article/queryById',
    ADD_TAG: '/manager/blog/addTag',
    DEL_TAG: '/manager/blog/delTag'
}

exports.tips = {
    ROOT: '/manager/tips',
    VUE_ROOT: '/tips',
    QUERY_LIST: '/manager/tips/queryList',
    QUERY_BY_ID: '/manager/tips/queryById',
    ADD: '/manager/tips/add',
    DEL: '/manager/tips/del',
    UPDATE: '/manager/tips/update'
}

exports.about = {
    QUERY: '/manager/about/query',
    UPDATE: '/manager/about/update'
}

exports.banner = {
    QUERY_BY_ID: '/manager/banner/queryById',
    QUERY_LIST: '/manager/banner/queryList',
    ADD: '/manager/banner/add',
    UPDATE: '/manager/banner/update',
    DEL: '/manager/banner/del'
}

exports.app = {
    QUERY_BLOG_LIST: '/app/blogList',
    QUERY_BLOG :'/app/blog',
    QUERY_ARTICLE: '/app/query',
    QUERY_ARTICLE_LIST: '/app/articleList',
    QUERY_TIPS_LIST: '/app/tipsList',
    QUERY_TIPS: '/app/tips',
    QUERY_ABOUT: '/app/about',
    QUERY_BANNER: '/app/banner'
}
