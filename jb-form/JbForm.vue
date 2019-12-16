<template>
  <div>
    <b-form
      :id="_id"
      :ref="bootstrapvue_ref('b-form')"
      v-on="this.$listeners"
      v-bind="this.$attrs"
      enctype="multipart/form-data"
      @submit.stop.prevent="submit"
    >

      <b-col class="text-right">
        <div class="text-light" style="font-size:12px">{{mensagem_campos_obrigatorio.exibir ? mensagem_campos_obrigatorio.texto : ''}}</div>
      </b-col>

      <slot></slot>
    </b-form>
  </div>
</template>

<script>

import globalMixin from "./../../jb-v-global/jb-v-mixin-global";

export default {
  mixins: [globalMixin],
  props: {
    validar: { type: Boolean, default: true },
    exibirMensagemCamposObrigatorios:{type:Boolean, default:false},
  },
  data(){return {
    invalid: false,
    mensagem_campos_obrigatorio: {
      exibir: false,
      texto: 'Todos os campos marcados com * são obrigatórios'
    }
  }},
  created() {
    Object.assign(this, this.$attrs);
  },
  mounted() {
    this.emitInput()
    this.validarForm()
  },
  updated() {
    this.validarForm()
  },
  watch: {
    invalid(v){
      this.emitInput()
    }
  },

  methods: {
    emitInput(){
      this.$emit('input',!this.invalid)
    },
    validarForm(){
      this.$children.forEach(el => {
        
        if (el.hasOwnProperty("$v")) {
          let vmodel = el.$v.vmodel
          let value = vmodel.$model
          let e_obrigatorio = Object.keys(vmodel).includes('required')
          if(e_obrigatorio && this.exibirMensagemCamposObrigatorios){
            this.mensagem_campos_obrigatorio.exibir = true
          }

          let validar_campo = e_obrigatorio || value

          if(validar_campo && vmodel.$invalid){
            this.invalid = true;
            this.emitInput()
          }
        }
      });
    },
    submit(e) {
      if (this.validar && this.invalid) {
        return false
      }

      // Form submit logic
    }
  }
};
</script>
