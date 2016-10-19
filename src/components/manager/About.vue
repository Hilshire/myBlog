<template>
    <card>
        <page-down :md-val.sync = 'content'></page-down>
    </card>
    <card>
        <button text='submit' @click='submit'></button>
    </card>
</template>

<script type="text/babel">
    import Card from '../CardPanel.vue'
    import PageDown from '../PageDown.vue'
    import Button from '../Button'
    import {manager} from '../../transform.js'

    let about = manager.about

    export default {
        data() {
            return {
                content: ''
            }
        },
        ready() {
            var ep = this.ep = manager.about.ep

            ep.on('query', result => {
                this.content = result.content
            })
            ep.on('update', () => {
                window.location.refresh()
            })

            this.query()
        },
        methods: {
            query() {
                manager.about.query()
            },
            submit() {
                manager.about.update({content: this.content})
            }
        },
        components: {
            Card,
            PageDown,
            Button
        }
    }
</script>
