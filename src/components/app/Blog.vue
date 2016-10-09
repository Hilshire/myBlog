<template>
    <div class='container'>
        <blog-prev v-for='blog in blogs' title='blog.title' time='blog.time' id='blog.id'></blog-prev>
    </div>
</template>
<style>

</style>
<script lang='babel'>
    import BlogPrev from './BlogPrev.vue'
    import {blog} from '../../api'

    let EventProxy = require('eventproxy')

    export default{
        data(){
            let ep = this.ep = new EventProxy()
            blog.queryList(ep)
            ep.on('queryList', data => {
                console.log(data)
            })
            return {}
        },
        components:{
            BlogPrev
        }
    }
</script>
