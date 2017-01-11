<template>
    <div id="app-article" class="app-content">
        <p class="title">{{main.title}}</p>
        <p class="time">{{main.time}}</p>
        <article class="contentHTML markdown-body">{{{main.content | mdToHtml }}}</article>
        <tags :tags="tags"></tags>
        <div id="disqus_thread"></div>
    </div>
</template>

<script type='text/babel'>
    import Tags from '../Tags'
    import {app} from '../../transform'
    import {ScrollFire} from '../../utils'

    let scrollFire = new ScrollFire('#app-article .title')

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
                ep = this.ep = app.article.ep

            // 获取数据
            app.article.queryById({id: id}, ep)
            ep.on('queryById', data => {
                Object.assign(this.$data, data)
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

</style>
