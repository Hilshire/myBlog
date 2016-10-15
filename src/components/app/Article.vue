<template>
    <div id="app-article" class="app-content">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <article class="contentHTML markdown-body">{{{content | mdToHtml }}}</article>
    </div>
</template>

<script type='text/babel'>
    import {app} from '../../api'
    import {ScrollFire} from '../../utils'

    let EventProxy = require('eventproxy'),
        scrollFire = new ScrollFire('#app-article .title')

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
            app.queryArticle({id: id}, ep)
            ep.on('queryArticle', data => {
                Object.assign(this.$data, data)
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

</style>
