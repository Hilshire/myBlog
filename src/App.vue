<template>
    <div id='app'>
        <app-nav :show='showNav'></app-nav>
        <router-view>
        </router-view>
        <app-footer></app-footer>
    </div>
</template>

<script type="text/javascript">
    import AppNav from './components/app/Nav.vue'
    import AppFooter from './components/app/Footer.vue'
    import BlogGuide from './components/app/BlogGuide.vue'

    export default {
        data() {
        return {
            showNav: true
        }
    },
        components: {
            BlogGuide,
            AppNav,
            AppFooter,
        }
    }
</script>

<style lang="sass">
    body {
        background-color: #fafafa;
    }
    .title {
        text-align: center;
        font-size: 2em;
        letter-spacing: 1px;
    }

</style>
