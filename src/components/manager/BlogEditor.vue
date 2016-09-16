<template>
    <card>
        <input-group :value.sync='title' label='标题'></input-group>
        <textarea :value.sync='text' label='正文'></textarea>
        <button class="indigo":click='add' text="确定"></button>
    </card>
</template>

<script>
import Card from '../Card'
import InputGroup from '../InputGroup'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'

import {addBlog, updateBlog} from '../../api'

export default {
    data: () => {
        return {
            title: '',
            text: ''
        }
    },
    methods: {
        add() {
            addBlog(this.$data)
        }
    },
    components: {
        InputGroup,
        Card,
        Textarea,
        Button
    }
}
</script>
