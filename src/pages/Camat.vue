<template>
  <q-page class="q-mx-md" style="min-height: 80vh">
    <div class="text-h5 q-my-md">
      Report
      <q-chip color="primary" text-color="white" label="Page Camat" />
    </div>

    <div class="row scroll" style="max-height: 70vh">
      <div v-for="(item, index) in dataPengaduan" :key="index" class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
        <q-card flat bordered class="bg-grey-1">
          <q-img
            :src="`http://localhost:8000/storage/${item['gambar']}`"
            :ratio="16 / 9"
          />
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <!-- <div class="text-h6 text-capitalize">{{item["kategoriPengaduan"]}}</div> -->
                <q-chip color="primary" text-color="white">
                  {{item["kategoriPengaduan"]}}
                </q-chip> <br>
                <span class="text-subtitle2 text-gray-400">ID pengaduan </span> <span class="text-bold">{{ item["id"] }}</span> <br>
                <span class="text-subtitle2 text-gray-400">ID user </span> <span class="text-bold">{{ item["user_id"] }}</span> <br>
                <span class="text-subtitle2 text-gray-400">Created {{ item["created_at"].substring(0,10) }}</span>
              </div>

              <div class="col-auto">
                <q-btn class="text-right" color="grey-7" round flat icon="more_vert">
                  <q-menu>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            {{ item["deskripsi"].substring(0, 20) }} 
            <router-link to="/detail-report"> <span class="text-underline">read more</span></router-link>
          </q-card-section>

        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <q-btn @click="loadMore" class="q-mt-md text-capitalize" unelevated icon="cached" rounded label="Load More" />
    </div>
    
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
    let page = 1;

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
          type: "negative",
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
      // axios.defaults.headers.common.Authorization = `Bearer ${auth}`;

      await axios
        .get("http://localhost:8000/api/pengaduan/?page="+page, {
          // getPengaduan
        })
        .then(function (response) {
          const data = response["data"]["data"]["data"];
          state.dataPengaduan = data;
          console.log('data pengaduan',data);
          // charts = data || [];
          // state.build = charts;
          // state.searches.isFetching = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const loadMore = async () => {
      await axios
        .get("http://localhost:8000/api/pengaduan/?page="+ page++, {
        })
        .then(function (response) {
          const data = response["data"]["data"]["data"]
          state.dataPengaduan = data;
          console.log('data pengaduan', data);
          if (data.length == 0) {
            console.log('gak ada data');
            Notify.create({
              type: 'negative',
              message: 'No data'
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

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
      loadMore
    };
  },
});
</script>

<style lang="scss" scoped>
.text-underline {
  text-decoration: underline;
  color: $primary;
}
</style>
