<template>
    <ul class="pagination" v-if="show">
        <li @click="_setPage(current-1)" :class="{disabled: !prev, 'waves-effect': prev}"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        <li v-for="i in pages" :class="{'active light-blue darken-3': current===i, 'waves-effect': !(current===i)}"><a href="#" @click="setPage(i)">{{i}}</a></li>
        <li :class="{disabled: !next, 'waves-effect': next}"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
    </ul>
</template>

<script>
    export default {
        computed: {
            pages() {
                let current = parseInt(this.current),
                    total = parseInt(this.total)
                let result = [], 
                    bgn = current - 2, 
                    end = current + 2,
                    bgnFilling = 0,
                    endFilling = 0

                if (bgn < 1) 
                    bgnFilling = 1 - bgn
                if (end > total)
                    endFilling = total - end

                for (let i=bgn; i<=end; i++) {
                    result.push(i + bgnFilling + endFilling + "")
                }
                return result
            },
            show() {
                return this.total !== "1"  
            },
            prev() {
                return this.current !== "1"
            },
            next() { 
                return this.current !== this.total
            }
        },
        methods: {
            _setPage(page) {
                if (page < 1 || page > this.total)
                    return

                this.setPage(page)
            }
        },
        props: {
            'current': {
                type: String,
                required: true
            }, 
            'total': {
                type: String,
                required: true
            }, 
            'setPage': {
                type: Function,
                required: true
            }
        }

    }
</script>

<style lang="sass">
    ul.pagination {
        margin: 40px auto 60px auto;
        display: flex;
        justify-content: center;
    }
</style>