<template>
  <b-form-group :id="_id + '-group'" :label="label_comp" :label-for="_id">
    <b-form-select
      :id="_id"
      :ref="bootstrapvue_ref('b-form-select')"
      v-on="this.$listeners"
      v-bind="this.$attrs"
      v-model.trim="$v.vmodel.$model"
      :state="$v.vmodel.$dirty ? !$v.vmodel.$error : null"
    >
      <template slot="first" :value="null">
        <slot name="first" :value="value"></slot>
      </template>
    </b-form-select>

    <b-form-invalid-feedback
      :id="_id + '-live-feedback'"
      v-text="error_messages"
    />

    <!-- vmodel: {{ vmodel }} -->
  </b-form-group>
</template>

<script>
import inputBaseMixin from "./mixins/jb-v-mixin-input-base";

export default {
  mixins: [inputBaseMixin],
};
</script>
