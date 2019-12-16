<template>
<div
  :ref="bootstrapvue_ref('jb-table-crud')"
>

  <jb-table
    v-bind="this.$attrs"
    :filter="table.filter"
    show-empty
    :ref="bootstrapvue_ref('jb-table')"
  >

  <template slot="header">
    <b-col class="col-2">
        <b-btn v-if="podeAdicionar" variant="primary" dark class="mb-2" ref="btn-novo" @click="novo()"> <jb-icone>i-Add</jb-icone> {{btnAddTexto || 'Adicionar'}}</b-btn>
      </b-col>
      <b-col class="col-4 offset-md-6">
        <jb-text v-model="table.filter" placeholder="Pesquisar" >
          <b-btn slot="append" variant="primary" :disabled="!table.filter" @click="table.filter = ''">X</b-btn>
        </jb-text>
      </b-col> 
  </template>

  <template v-slot:actions="{ index, item, field, value }" >
      <div class="mr-2">

          <slot name="actions-prepend" :item="item" :field="field" :value="value" :index="index" ></slot>

          <b-btn v-if="podeEditar" size="sm" variant="warning" @click="editar(item, index)" class="py-1 px-3"> <jb-icone tooltip="Editar" > mdi mdi-pencil </jb-icone> </b-btn>
          <b-btn v-if="podeAtivarInativar" size="sm" variant="info" @click="ativarInativarConfirm(item, index)" class="py-1 px-3"> <jb-icone :tooltip="item.ativo ? 'Inativar' : 'Ativar'" > mdi {{ item.ativo ? 'mdi-arrow-down' : 'mdi-arrow-up'}} </jb-icone> </b-btn>
          <b-btn v-if="podeDeletar" size="sm" variant="danger" @click="deletarConfirm(item, index)" class="py-1 px-3"> <jb-icone tooltip="Deletar" > mdi mdi-delete </jb-icone> </b-btn>

          <slot name="actions-append" :item="item" :field="field" :value="value" :index="index"></slot>

      </div>
  </template>

  </jb-table>

  <b-modal 
    v-model="modal_options.mostrar" 
    centered 
    no-close-on-esc 
    no-close-on-backdrop
    button-size="sm"
    :title="formTitulo"

    @ok="saveConfirm"
    @show="abrirModal"
    @hidden="fecharModal"
  >

    <jb-form v-model="form.valido">
      <slot name="form" :table_form="form" :cancelar="fecharModal" :salvar="saveConfirm"></slot>
    </jb-form>

    <template v-slot:modal-footer="{ ok, cancel, hide }">
      <b-button size="sm" variant="secondary" @click="cancel()"> Cancelar </b-button>
      <b-button size="sm" variant="primary" @click="ok()" :disabled="!formValido"> Ok </b-button>
    </template> 

  </b-modal>

</div>
</template>


<script>

import globalMixin from "./../../jb-v-global/jb-v-mixin-global";

export default {
  mixins:[globalMixin],
  props:{
    podeAdicionar:{type:Boolean, default:true},
    podeEditar:{type:Boolean, default:true},
    podeAtivarInativar:{type:Boolean, default:true},
    podeDeletar:{type:Boolean, default:false},

    btnAddTexto:String,

    formOptions:Object,
    modalOptions:Object,
  },
  data() {return {
      dadosReset:[],
      modal_options: Object.assign({
        mostrar: false,
        titulo: {
          novo: "Adicionar",
          editar: "Editar",
        },
      }, this.modalOptions),
      form_options: Object.assign({
        valido: true
      }, this.formOptions),
      form:{
        valido:false,
        dados:this.value,
      },
      loading:{
        mostrar:false
      },
      table:{
        filter: this.tableSearch,
        index_selecionado: -1,
      },
  }},
  computed: {
    tituloNovo(){ return typeof this.modal_options.titulo=='string' ? this.modal_options.titulo : this.modal_options.titulo.novo},
    tituloEditar(){return typeof this.modal_options.titulo=='string' ? this.modal_options.titulo : this.modal_options.titulo.editar},
    formTitulo() { return this.table.index_selecionado === -1 ? this.tituloNovo :  this.tituloEditar },
    formValido() {return this.form.valido && this.form_options.valido},
    tableSearch(){ return this.search || this.table.search },
    tableItems(){ return this.$attrs.items },
    
  },
  created () {    
    this.table.index_selecionado = -1
    this.dadosReset = this.$copiarObjeto(this.form.dados)
  },
  methods: {
    
    preNovo(...params){this.$emit('pre-novo', ...params)},
    preEditar(item, index, ...params){
      this.$emit('pre-editar', item, index, ...params)
      return item;
    },
    preDeletar(...params){this.$emit('pre-deletar', ...params)},
    preAtivarInativar(...params){this.$emit('pre-ativar-inativar', ...params)},
    posNovo(...params){this.$emit('pos-novo', ...params)},
    posEditar(...params){this.$emit('pos-editar', ...params)},
    posDeletar(...params){this.$emit('pos-deletar', ...params)},
    posAtivarInativar(...params){this.$emit('pos-ativar-inativar', ...params)},
    posFechar(...params){this.$emit('pos-fechar', ...params)},

    emitInput(){
      this.$emit('input',this.form.dados)
    },
    atualizarVModel(novos_dados){
      this.form.dados = Object.assign({}, this.form.dados, novos_dados)
      this.emitInput()
    },
    resetar(){
      this.table.index_selecionado = -1
      this.atualizarVModel(this.dadosReset)
    },
    abrirModal(){
      this.modal_options.mostrar = true
    },
    fecharModal() {
      if( ! this.modal_options.manter_aberto){
        this.modal_options.mostrar = false
      }
      
      this.resetar()
      this.posFechar()
    },

    // ==== Operações das Actions do Datatable
    novo(){
      this.preNovo()
      this.abrirModal()
    },
    editar (item, index) {
      this.table.index_selecionado = index

      item = this.tableItems[index]
      item = this.preEditar(item, index)

      this.atualizarVModel(item)
      this.abrirModal()
    },
    ativarInativarConfirm (item, index) {
      this.$makeConfirm({
        title: 'Alerta!',
        text: "Tem certeza que quer alterar?",
        showCancelButton: true,
        confirmButtonText: 'Sim, pode alterar',
        cancelButtonText: 'Não, cancele!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.value) {
          this.$emit('ativar-inativar',item,index)
        }
      })
    },
    deletarConfirm (item, index) {
      this.$makeConfirm({
        title: 'Alerta!',
        text: "Tem certeza que quer DELETAR?",
        showCancelButton: true,
        confirmButtonText: 'Sim, pode deletar',
        cancelButtonText: 'Não, cancele!',
        reverseButtons: true,
        customClass:{
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-success mr-3'
        }
      })
      .then((result) => {
        if (result.value) {
          this.$emit('deletar',item,index)
        }
      })
    },
    saveConfirm (bvModalEvt) {
      
      bvModalEvt.preventDefault()

      if(!this.formValido){
        return false
      }

      this.form.valido = false

      let item = this.form.dados

      this.$makeConfirm({
        title: 'Alerta!',
        text: "Tem certeza que quer salvar?",
        showCancelButton: true,
        confirmButtonText: 'Sim, pode salvar',
        cancelButtonText: 'Não, cancele!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.value) {
          this.$emit('ok',item, this)
        }
        this.form.valido = true
      })
    },
  },

}
</script>
