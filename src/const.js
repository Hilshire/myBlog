exports.base = {
    //不包含manager的url
    ROOT: /^((?!manager).)*$/,
    MANAGER: '/manager',
    MANAGER_ALL: '/manager/*',
    LOGIN: '/manager/login',
}

exports.blog = {
    ROOT: '/manager/blog',
    VUE_ROOT: '/blog',
    ADD: '/manager/addBlog',
    DEL: '/manager/delBlog',
    UPDATE: '/manager/updateBlog',
    QUERY_LIST: '/manager/queryBlogList',
    QUERY_BY_ID: '/manager/queryBlogById',
    TAG_INIT: '/manager/blog/tagInit',
    ADD_TAG: '/manager/blog/addTag',
    DEL_TAG: '/manager/blog/delTag'
}

exports.project = {
    ROOT: '/manager/project',
    VUE_ROOT: '/project',
    ADD: '/manager/addProject',
    DEL: '/manager/delProject',
    UPDATE: '/manager/updateProject',
    QUERY_LIST: '/manager/queryProjectList',
    QUERY_BY_ID: '/manager/queryProjectById'
}
