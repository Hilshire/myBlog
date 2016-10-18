<template>
    <div id="app-blog" class="app-content">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <article class="contentHTML markdown-body">{{{content | mdToHtml }}}</article>
    </div>
</template>

<script type='text/babel'>
    import {app} from '../../transform'
    import {ScrollFire} from '../../utils'

    let EventProxy = require('eventproxy'),
        scrollFire = new ScrollFire('#app-blog .title')

    export default{
        data(){
            return{
                id: '',
                title: '',
                time: '',
                content: '',
            }
        },
        ready() {
            let id = this.id = this.$route.params.id,
                ep = this.ep = new EventProxy()

            // 获取数据
            app.queryBlog({id: id}, ep)
            ep.on('queryBlog', data => {
                Object.assign(this.$data, data)
                this.$nextTick(()=> {
                    //语法高亮。在dom重渲染后完成
                    window.hljs.initHighlighting.called = false
                    window.hljs.initHighlighting()
                })
            })

            scrollFire.init(
                    () => {this.$root.showNav = false},
                    () => {this.$root.showNav = true})
        },
        route: {
            deactivate() {
                scrollFire.destory()
            }
        },
        components:{

        }
    }
</script>

<style lang="sass">
    .app-content {
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
