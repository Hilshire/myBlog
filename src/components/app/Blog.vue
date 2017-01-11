<template>
    <div id="app-blog" class="app-content">
        <p class="title">{{main.title}}</p>
        <p class="time">{{main.time}}</p>
        <article class="contentHTML markdown-body">{{{main.content | mdToHtml }}}</article>
        <tags :tags='tags'></tags>
        <div id="disqus_thread"></div>
    </div>
</template>

<script type='text/babel'>
    import Tags from '../Tags'
    import {app} from '../../transform'
    import {ScrollFire} from '../../utils'

    let scrollFire = new ScrollFire('#app-blog .title')

    export default{
        data(){
            return{
                main: {
                    id: '',
                    title: '',
                    time: '',
                    content: '',
                },
                tags: []
            }
        },
        ready() {
            let id = this.id = this.$route.params.id,
                ep = this.ep = app.blog.ep

            // 获取数据
            app.blog.queryById({id: id}, ep)
            ep.on('queryById', data => {
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
                this.$root.showNav = true
            }
        },
        components:{
            Tags
        }
    }
</script>

<style lang="sass">
    .app-content {
        width: 60%;
        min-width: 640px;
        max-width: 800px;
        margin: 100px auto;

        .title {
            text-align: center;
            margin: 20% 0 5% 0;
        }

        .time {
            text-align: right;
            margin-bottom: 5%;
        }

        .tags.app {
            margin-top: 120px;
            display: flex;
            align-items: center;

            .tag {
                display: inline-block;
                padding: 5px;
                margin-left:3px;
                // text-decoration: underline;
            }
        }
    }
</style>
