<template>
    <div id="app-blog" class="container">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <article class="content">{{content}}</article>
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
                content: ''
            }
        },
        ready() {
            let id = this.id = this.$route.params.id,
                    ep = this.ep
            blog.queryById({id: id}, ep)
            ep.on('queryById', data => {
                Object.assign(this.$data, data)
            })
        },
        components:{

        }
    }
</script>

<style lang="sass">
    #app-blog {
        margin: 100px auto;

        .title {
            font-size: 1.5em;
        }
    }
</style>
