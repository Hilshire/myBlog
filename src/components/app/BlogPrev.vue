<template>
    <div>
        <p id='blog-title' class="">{{title}}</p>
        <p id='blog-time' class="">{{time}}</p>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
        },
        components:{
        },
        props: ['title', 'time', 'id']
    }
</script>
