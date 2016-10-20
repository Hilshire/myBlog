<template>
    <div>
        <section id="banner">
            <p>{{banner}}</p>
        </section>
        <router-view></router-view>
    </div>
</template>

<script lang="babel">
    import AppNav from "./Nav.vue"
    import BlogList from "./BlogList.vue"
    import AppFooter from "./Footer.vue"
    import {app} from "../../transform.js"

    export default{
        data(){
            return{
                banner:''
            }
        },
        ready() {
            let banner = app.banner,
                ep = banner.ep
            banner.query()
            ep.on('query', result => {
                this.banner = result.content
            })
        },
        components:{
            AppNav,
            BlogList,
            AppFooter
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
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
                text-align: center;
            }
        }
</style>
