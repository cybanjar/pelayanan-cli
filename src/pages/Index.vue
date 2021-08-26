<template>
  <q-page class="">
    <div class="row justify-center q-py-lg">
      <div class="col-md-6 text-center col-sm-8 col-xs-12">
        <q-img src="../assets/logo_brebes.png" class="img_logo q-mb-md" />
        <div class="text-h4 font-bold">Kecamatan Wanasari</div>
        <div class="font-medium text-uppercase text-gray-400">
          Kabupaten Brebes
        </div>
        <div class="text-gray-700 q-mt-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
          odio. Laboriosam ex repudiandae repellendus rerum facere modi,
          voluptatum culpa! Quia possimus impedit iste est. Voluptates adipisci
          nulla laudantium eligendi quibusdam! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Suscipit, odio. Laboriosam ex
          repudiandae repellendus rerum facere modi, voluptatum culpa! Quia
          possimus impedit iste est. Voluptates adipisci nulla laudantium
          eligendi quibusdam!
        </div>
      </div>
    </div>

    <div class="row bg-gray-100" style="min-height: 45vh">
      <div v-for="n in 3" :key="n" class="col-md-4">
        <q-card  flat class="q-ma-lg">
          <q-card-section>
            {{ desc }}
          </q-card-section>
        </q-card>
      </div>
      <!-- <div class="col-md-4"></div>
      <div class="col-md-4"></div> -->
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
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    });

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
