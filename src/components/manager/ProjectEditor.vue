<template>
    <card>
        <input-group :value.sync='title' label='标题'></input-group>
        <input-group :value.sync='address' label='address'></input-group>
        <pagedown :md-val.sync='describe'></pagedown>
        <button class="indigo" @click='submit' text="确定"></button>
    </card>
</template>

<script lang="babel">
    import Card from '../Card'
    import InputGroup from '../InputGroup'
    import Select from '../Select'
    import Textarea from '../Textarea'
    import Button from '../Button'
    import Pagedown from '../PageDown'

    import {project} from '../../api'

    export default {
        data: () => {
            return {
                title: '',
                describe: '',
                address: '',
                img: ''
            }
        },
        ready() {
            this.query()
        },
        methods: {
            query() {
                var id = this.$route.params.id
                this.id = id
                if(this.id) {
                    project.queryById({id: id}, this)
                }
            },
            submit() {
                if(this.id) this.update()
                else this.add()
            },
            add() {
                project.add(this.$router, this.$data)
            },
            update() {
                project.update(this.$router, Object.assign({}, this.$data , {id: this.id}))
                this.query()
            }
        },
        components: {
            InputGroup,
            Card,
            Textarea,
            Button,
            Pagedown,
        }
    }
</script>
