exports.base = {
    ROOT: '/',
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
    QUERY_BY_ID: '/manager/queryBlogById'
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
