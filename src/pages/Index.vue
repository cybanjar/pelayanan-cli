<template>
  <q-page class="">
    <div class="row justify-center pt-16">
      <div class="col-md-6 text-center col-sm-8 col-xs-12">
        <q-img src="../assets/logo_brebes.png" class="img_logo q-mb-md" />
        <div class="text-h4 font-bold">Kecamatan Wanasari</div>
        <div class="font-medium text-uppercase text-gray-400">
          Kabupaten Brebes
        </div>
        <div class="text-gray-700 q-mt-md">
          Wanasari adalah sebuah kecamatan di Kabupaten Brebes, Provinsi Jawa
          Tengah, Indonesia. Pusat pemerintahannya bertempat di desa Klampok.
          Kecamatan Wanasari berbatasan dengan kecamatan Bulakamba di sebelah
          barat, dengan kecamatan Brebes di sebelah barat, dengan kecamatan
          Jatibarang dan Larangan di sebelah selatan dan Laut Utara Jawa di
          sebelah utara. Kecamatan Wanasari juga dilalui oleh jalur pantura.
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
      desc: "",
    });

    onMounted(() => {});

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
