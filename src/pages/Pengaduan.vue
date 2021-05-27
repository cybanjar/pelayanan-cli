<template>
  <q-page class="flex flex-center">
    <div class="text-h2">Pengaduan</div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import { Notify } from "quasar";

export default defineComponent({
  props: {},

  setup(props, { root: { $router } }) {
    const state = reactive({});

    onMounted(() => {
      Notify.create({
        message: "Welcome ",
        color: "info",
      });
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
