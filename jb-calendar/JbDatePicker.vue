<template>
  <b-form-group :id="_id + '-group'" :label-for="_id">
    <label v-if="!!label" class="d-block">{{label}}</label>
    <v-date-picker
      :ref="bootstrapvue_ref('v-date-picker')"
      v-on="$listeners"
      v-bind="this.$attrs"
      v-model.trim="$v.vmodel.$model"
      :input-props="getInputProps"
    >
    </v-date-picker>

    <b-form-invalid-feedback
      :style="{ display: tem_erro ? 'block' : 'none' }"
      :id="_id + '-live-feedback'"
      v-text="error_messages"
    />
  </b-form-group>
</template>

<script>
import inputBaselMixin from "../jb-form/mixins/jb-v-mixin-input-base";

export default {
  mixins: [inputBaselMixin],
  props:{
    label: String,
    inputProps: Object
  },
  computed: {
    getInputProps(){
      let props = this.inputProps ? this.inputProps : {}
      props = Object.assign(props, {
        class: this.input_classes
      })
      return props
    },
    tem_erro() {
      return this.$v.vmodel.$error;
    },
    input_classes() {
      let classes = ["form-control"];
      if (this.$v.vmodel.$dirty) {
        classes.push(this.tem_erro ? "is-invalid" : "is-valid");
      }
      return classes.join(" ");
    }
  }
};
</script>
