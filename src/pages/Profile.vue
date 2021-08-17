<template>
  <q-page class="q-pl-md">
    <div class="text-h2">Profile</div>
    <p>Kecamatan wanasari adalah bagian barat brebes</p>
    <q-input outlined dense style="width: 17rem" color="primary" v-model="text" label="Label">
      <template v-slot:prepend>
        <q-icon name="event" />
      </template>
    </q-input>
    <div class="q-pa-md">
      <div class="q-col-gutter-md row items-start">
        <div class="col-3">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-subtitle1 text-center">
              Brebes
            </div>
          </q-img>
        </div>
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

export default defineComponent({
  props: {},

  setup(props, { root: { $router } }) {
    const state = reactive({
      text: ''
    });

    onMounted(() => {
      console.log("mounted!");
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
