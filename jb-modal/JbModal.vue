<template>
    <b-modal 
      v-model="vmodel"
      :ref="bootstrapvue_ref('b-modal')"
      v-on="this.$listeners"
      v-bind="this.$attrs"
      centered 
      no-close-on-esc 
      no-close-on-backdrop
      button-size="sm"
    >

      <slot></slot>

    </b-modal>
</template>

<script>

    import globalMixin from './../../jb-v-global/jb-v-mixin-global'

    export default {
        mixins:[globalMixin],
        
    }
</script>
