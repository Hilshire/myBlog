<template>
    <div class='container'>
        <blog-prev v-for='blog in blogs' title='blog.title' time='blog.time' id='blog.id'></blog-prev>
    </div>
</template>
<style>

</style>
<script>
    import BlogPrev from './BlogPrev.vue'
    import {blog} from '../../api'

    let Eventproxy = require('eventproxy')

    export default{
        data(){
            blog.queryList(this)
            return {}
        },
        ready() {
            this.ep = new Eventproxy()
        },
        components:{
            BlogPrev
        }
    }
</script>
