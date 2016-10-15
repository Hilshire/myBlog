<template>
    <div id='app-nav' class="fixed" :class="showNav">
        <span v-link="'/'">塔希提</span>
        <ul>
            <!--<li v-for='item in nav'>{{item}}</li>-->
            <li v-link="'/blog'">blog</li>
            <li v-link="'/article'">article</li>
            <li v-link="'/tips'">tips</li>
            <li v-link="'/about'">About Me</li>
        </ul>
    </div>
    <div id='app-nav-space'></div>
</template>

<script lang='babel'>
    export default{
        data(){
            return{
//                nav: ['blog', 'article', 'tips', 'About Me']
            }
        },
        computed: {
            showNav() {
                if (this.show) return ''
                    else return 'hide'
            }
        },
        components:{
        },
        props: {
            show: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="sass">
    $animeTime: 400ms;
    $nav-height: 62px;

    #app-nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fafafa; 
        height: $nav-height;
        transition: height $animeTime;
        overflow: hidden;
        // background-color: #0091ea;
        // color: #fff;
        span {
            cursor: pointer;
        }
        span:hover {
            color: #666;
        }
        ul {
            margin: 0;
            li {
                display: inline-block;
                padding: 20px 20px;
                background-color: rgba(220, 220, 220, 0);
                cursor: pointer;
            }
            li:hover {
                background-color: rgba(220, 220, 220, 0.8);
                transition: background-color $animeTime;
            }
        }
    }
    #app-nav.hide {
        display: flex !important;
        height: 0;
        transition: height $animeTime;
    }
    #app-nav.fixed {
        position: fixed;
        width: 100%;    
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    #app-nav-space {
        //TODO: 自适应
        height: $nav-height;
    }
</style>
