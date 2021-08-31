<template>
  <q-page class="q-mx-md">
    <div class="text-h5 q-my-md">
      Report
      <q-chip color="primary" text-color="white" label="Page Camat" />
    </div>

    <!-- <div class="row">
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
            <div class="text-subtitle2">{{ item['kategoriPengaduan'] }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ item["deskripsi"] }}
          </q-card-section>
        </q-card>
      </div>
    </div> -->

    <q-table
      class="my-sticky-header-table"
      title="Treats"
      :data="build"
      :columns="tableHeaders"
      row-key="name"
      flat
      bordered
    >
      <!-- <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <q-badge :label="props.value"></q-badge>
          <img v-for="(gambar, key) in gambar" :src="gambar.id" :alt="gambar.alt" :key="key" />
        </q-td>
      </template> -->
    </q-table>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";
import { Notify } from "quasar";
export default defineComponent({
  props: {},

  setup(props, { root }) {
    let charts = [];

    const auth = sessionStorage.getItem("token");
    const userStore = JSON.parse(sessionStorage.getItem("users"));

    const state = reactive({
      build: [],
      dataPengaduan: [],
      dataPrepare: {},
      searches: {
        isFetching: false,
      },
    });

    onMounted(() => {
      if (!auth) {
        root.$router.push({ path: "/" });
        Notify.create({
          type: "Please login!",
          message: "No Access Denied!",
        });
      }

      if (userStore["level"] != "camat") {
        root.$router.push({ path: "/" });
        Notify.create({
          color: "red",
          icon: "error",
          message: "No Access Denied!",
        });
      }

      getData();
    });

    const getData = async () => {
      
      axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
      await axios
        .get("http://localhost:8000/api/pengaduan/", {
          // getPengaduan
        })
        .then(function (response) {
          state.searches.isFetching = true;
          
          const data = response["data"]["data"]["data"];
          // state.dataPengaduan = response["data"]["data"]["data"];

          charts = data || [];
          state.build = charts;
          state.searches.isFetching = false;
        })
        .catch(function (error) {
          // handle error
        });
        
    };

    const tableHeaders = [
      {
        label: "ID",
        field: "id",
        name: "id",
        sortable: true,
        align: "right",
      },
      {
        label: "Kategori Pengaduan",
        field: "kategoriPengaduan",
        name: "kategoriPengaduan",
        sortable: false,
        align: "left",
      },
      {
        label: "Deskripsi",
        field: "deskripsi",
        name: "deskripsi",
        sortable: false,
        align: "left",
      },
      {
        label: "File",
        field: "gambar",
        name: "gambar",
        sortable: false,
        align: "left",
      },
    ];

    return {
      ...toRefs(state),
      getData,
      tableHeaders,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
