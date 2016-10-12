<template>
    <div id="app-blog">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <article class="contentHTML markdown-body">{{{content | mdToHtml }}}</article>
    </div>
</template>

<script lang='babel'>
    import {blog} from '../../api'
    import hil from '../../utils'

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
//            let options = [{selector: '.title', offset: 200, callback: () => {this.$root.showNav = false}}]

            // 获取数据
            blog.queryById({id: id}, ep)
            ep.on('queryById', data => {
                Object.assign(this.$data, data)
                this.$nextTick(()=> {
                    //语法高亮。在dom重渲染后完成
                    window.hljs.initHighlighting.called = false
                    window.hljs.initHighlighting()
                })
            })

            // 滚动监听
//            Materialize.scrollFire(options)
            hil.scrollFire('.title',
                    () => {this.$root.showNav = false},
                    () => {this.$root.showNav = true})
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
