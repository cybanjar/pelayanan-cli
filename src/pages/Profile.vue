<template>
  <q-page class="q-pl-md">
    <div class="text-h2">Profile</div>
    <p>Wanasari adalah sebuah kecamatan di Kabupaten Brebes, Provinsi Jawa Tengah, Indonesia. Pusat pemerintahannya bertempat di desa Klampok. Kecamatan Wanasari berbatasan dengan kecamatan Bulakamba di sebelah barat, dengan kecamatan Brebes di sebelah barat, dengan kecamatan Jatibarang dan Larangan di sebelah selatan dan Laut Utara Jawa di sebelah utara. Kecamatan Wanasari juga dilalui oleh jalur pantura. </p>
    <p>Sebagai sebuah kecamatan yang terletak di bagian utara Kabupaten Brebes serta sebagai daerah penyangga Kota Brebes yang semakin berkembang, Kecamatan Wanasari mempunyai fasilitas yang sangat memadai di beberapa bidang seperti sarana kesehatan, pendidikan, pasar, dan pusat oleh-oleh khas Brebes. </p>
    <p>Dibidang kesehatan, selain puskesmas terdapat pula sebuah rumah sakit yang terletak di jalur pantura desa Pesantunan yaitu RS Bhakti Asih yang melayani rawat inap 24 jam. Sebagian besar masyarakatnya bermata pencaharian sebagai petani, buruh tani, nelayan, peternak itik / bebek, pedagang, sektor jasa transportasi, serta pegawai negeri. Produk unggulan dari pertanian adalah bawang merah yang memasok kebutuhan daerah maupun nasional, dan mempunyai pasar khusus bawang merah di desa Klampok. </p>
    <p>Dibagian utara tepatnya di pesisir pantai, terdapat sentra budidaya ikan tambak seperti bandeng, udang, teri, mujair dan lainnya. Disekitar daerah pantai saat ini juga berkembang budidaya penanaman rumput laut. Kecamatan Wanasari juga merupakan sentra ternak bebek / itik yang menghasilkan produksi telur yang digunakan sebagai bahan baku pembuatan telur asin khas Brebes yang sudah dikenal secara nasional </p>
    <p>Pusat penjualan telur asin asli khas Brebes serta makanan khas lainnya yang menjadi tempat yang paling banyak dituju, terutama bagi para pengendara bermotor yang melintasi jalur pantura dapat ditemukan di kios-kios desa Pebatan dan Pesantunan di sepanjang Jalan P. Diponegoro,yang terletak di sebelah barat sungai Pemali, tidak jauh dari pusat kota Brebes.</p>
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
