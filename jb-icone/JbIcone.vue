<template>
    <span :id="_id" style="max-width: max-content; max-height: max-content;">

        <i 
            :class="icone+' '"
            :ref="bootstrapvue_ref(ref)"
            v-on="this.$listeners"
            v-bind="this.$attrs"
        ></i>

        <b-tooltip v-if="tooltip || tooltipOptions" :target="_id" triggers="hover" v-bind="this.tooltipOptions">
            {{tooltip}}
        </b-tooltip>

    </span>

</template>
<script>

import globalMixin from "./../../jb-v-global/jb-v-mixin-global";

export default {
    mixins: [globalMixin],
    props:{
        tooltip:String,
        tooltipOptions:Object,
        variant:String
    },
    data(){ return {
        ref: 'jb-icone'
    }},
    computed:{
        cor(){
            return this.variant ? `text-${variant}` : 'text-primary'
        },
        icone(){
            return this.$slots.default[0] ? this.$slots.default[0].text : null
        },
        _id(){
            let id = this.id || this._uid
            return id.toString()
            
        }
    },
    mounted(){
    },
}
</script>

<style scoped>
.btn:focus, .btn:hover, .btn :active:focus {
    box-shadow: none
}
</style>
