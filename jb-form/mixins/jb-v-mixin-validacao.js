import * as validators from 'vuelidate/lib/validators'
import { validacao } from './../../../jb-v-global/utils/functions'

const validacaoMixin = {
  mixins: [validacao],
  data() {
    return {
      error_messages: '',
      regras: [],
      regras_obj: {},
      custom_validators: {
        cpf: v => this.$validar_cpf(v),
        cnpj: v => this.$validar_cnpj(v),
        cpf_cnpj: v => this.$validar_cpf_cnpj(v),
        cns: v => this.$validar_cns(v),
        igualA: v => this.$igual_a(v)
      }
    }
  },
  computed: {
    eObrigatorio() {
      return Object.keys(this.regras_obj).indexOf('required') > -1
    },
    validacao_com_erro() {
      return this.$v.vmodel.$dirty ? this.$v.vmodel.$error : null
    }
  },
  methods: {
    getMessageError(tipo, ...params) {
      let mensagem_erro = ''
      switch (tipo) {
        case 'minLength':
          mensagem_erro = `Digite pelo menos ${params} caracteres`
          break
        case 'maxLength':
          mensagem_erro = `Não digite mais que ${params} caracteres`
          break
        case 'cns':
          mensagem_erro = `Digite um CNS válido`
          break
        case 'cpf':
          mensagem_erro = `Digite um CPF válido`
          break
        case 'cnpj':
          mensagem_erro = `Digite um CNPJ válido`
          break
        case 'cpf_cnpj':
          mensagem_erro = `Digite um CPF/CNPJ válido`
          break
        case 'igualA':
          params = params.join(',').toUpperCase()
          mensagem_erro = `O valor precisa ser o mesmo do campo ${params}`
          break
      }
      return mensagem_erro
    }
  },
  validations() {
    if (!this.regras.length || typeof this.regras != 'object') {
      return { vmodel: {} }
    }

    Object.assign(validators, this.custom_validators)

    let regra_temp = {}

    let mensagem_required = ''
    let mensagem_erro = ''
    let mensagens_erro = []

    this.regras.forEach(regra => {
      if (typeof regra == 'string') {
        regra = { [regra]: null }
      }

      let key = Object.keys(regra)[0]
      if (this.$hasKey(key, validators)) {
        let validator = regra[key]
          ? validators[key](regra[key])
          : validators[key]

        if (typeof validator != 'function') {
          validator = () => validators[key](regra[key])
        }

        regra_temp = { [key]: validator }

        this.regras_obj = Object.assign({}, this.regras_obj, regra_temp)

        if (key == 'required') {
          mensagem_required = `Obrigatório. `
        } else {
          mensagem_erro = this.getMessageError(key, regra[key])
        }

        if (mensagem_erro.length) {
          mensagens_erro.push(mensagem_erro)
        }
      }
    })

    if (mensagens_erro.length) {
      if (mensagens_erro.length < 3) {
        mensagens_erro = mensagens_erro.join(' e ')
      } else {
        let temp = mensagens_erro.splice(mensagens_erro.length - 1, 1)
        mensagens_erro = `${mensagens_erro.join(', ')} e ${temp}`
      }
      mensagem_erro += '.'
    } else {
      mensagens_erro = ''
    }

    this.error_messages = `${mensagem_required} ${this.$toUpperFirstLetter(
      mensagens_erro
    )}`

    return { vmodel: this.regras_obj }
  }
}

export default validacaoMixin
