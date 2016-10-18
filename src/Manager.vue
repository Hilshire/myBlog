<template>
<div>
    <navbar color='indigo' logo='Manager' :nav='nav'></navbar>
    <div class="container">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
    import Navbar from './components/Navbar.vue'
    export default {
        data() {
            return {
                nav: [{
                    link: '/blog',
                    text: 'blog'
                }, {
                    link: '/article',
                    text: 'article'
                }, {
                    link: '/tips',
                    text: 'tips'
                }]
            }
        },
        components: {
            Navbar
        }
    }
</script>
