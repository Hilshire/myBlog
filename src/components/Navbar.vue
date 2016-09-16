<template>
    <nav class="{{color}}">
      <div class="nav-wrapper container {{class}}">
        <a href="#" class="brand-logo">{{logo}}</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-for="item in nav"  v-link="item.link"><a>{{item.text}}</a></li>
        </ul>
      </div>
    </nav>
</template>

<script>
    export default {
        props: {
            class: {
                type: String,
                default: ''
            },
            logo: String,
            nav: Array,
            color: String
        }
    }
</script>
