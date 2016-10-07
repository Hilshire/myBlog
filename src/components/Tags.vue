<template>
    <div class="tags">
        <div v-for='item in tags' class="chip">
            {{item}}
            <i v-if='canClose' class="close material-icons">close</i>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            tags: {
                required: true,
                type: Array
            },
            canClose: {
                type: Boolean,
                default: false
            }
        }
    }
</script>