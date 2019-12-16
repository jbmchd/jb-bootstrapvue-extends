// import array from "./utils/functions/array";
// import datetime from "./utils/functions/datetime";
// import object from "./utils/functions/object";
// import moeda from "./utils/functions/moeda";
// import numero from "./utils/functions/numero";
// import outros from "./utils/functions/outros";
// import regex from "./utils/functions/regex";
// import string from "./utils/functions/string";

// This exports the plugin object.
export default {
  // Tudo criado neste arquivo será global
  install(Vue) {
    //================================================
    // 1.Variaveis
    //================================================

    //================================================
    // 2. Diretivas
    //================================================

    Vue.directive('mask', {
      bind: (el, binding, vnode) => {
        let mask = binding.value
        let componente = vnode.componentInstance
        componente.mask = mask
      }
    })
    Vue.directive('rules', {
      bind: (el, binding, vnode) => {
        let regras = binding.value
        let componente = vnode.componentInstance
        componente.regras = regras
      },
      update: (el, binding, vnode) => {
        let regras = binding.value
        let componente = vnode.componentInstance
        componente.regras = regras
      }
    })
    //================================================
    // 3. Opções no componente
    //================================================

    //================================================
    // 4. Metodos
    //================================================
  }
}
