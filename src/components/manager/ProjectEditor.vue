<template>
    <card-panel>
        <input-group :value.sync='title' label='标题'></input-group>
        <input-group :value.sync='address' label='address'></input-group>
    </card-panel>


    <tags-editor :tags='tags' :alltags='alltags'></tags-editor>

    <card-panel>
        <pagedown :md-val.sync='describe'></pagedown>
        <button text='编辑全文'>&nbps;<button text='全屏'></button>
    </card-panel>

    <card-panel>
        <button class="indigo" @click='submit' text="确定"></button>
    </card-panel>

</template>

<script lang="babel">
    import CardPanel from '../CardPanel'
    import InputGroup from '../InputGroup'
    import Select from '../Select'
    import Textarea from '../Textarea'
    import Button from '../Button'
    import Pagedown from '../PageDown'
    import TagsEditor from '../TagsEditor.vue'

    import {project} from '../../api'

    export default {
        data: () => {
            return {
                title: '',
                describe: '',
                address: '',
                img: '',
                tags: ['JavaScript'],
                alltags: ['js']
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
            CardPanel,
            Textarea,
            Button,
            Pagedown,
            TagsEditor,
        }
    }
</script>
