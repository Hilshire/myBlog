<template>
    <div class="app-tip">
        <p class="title">{{title}}</p>
        <p class="time">{{time}}</p>
        <p class="content">{{content}}</p>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['title', 'time', 'content']
    }
</script>

<style></style>