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
    import {article} from '../../api'
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
            this.ep = new EventProxy()
            this.query()
        },
        methods: {
            query() {
                var id = this.$route.params.id
                this.id = id
                if(this.id) {
                    var ep = this.ep
                    article.queryById({id: id}, ep)
                    ep.on('queryById', (data) => {
                        this.title = data.title
                        this.content = data.content
                        this.tags = data.tags
                        this.alltags = data.alltags
                    })
                }
            },
            submit() {
                if(this.id) this.update()
                    else this.add()
            },
            add() {
                var ep = this.ep
                article.add(ep, this.$data)
                ep.on('add', () => {
                    this.$router.go(url.article.VUE_ROOT)
                })
            },
            update() {
                var ep = this.ep
                article.update(ep, Object.assign({}, this.$data , {id: this.id}))
                ep.on('update', () => {
                    this.$router.go(url.article.VUE_ROOT)
                })
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
