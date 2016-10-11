<template>
    <div class="blog-prev section">
        <p class="title" v-link="{name: 'blog', params: {id: this.id}}">{{title}}</p>
        <p class="time">{{time}}</p>
        <div class="markdown-body">{{{summary | mdToHtml}}}</div>
    </div>
    <div class="divider"></div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        components:{
        },
        props: ['title', 'time', 'id', 'summary']
    }
</script>

<style lang="sass">
    .blog-prev {
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
