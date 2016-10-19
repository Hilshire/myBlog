<template>
    <div id="about_me">
        {{{content | mdToHtml}}}
    </div>
</template>

<script>
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
                this.content = result
            })

            app.about.query()
        }
    }
</script>
