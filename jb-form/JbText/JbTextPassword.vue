<template>
  <jb-text
    :ref="bootstrapvue_ref('jb-text')"
    v-model="$v.vmodel.$model"
    v-bind="this.$attrs"
    v-on="this.$listeners"
    :label="_label"
    :type="_type"
  >
    <b-btn
      slot="append"
      variant="primary"
      class="px-2"
      @click="alternarExibicao"
      ><i :class="_append_icon"></i
    ></b-btn>
  </jb-text>
</template>

<script>
import inputBaseMixin from "../mixins/jb-v-mixin-input-base";

export default {
  mixins: [inputBaseMixin],
  data() {
    return {
      senha_visivel: false
    };
  },
  computed: {
    _label() {
      return this.label || "Senha";
    },
    _type() {
      return this.senha_visivel ? "text" : "password";
    },
    _append_icon() {
      return this.senha_visivel
        ? "mdi mdi-eye-outline"
        : "mdi mdi-eye-off-outline";
    }
  },
  mounted(){
    let jbText = this.$refs['jb-text']
    jbText.regras = this.regras    
    
    if(this.vmodel){
      this.$v.vmodel.$touch()
      jbText.$v.vmodel.$touch()
    }
  },
  methods: {
    alternarExibicao() {
      this.senha_visivel = !this.senha_visivel;
    }
  }
};
</script>
