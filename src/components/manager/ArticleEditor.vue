<template>
    <card-panel>
        <input-group :value.sync='title' label='标题'></input-group>
    </card-panel>


    <tags-editor :tags='tags' :alltags='alltags'></tags-editor>

    <card-panel>
        <pagedown :md-val.sync='content'></pagedown>
        <button text='编辑全文'>&nbps;<button text='全屏'></button>
    </card-panel>

    <card-panel>
        <button class="indigo" @click='submit' text="确定"></button>
    </card-panel>

</template>

<script type="text/babel">
    import EventProxy from 'eventproxy'
    import {article} from '../../transform'
    import url from '../../const'

    import CardPanel from '../CardPanel'
    import InputGroup from '../InputGroup'
    import Select from '../Select'
    import Textarea from '../Textarea'
    import Button from '../Button'
    import Pagedown from '../PageDown'
    import TagsEditor from '../TagsEditor.vue'

    export default {
        data: () => {
            return {
                title: '',
                content: '',
                tags: ['JavaScript'],
                alltags: ['js']
            }
        },
        ready() {
            var ep = this.ep = article.ep

            ep.on('queryById', (data) => {
                this.title = data.title
                this.content = data.content
                this.tags = data.tags
                this.alltags = data.alltags

                this.$nextTick(() => {
                    Materialize.updateTextFields()
                })
            })

            ep.on('update', () => {
                this.$router.go(url.article.VUE_ROOT)
            })

            ep.on('add', () => {
                this.$router.go(url.article.VUE_ROOT)
            })

            this.query()
        },
        methods: {
            query() {
                var id = this.$route.params.id
                this.id = id
                if(this.id) {
                    var ep = this.ep
                    article.queryById({id: id})
                }
            },
            submit() {
                if(this.id) this.update()
                    else this.add()
            },
            add() {
                article.add(this.$data)
            },
            update() {
                article.update(Object.assign({}, this.$data , {id: this.id}))
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
