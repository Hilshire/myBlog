<template>
<div>
    <navbar logo='Manager' :nav='nav'></navbar>
    <div class="container">
        <p>manager</p>
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
                    link: '/project',
                    text: 'project'
                }]
            }
        },
        components: {
            Navbar
        }
    }
</script>