<template>
  <q-page class="flex flex-center">
      <div class="text-h2">Page Admin</div>
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

  setup(props, { root }) {
    const state = reactive({
    });

    onMounted(() => {
        console.log('page camat');
        if (!sessionStorage.getItem('auth')) {
        root.$router.push({path: '/'})
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
