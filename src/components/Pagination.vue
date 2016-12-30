<template>
    <ul class="pagination" v-if="show">
        <li @click="_setPage(current-1)" :class="{disabled: !prev, 'waves-effect': prev}"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        <li v-for="i in pages" :class="{'active light-blue darken-3': current===i, 'waves-effect': !(current===i)}"><a href="#" @click="setPage(i)">{{i}}</a></li>
        <li @click="_setPage(current+1)" :class="{disabled: !next, 'waves-effect': next}"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
    </ul>
</template>

<script>
    export default {
        computed: {
            pages() {
                let current = parseInt(this.current),
                    total = parseInt(this.total),
                    result = [],
                    left = 1,
                    right = total

                if (total < 1) return
                if (total > 5) {
                    if (current > 2 && current < total - 2) {
                        left  = current - 2
                        right = current + 2
                    } 
                    else
                    if (current <= 2)
                        right = 5
                    else
                    if (current + 2 >= total) 
                        left = total - 4
                }

                for (let i=left; i<=right; i++) 
                    result.push(i)
                
                return result
            },
            show() {
                return this.total !== 1
            },
            prev() {
                return this.current !== 1
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
                type: Number,
                required: true
            }, 
            'total': {
                type: Number,
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