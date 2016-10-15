<template>
    <div class="app-prev section">
        <p class="title" v-link="{name: 'blog', params: {id: this.id}}">{{title}}</p>
        <p class="time">{{time}}</p>
        <div class="markdown-body">{{{summary | mdToHtml}}}</div>
    </div>
    <div v-if='divider' class="divider"></div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        components:{
        },
        props: {
            'title': String,
            'time': String,
            'id': Number,
            'summary': String,
            'divider': {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="sass">
    .app-prev {
        margin-bottom: 40px;

        .title {
            text-align: left;
            color: #01579b;
            cursor: pointer;
            margin-bottom: auto;
        }
        .time {
            margin-top: auto;
            margin-bottom: 2em;
            color: #666;
        }
        .markdown-body {
            margin-left: 20px;
        }
    }
</style>
