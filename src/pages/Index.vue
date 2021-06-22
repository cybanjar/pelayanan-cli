<template>
  <q-page class="flex column flex-center">
    <q-img
      src="../assets/logo_brebes.png"
      class="img_logo q-mb-md"
    />
    <div class="text-h4 font-bold text-center uppercase">Kecamatan Wanasari</div>
    <div class="text-h6 text-grey">Kabupaten Brebes</div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";


export default defineComponent({
  props: {},

  setup(props, { root: { $router } }) {
    const state = reactive({});

    onMounted(() => {
     
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.img_logo {
  width: 150px;
  height: auto;
}
</style>
