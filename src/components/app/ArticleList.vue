<template>
    <div class='container'>
        <article-prev v-for='article in articles'
                   :title='article.title' :time='article.time' :id='article.id'
                   :divider='$index !== articles.length - 1'></article-prev>
    </div>
    <p class="error" v-if="!hasContent">这里什么都没有哦。</p>
</template>
<style>

</style>
<script type='text/babel'>
    'use strict'

    import ArticlePrev from './ArticlePrev.vue'
    import {app} from '../../transform'

    let EventProxy = require('eventproxy')

    export default{
        data(){
            let ep = this.ep = app.article.ep
            return {
                articles: [],
                hasContent: true
            }
        },
        ready() {
            let ep = this.ep

            app.article.queryList(ep)
            ep.on('queryList', result => {
                this.articles = result

                this.$nextTick(() => {
                    if(result.length === 0) {
                        this.hasContent = false
                    }
                })
            })
        },
        components:{
            ArticlePrev
        }
    }
</script>
