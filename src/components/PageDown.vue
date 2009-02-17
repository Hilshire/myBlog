<template>
    <div class="row pagedown markdown-body">
        <textarea id="article-markdown" :value.sync='mdVal' label='正文' width='s6'></textarea>
        <div id="article-html" class="col s6">{{{htmlVal}}}</div>
    </div>
</template>
<style>

</style>
<script>
    import Markdown from '../../node_modules/pagedown/Markdown.Converter.js'
    import Textarea from './Textarea.vue'

    export default{
        data() {
            return {
            }
        },
        components:{
            Textarea
        },
        props: {
            mdVal: {
                required: true,
                twoWay :true
            },
            htmlVal: {
                twoWay: true
            }
        },
        ready() {
            this.conventer = new Markdown.Converter()
        },
        computed: {
            htmlVal() {
                if(this.mdVal) return this.conventer.makeHtml(this.mdVal)
            }
        },
        methods: {
        }
    }
</script>
