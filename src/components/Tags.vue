<template>
    <div class="tags">
        <div v-for='item in tags' class="tag" @click='addTag(item.type)'>
            {{item.type}}
            <i v-if='canClose' class="material-icons" @click='delTag(item.tag_id)'>close</i>
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
            },
            delTag: {
                type: Function,
            },
            addTag: {
                type: Function
            }
        }
    }
</script>
<style lang="sass">
    $animeTime: 400ms;

    @keyframes shake {
        0% {transform: rotate(0deg)}
        17% {transform: rotate(5deg)}
        34% {transform: rotate(0deg)}
        50% {transform: rotate(-5deg)}
        67% {transform: rotate(3deg)}
        84% {transform: rotate(-3deg)}
        100% {transform: rotate(0deg)}
    }

    .tags {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .tag {
            border-radius: 3px;
            padding: 2px 8px;
            margin: 0 5px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: #444;
            color: #fff;
            cursor: pointer;

            i {
                font-size: 1em;
                padding-left: 8px;
            }
        }

        .tag:hover {
            animation: shake 0.2s;
        }
    }
</style>
