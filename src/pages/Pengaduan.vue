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

  setup(props, { root }) {
    const state = reactive({});

    onMounted(() => {
      if (!sessionStorage.getItem('auth')) {
        root.$router.push({path: '/login'})
      }
      // Notify.create({
      //   message: "Welcome ",
      //   color: "info",
      // });
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
