import Vue from 'vue'
// import pluginGlobal from "./plugins/jb-v-plugin-form";
// Vue.use(pluginGlobal);
// let Vue = window.Vue;

// Vue.component("jb-form", require("./JbForm.vue").default);

// Vue.component("jb-fieldset", require("./JbFieldset.vue").default);

// Vue.component("jb-select", require("./JbSelect/JbSelect.vue").default);
// Vue.component("jb-combobox", require("./JbSelect/JbCombobox.vue").default);
// Vue.component("jb-cmb-logradourotipo", require("./JbSelect/JbCmbLogradouroTipo.vue").default);
// Vue.component("jb-cmb-uf", require("./JbSelect/JbCmbUF.vue").default);
// Vue.component("jb-cmb-cidades", require("./JbSelect/JbCmbCidades.vue").default);

// Vue.component("jb-text", require("./JbText/JbText.vue").default);
// Vue.component("jb-text-password", require("./JbText/JbTextPassword.vue").default);
// Vue.component("jb-text-datetime", require("./JbText/JbTextDateTime.vue").default);
// Vue.component("jb-text-email", require("./JbText/JbTextEmail.vue").default);

// Vue.component("jb-textarea", require("./JbTextarea.vue").default);

import JbForm from './JbForm.vue'
import JbText from './JbText/JbText.vue'
import JbTextPassword from './JbText/JbTextPassword.vue'
import mostrarOcultarTextoIcone from './JbText/mostrarOcultarTexto.vue'
import JbSelect from './JbSelect.vue'
import JbSwitch from './JbSwitch.vue'

Vue.component('jb-form', JbForm)
Vue.component('jb-text', JbText)
Vue.component('jb-text-password', JbTextPassword)
Vue.component('jb-text-mostrar-ocultar-texto', mostrarOcultarTextoIcone)
Vue.component('jb-select', JbSelect)
Vue.component('jb-switch', JbSwitch)

// export {JbText}
