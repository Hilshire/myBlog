<template>
    <div class='container'>
        <blog-prev v-for='blog in blogs'
                   :title='blog.title' :time='blog.time' :id='blog.id' :summary='blog.summary'
                   :divider='$index !== blogs.length - 1'></blog-prev>
        <p class="error" v-if="!hasContent">这里什么都没有哦。</p>
        <pagination total=15 current=1 :set-page="setPage"></pagination>
    </div>
</template>
<script type='text/babel'>
    'use strict'

    import BlogPrev from './BlogPrev.vue'
    import Pagination from '../Pagination.vue'
    import {app} from '../../transform'
    import * as utils from '../../utils.js'

    export default{
        data(){
            let ep = this.ep = app.blog.ep
            return {
                blogs: [],
                hasContent: true
            }
        },
        ready() {
            let ep = this.ep

            app.blog.queryList(ep)
            ep.on('queryList', result => {
                this.$data.blogs = result

                // 判断是否有内容。
                // 如果使用computed，会导致页面载入时出现无内容提示，
                // 然后再渲染出内容，故在获取数据后进行判断。
                this.$nextTick(() => {
                    utils.highLight()
                    this.hasContent = utils.hasContent(result)
                })
            })
        },
        methods: {
            setPage(page) {
                alert(page)
            }
        },
        components:{
            BlogPrev,
            Pagination
        }
    }
</script>

<style>
    p.error {
        font-size: 2.2em;
        text-align: center;
    }
</style>
