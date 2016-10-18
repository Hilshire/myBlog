<template>
    <div class='container'>
        <blog-prev v-for='blog in blogs'
                   :title='blog.title' :time='blog.time' :id='blog.id' :summary='blog.summary'
                   :divider='$index !== blogs.length - 1'></blog-prev>
        <p class="error" v-if="!hasContent">这里什么都没有哦。</p>
    </div>
</template>
<script type='text/babel'>
    'use strict'

    import BlogPrev from './BlogPrev.vue'
    import {app} from '../../transform'

    let EventProxy = require('eventproxy')

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

                this.$nextTick(() => {
                    if(result.length === 0) {
                        this.hasContent = false
                    }
                })
            })
        },
        components:{
            BlogPrev
        }
    }
</script>

<style>
    p.error {
        font-size: 2.2em;
        text-align: center;
    }
</style>
