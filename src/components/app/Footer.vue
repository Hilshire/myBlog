<template>
    <footer class="grey darken-4">
        <div class="footer-copyright">
            <div class="container grey-text">
                Copyright © 2016 Hilshire All Rights Reserved.
                <a class="grey-text right" v-link="{path: 'about'}">About Me</a>
            </div>
        </div>
    </footer>
</template>
<script>
    export default{

    }
</script>
<style lang="sass">
    footer {
        height: 50px;
        margin-top: -50px;
        clear: both;
        position: relative;
        z-index: 10;

        .footer-copyright {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>
