<template>
    <div>
        <section id="banner">
            <p>你现在遭遇的不幸，是你荒废时间的报应。你现在在干什么，而你该干什么？</p>
        </section>
        <Blog-guide></Blog-guide>
    </div>
</template>

<script lang="babel">
    import BlogGuide from "./BlogGuide.vue"

    export default{
        data(){
            return{
            }
        },
        components:{
            BlogGuide
        }
    }
</script>

<style lang="sass">
        #banner {
            background-color: #01579b;
            background-image: url('https://source.unsplash.com/category/nature/2600x500');
            padding: 10% 20%;
            max-height: 30%;
            p {
                color: #fff;
                font-size: 1.5em;
                letter-spacing: 2px;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                text-align: center;
            }
        }
</style>
