<template>
    <div id="about_me" class="app-content">
        {{{content | mdToHtml}}}
        <div id="disqus_thread"></div>
    </div>
</template>

<script type="text/babel">
    import {app} from '../../transform.js'

    export default {
        data() {
            return {
                content: ''
            }
        },
        ready() {
            let ep = this.ep = app.about.ep

            ep.on('query', result => {
                if(!result) {
                    this.content = '####He is too lazy to write anything'
                    return
                }
                this.content = result.content
            })

            app.about.query()
        }
    }
</script>

<style lang="sass">
#about_me {
    margin: 80px auto;
}
</style>