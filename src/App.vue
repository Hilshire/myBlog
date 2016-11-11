<template>
    <div id='app'>
        <div class="wrapper">
            <app-nav :show='showNav'></app-nav>
            <router-view>
            </router-view>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script type="text/javascript">
    import AppNav from './components/app/Nav.vue'
    import AppFooter from './components/app/Footer.vue'
    import BlogList from './components/app/BlogList.vue'

    export default {
        data() {
            return {
                showNav: true
            }
        },
        components: {
            BlogList,
            AppNav,
            AppFooter,
        }
    }
</script>

<style lang="sass">
    html, body, #app, .wrapper {
        height: 100%;
    }
    body, .markdown-body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Microsoft Yahei", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
    }
    .markdown-body {
        line-height: 1.8em;
    }
    body{
        background-color: #fafafa;
        position: relative;
    }
    /*挤开footer*/
    .wrapper {
        height: auto; min-height: 100%;
        padding-bottom: 50px;
    }
    .title {
        text-align: center;
        font-size: 2em;
        letter-spacing: 1px;
    }
</style>
