<template>
    <div id="tag-list" class="container">
        <div class="tag-list-item" v-for='(time, content) in tagList'>
            <p class="time">{{time}}</p>
            <div v-for='item in content' class="content">
                <blog-prev v-if='item.type === "blog"' :title="item.title" :summary="item.summary" :id="item.id"></blog-prev>
                <article-prev v-if='item.type === "article"' :title="item.title" :id="item.id"></article-prev>
                <tip v-if='item.type === "tip"' :title="item.title" :content="item.content"></tip>
            </div>
        </div> 
    </div> 
</template>
<script>
import {app} from '../../transform'
import BlogPrev from './BlogPrev'
import ArticlePrev from './ArticlePrev'
import Tip from './Tip'

export default {
    data() {
        return {
            tagList: []
        }
    },
    ready() {
        let id = this.id = this.$route.params.id,
            ep = this.ep = app.tag.ep

        app.tag.query({id: id})

        ep.on('queryContentByTag', data => {
            this.tagList = data
        })
    },
    components: {
        BlogPrev,
        ArticlePrev,
        Tip
    }
}
</script>
<style lang="sass">
    #tag-list {
        margin-top: 5%;

        p.time {
            font-size: 2em;
            color: #813B5A;

        }
        div.content {
        }
        .app-prev {
            div.markdown-body {
                margin-top: 20px;
                margin-left: 0; 
            }
            p.time {
                display: none;
            }
        }
    }
</style>