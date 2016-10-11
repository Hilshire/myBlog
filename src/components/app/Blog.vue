<template>
    <div id="app-blog">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <article class="contentHTML markdown-body">{{{content | mdToHtml }}}</article>
    </div>
</template>

<script lang='babel'>
    import {blog} from '../../api'

    let EventProxy = require('eventproxy')

    export default{
        data(){
            return{
                ep: new EventProxy(),
                id: '',
                title: '',
                time: '',
                content: '',
            }
        },
        ready() {
            let id = this.id = this.$route.params.id,
                ep = this.ep
            blog.queryById({id: id}, ep)
            ep.on('queryById', data => {
                Object.assign(this.$data, data)
                this.$nextTick(()=> {
                    window.hljs.initHighlighting.called = false
                    window.hljs.initHighlighting()
                })
            })
        },
        components:{

        }
    }
</script>

<style lang="sass">
    #app-blog {
        width: 70%;
        min-width: 640px;
        max-width: 1020px;
        margin: 100px auto;

        .title {
            text-align: center;
        }
        
        .time {
            text-align: right;
        }
    }
</style>
