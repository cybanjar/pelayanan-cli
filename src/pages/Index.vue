<template>
  <q-page class="flex flex-center">
    <div class="row bg-primary">
      <div
        v-for="(item, index) in dataPrepare"
        :key="index"
        class="col-md-4 col-sm-6 col-xs-12"
      >
        <q-btn
          align="left"
          :to="item['link']"
          flat
          class="bg-primary text-white w-full q-py-sm"
        >
          {{ item["id"] }}. {{ item["caption"] }}
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import data from "../../data/data";

export default defineComponent({
  props: {
  },

  setup(props, { root: { $router } }) {
    const state = reactive({
      dataPrepare: [],
    });

    onMounted(() => {
      const dataPrepare = data["data"];
      localStorage.setItem("modules", JSON.stringify(dataPrepare));
      state.dataPrepare = dataPrepare;
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
