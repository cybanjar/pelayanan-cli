<template>
  <q-page class="q-mx-md">
    <div class="text-h5 q-my-md">Page Camat</div>
    <div class="row">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-card
          v-for="(item, index) in dataPengaduan"
          :key="index"
          flat
          bordered
        >
          <q-img
            :src="`http://localhost:8000/storage/${item['gambar']}`"
            :ratio="16 / 9"
          />

          <q-card-section>
            <div class="text-h6">{{ item["kategoriPengaduan"] }}</div>
            <!-- <div class="text-subtitle2">{{ item['kategoriPengaduan'] }}</div> -->
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ item["deskripsi"] }}
          </q-card-section>
        </q-card>
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
import axios from "axios";
export default defineComponent({
  props: {},

  setup(props, { root }) {
    const auth = sessionStorage.getItem("auth");
    const state = reactive({
      dataPengaduan: [],
    });

    onMounted(() => {
      if (!auth) {
        root.$router.push({ path: "/" });
      }

      const getPengaduan = (axios.defaults.headers.common.Authorization = `Bearer ${auth}`);
      console.log("getPengaduan", getPengaduan);

      axios
        .get("http://localhost:8000/api/pengaduan/", {
          // getPengaduan
        })
        .then(function (response) {
          // handle success
          console.log("response", response["data"]["data"]["data"]);

          state.dataPengaduan = response["data"]["data"]["data"];
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
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
