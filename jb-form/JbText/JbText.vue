<template>
  <b-form-group :id="_id + '-group'" :label="label_comp" :label-for="_id">
    <b-input-group>
      <template v-slot:prepend :value="null">
        <slot name="prepend"></slot>
      </template>

      <b-form-input
        :id="_id"
        :ref="bootstrapvue_ref('b-form-input')"
        v-on="inputListeners"
        v-bind="this.$attrs"
        v-model.trim="$v.vmodel.$model"
        :state="this.$v.vmodel.$dirty ? !this.$v.vmodel.$error : null"
        v-input-mask="mask"
        :class="inputProps.hasOwnProperty('class') ? inputProps.class : ''"
      ></b-form-input>

      <template v-slot:append :value="null">
        <slot name="append"></slot>
      </template>
    </b-input-group>

    <b-form-invalid-feedback
      :style="{ display: validacao_com_erro ? 'block' : 'none' }"
      :id="_id + '-live-feedback'"
      v-text="error_messages"
    />
  </b-form-group>
</template>

<script>
import inputBaseMixin from '../mixins/jb-v-mixin-input-base'

export default {
  mixins: [inputBaseMixin],
  props: {
    id: { type: String, default: '' }
  },
  computed: {
    inputListeners: function() {
      /** pego da documentacao do oficial do VueJs */
      /**
       * `Object.assign` mescla objetos para formar um novo objeto
       *      -> Nós adicionamos todas as escutas do pai
       *      -> Então podemos adicionar escutas personalizadas ou substituir comportamento de algumas escutas.
       *          -> Isso garante que o componente funcione com o v-model
       */
      var vm = this
      return Object.assign({}, this.$listeners, {
        input: value => {
          if (value) {
            //configurar como os valores colocados pelo usuario devem ser guardados na variavel
            if (this.mask == 'dinheiro' || this.mask == 'currency') {
              value = this.currencyUs(value)
            } else if (this.mask == 'cpf') {
              value = value.replace(/[-_\.]/g, '')
            } else if (this.mask == 'cnpj' || this.mask == 'cpf_cnpj') {
              value = value.replace(/[-\/_\.]/g, '')
            } else if (
              this.mask == 'percentage' ||
              this.mask == 'porcentagem'
            ) {
              value = this.pegarPorcentagem(value)
            } else if (this.mask == 'date' || this.mask == 'datetime') {
              value = this.datahoraUs(value)
            }
          }

          vm.$emit('input', value)
        }
      })
    }
  },
  created() {},
  mounted() {
    let ref_name = Object.keys(this.$refs)[0]
    Object.assign(this.$refs[ref_name], this.$attrs)
    if (this.vmodel) {
      this.$v.vmodel.$touch()
    }
  },
  methods: {
    currencyUs(value) {
      value = value
        .match(this.$regex('currency'))
        .join([])
        .replace(',', '.')
      return value
    },
    pegarPorcentagem(value) {
      value = value
        .match(this.$regex('currency'))
        .join([])
        .split(',')
        .join('.')
      value = parseFloat(value).toFixed(2)
      return value
    },
    datahoraUs(value) {
      value = value.split(' ')
      value[0] = value[0]
        .split('/')
        .reverse()
        .join('-')
      value = value.join(' ')
      return value
    }
  }
}
</script>

<style>
.form-control-rounded {
  border-radius: 20px !important;
}
</style>
