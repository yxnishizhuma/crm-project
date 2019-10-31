<template>
    <div class="Crumb">
      <p>
        {{title}}
      </p>
    </div>
</template>

<script>
  export default {
    name: 'Crumb',
    data () {
      return {}
    },
    props:{
      title: {
        default: '',
        type: String
      }
    },
    methods: {},
    mounted () {
    },
    components: {},
  }
</script>

<style lang="scss" type="text/scss" scoped>
.Crumb {
  p {
    padding-left: 5px;
    border-left: 3px solid #2D8CF0;
    margin-bottom: 10px;
  }
}
</style>

<style>

</style>
