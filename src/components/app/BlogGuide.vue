<template>
    <div class='container'>
        <blog-prev v-for='blog in blogs'
                   :title='blog.title' :time='blog.time' :id='blog.id' :summary='blog.summary'
                   :divider='$index !== blogs.length - 1'></blog-prev>
    </div>
</template>
<style>

</style>
<script lang='babel'>
    'use strict'

    import BlogPrev from './BlogPrev.vue'
    import {blog} from '../../api'

    let EventProxy = require('eventproxy')

    export default{
        data(){
            let ep = this.ep = new EventProxy()
            return {
                blogs: []
            }
        },
        ready() {
            let ep = this.ep

            blog.queryList(ep)
            ep.on('queryList', result => {
                this.$data.blogs = result
            })
        },
        components:{
            BlogPrev
        }
    }
</script>
