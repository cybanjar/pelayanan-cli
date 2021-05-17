<template>
  <q-page class="flex flex-center">
    <h1>Pengaduan</h1>
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
  props: {
  },

  setup(props, { root: { $router } }) {
    const state = reactive({
    });

    onMounted(() => {
        console.log('mounted!');
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
