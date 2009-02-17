<template>
    <div id='app'>
        <app-nav></app-nav>
        <router-view>
        </router-view>
    </div>
</template>

<script type="text/javascript">
    import AppNav from './components/app/Nav.vue'
    import BlogGuide from './components/app/BlogGuide.vue'

    export default {
        components: {
            BlogGuide,
            AppNav,
        }
    }
</script>

<style lang="sass">
    body {
        background-color: #fafafa;
    }

</style>
