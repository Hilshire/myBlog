<template>
    <div class="blog-prev">
        <p class="title" v-link="{name: 'blog', params: {id: this.id}}">{{title}}</p>
        <p class="time">{{time}}</p>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        components:{
        },
        props: ['title', 'time', 'id']
    }
</script>

<style lang="sass">
    .blog-prev {
        .title {
            font-size: 1.5em;
            color: #01579b;
            cursor: pointer;
        }
        .time {

        }
    }
</style>
