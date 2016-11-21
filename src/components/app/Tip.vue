<template>
    <div class="tip section">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <p class="markdown-body contentHTML">{{{content | mdToHtml}}}</p>
    </div>
</template>

<script type="text/babel">
    import Card from '../CardPanel.vue'
    export default {
        ready() {
            window.hljs.initHighlighting.called = false
            window.hljs.initHighlighting()
        },
        props: ['title', 'time', 'content'],
        components: {
            Card
        }
    }
</script>

<style lang="sass">
    .tip {
        .title {
            text-align: left;
            color: #333;
            font-weight: bold;
            font-size: 1.2em;
            margin: 0.5em 0;
            letter-spacing: 0;
        }
        .time {

        }
    }
</style>
