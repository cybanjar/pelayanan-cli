<template>
  <q-page class="">
    <div class="row justify-center">
      <div class="col-md-5 col-sm-6 col-xs-12">
        <div class="text-h4 text-weight-bold q-my-md">Get a quote</div>
        <div class="text-gray-700">
          Fill up the form and our team will get back to you within 24 hours.
        </div>
        <div class="q-mt-xl q-gutter-lg column">
          <div class="col">
            <q-btn flat icon="phone" label="+6287830120049" />
          </div>
          <div class="col">
            <q-btn
              flat
              class="text-lowercase"
              icon="mail"
              label="admin@pelayanan.com"
            />
          </div>
          <div class="col">
            <q-btn
              flat
              class="text-lowercase"
              icon="edit_location"
              label="102 streat kalibata city"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-card flat class="bg-gray-100 rounded-xl q-mt-md">
          <div class="q-pa-lg">
            <form>
              <q-card-section>
                <div class="font-medium mb-3">
                  Silahkan isi form buat masukkan kami agar aplikasi lebih baik
                  lagi
                </div>
                <div class="q-mb-sm">Name <span class="text-red">*</span></div>
                <q-input
                  v-model="form.name"
                  dense
                  placeholder="Input your name"
                  outlined
                  required
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>

                <div class="q-mb-sm q-mt-md">
                  Email <span class="text-red">*</span>
                </div>
                <q-input
                  v-model="form.email"
                  dense
                  placeholder="Input your email"
                  type="email"
                  outlined
                  required
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" />
                  </template>
                </q-input>

                <div class="q-mb-sm q-mt-md">
                  Phone Number<span class="text-red">*</span>
                </div>
                <q-input
                  v-model="form.phoneNumber"
                  dense
                  placeholder="Input your phone number"
                  outlined
                  required
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>

                <div class="q-mt-md q-mb-sm">
                  Message<span class="text-red">*</span>
                </div>
                <q-input
                  v-model="form.message"
                  placeholder="Input your message"
                  dense
                  outlined
                  type="textarea"
                />

                <q-btn
                  unelevated
                  type="submit"
                  class="
                    q-px-md q-py-xs
                    text-capitalize
                    q-mt-md
                    rounded-full
                    bg-primary
                    text-gray-100
                  "
                  label="Send Message"
                  required
                />
              </q-card-section>
            </form>
          </div>
        </q-card>
      </div>
    </div>
    <div class="text-h4 q-mt-lg text-center font-semibold">Maps <br> Kantor Kecamatan Wanasari<span class="text-primary">.</span> </div>
    <q-card flat  class="q-mt-md">
      <q-card-section class="q-pa-none">
        <div id="map" style="width:100%;height:400px"></div>
      </q-card-section>
    </q-card>
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
      form: {
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      },
    });

    onMounted(() => {
      myMap();
    });

    const myMap = () => {
      let myCenter = new google.maps.LatLng(-6.864447301724536, 109.00559261929719);
      // -6.307318045365646, 106.83700708239041
		  let mapCanvas = document.getElementById("map");
		  let mapOptions = {center: myCenter, zoom: 5};
		  let map = new google.maps.Map(mapCanvas, mapOptions);
		  let marker = new google.maps.Marker({position:myCenter});
		  marker.setMap(map);
    }

    // wanasari -6.864447301724536, 109.00559261929719

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
