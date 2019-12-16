<template>
    <b-btn
      variant="primary"
      class="px-2"
      @click="alternarExibicao"
      ><i :class="_append_icon"></i
    ></b-btn>
</template>

<script>

export default {
  props:{
    value:Boolean,
    label:String,
  },
  data() {
    return {
      senha_visivel: this.value
    };
  },
  computed: {
    _append_icon() {
      return this.senha_visivel
        ? "mdi mdi-eye-outline"
        : "mdi mdi-eye-off-outline";
    }
  },
  methods: {
    alternarExibicao() {
      this.senha_visivel = !this.senha_visivel;
      this.$emit('input',this.senha_visivel)
    }
  }
};
</script>
