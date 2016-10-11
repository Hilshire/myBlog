<template>
    <div id='app-nav' class="fixed">
        <span v-link="{path: '/'}">塔希提</span>
        <ul>
            <li v-for='item in nav'>{{item}}</li>
        </ul>
    </div>
    <div id='app-nav-space'></div>
</template>

<script lang='babel'>
    export default{
        data(){
            return{
                nav: ['blog', 'article', 'tips', 'About Me']
            }
        },
        components:{
        }
    }
</script>

<style lang="sass">
    #app-nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fafafa; 
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
                transition: background-color 400ms;
            }
        }
    }
    #app-nav.fixed {
        position: fixed;
        width: 100%;    
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    #app-nav-space {
        //TODO: 自适应
        height: 62px;
    }
</style>
