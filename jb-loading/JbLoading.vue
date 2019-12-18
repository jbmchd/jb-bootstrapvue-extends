<template>
  <div>
    <loading v-on="this.$listeners" v-bind="this.$attrs">
      <template slot="after">
        <div class="text-center">
          <slot></slot>
        </div>
      </template>
    </loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Loading },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.vld-overlay.is-full-page {
  position: absolute;
}
</style>
