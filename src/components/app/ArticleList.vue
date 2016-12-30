<template>
    <div class='container'>
        <article-prev v-for='article in articles'
                   :title='article.title' :time='article.time' :id='article.id'
                   :divider='$index !== articles.length - 1'></article-prev>
    </div>
    <p class="error" v-if="!hasContent">这里什么都没有哦。</p>
    <pagination :total=total :current=current :set-page="query"></pagination>
</template>
<style>

</style>
<script type='text/babel'>
    'use strict'

    import ArticlePrev from './ArticlePrev.vue'
    import Pagination from '../Pagination.vue'
    import {app} from '../../transform'
    import * as utils from '../../utils.js'

    export default{
        data(){
            let ep = this.ep = app.article.ep
            return {
                articles: [],
                hasContent: true,
                total: 1,
                current: 1
            }
        },
        ready() {
            let ep = this.ep

            ep.on('queryList', result => {
                this.articles = result.list
                this.total = result.total
                this.current = result.current

                this.$nextTick(() => {
                    this.hasContent = utils.hasContent(result.list)
                })
            })

            this.query()
        },
        methods: {
            query(page) {
                app.article.queryList(page)
            }
        },
        components:{
            ArticlePrev,
            Pagination
        }
    }
</script>
