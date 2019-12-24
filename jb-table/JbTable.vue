<template>
<div >
  <template>
    <slot name="header">
      <b-row  class="col-12 p-0 m-0">

      <slot name="header-left">
        <b-col class="col-6"></b-col>
      </slot>

      <jb-spacer></jb-spacer>

      <slot name="header-search">
        <b-col class="col-4 ">
          <jb-text v-model="pesquisar" placeholder="Pesquisar" >
            <b-btn slot="append" variant="primary" :disabled="!pesquisar" @click="pesquisar = ''"> <jb-icone>mdi mdi-close-circle-outline</jb-icone> </b-btn>
          </jb-text>
        </b-col> 
      </slot>

    </b-row>
    </slot>
  </template>

  <b-table :ref="bootstrapvue_ref('jb-table')" v-on="this.$listeners" v-bind="this.$attrs" show-empty :filter="filter || pesquisar" >

    <template #cell()="{index, item, value, unformatted, field, detailsShowing, toggleDetails, rowSelected, selectRow, unselectRow}">
      <slot name="cell" :index="index" :item="item" :value="value" :unformatted="unformatted" :field="field" :detailsShowing="detailsShowing" :toggleDetails="toggleDetails" :rowSelected="rowSelected" :selectRow="selectRow" :unselectRow="unselectRow" >
          
          <slot :name="'cell('+field.key+')'" :index="index" :item="item" :value="value" :unformatted="unformatted" :field="field" :detailsShowing="detailsShowing" :toggleDetails="toggleDetails" :rowSelected="rowSelected" :selectRow="selectRow" :unselectRow="unselectRow">

            <template v-if="field.formatter">
              <!-- TEM FORMATTER -->
              <template>
                {{formatter(field.formatter, item[field.key], field.key, item )}}
              </template>
            </template>
              <!-- NÃO TEM FORMATTER -->
            <template v-else>
              {{item[field.key]}}
            </template>

          </slot>

      </slot>
        
    </template>

    <template #cell(actions)="{index, item, field, value}">
      <slot name="actions" :index="index" :item="item" :field="field" :value="value" ></slot>
    </template>
  
    <template #table-busy>
      <slot name="table-busy">
        <div class="text-center text-primary my-2">
          <jb-loading :active="true" :color="loadingColor" height.number="50" width.number="50">
            <strong>Carregando dados, aguarde...</strong>
          </jb-loading>
        </div>
      </slot>
    </template>

    <template #empty="scope">
      <slot name="empty"><b-alert show variant="primary" class="text-center">Não há conteúdo a ser mostrado</b-alert></slot>
    </template>
    <template #emptyfiltered="scope">
      <slot name="emptyfiltered"><b-alert show variant="primary" class="text-center">Nada encontrado</b-alert></slot>
    </template>
  
  </b-table>
</div>

</template>

<script>

import moment from "moment";
import globalMixin from "./../../jb-v-global/jb-v-mixin-global";

export default {
  mixins: [globalMixin],
  props:{
    filter: String,
    loadingColor: { type: String, default: '#0079bf' }
  },
  data() {
    return {
      isBusy: false,
      pesquisar: null,
    }
  },
  created() {    
  },
  methods: {
    formatter(formatter, value, key, item){
      if(typeof formatter == 'function'){
        return formatter(value)
      }
      
      return this[formatter] ? this[formatter](value, key, item) : value
    },
    date(value, key, item){
      let date = moment(value)
      return date.isValid() ? date.format('D/M/Y') : null
    },
    datetime(value, key, item){
      let date = moment(value)
      return date.isValid() ? date.format('DD/MM/YYYY HH:mm:ss') : null
    },
    currency(value, key, item){
      return this.$formataNumeroParaMoeda(value)
    },
    cpf(value, key, item){
      return this.$mascaraCPF(value)
    },
    cnpj(value, key, item){
      return this.$mascaraCNPJ(value)
    },
    cns(value, key, item){
      return this.$mascaraCNS(value)
    },
  },

}
</script>
