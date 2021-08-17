<template>
  <q-page class="row q-pa-md">
    <div class="col-md-4 q-pa-sm col-sm-4 col-xs-12">
      <q-card class="border border-solid border-l-8 border-red-500 bg-red-100" flat bordered>
        <q-card-section>
          <div class="text-h5 text-center text-weight-bold uppercase text-red-600">Admin {{ admin }}</div>
        </q-card-section>
        <q-card-section>
          Mengurusi administrasi yang ada di aplikasi e-pelayanan.
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 q-pa-sm col-sm-4 col-xs-12">
      <q-card class="border border-solid border-l-8 border-yellow-500 bg-yellow-100" flat bordered>
        <q-card-section>
          <div class="text-h5 text-center text-weight-bold uppercase text-yellow-600">Camat {{ camat }}</div>
        </q-card-section>
        <q-card-section>
          Jabatan sebagai camat di aplikasi e-pelayanan.
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 q-pa-sm col-sm-4 col-xs-12">
      <q-card class="border border-solid border-l-8 border-green-500 bg-green-100" flat bordered>
        <q-card-section>
          <div class="text-h5 text-center text-weight-bold uppercase text-green-600">Pengunjung {{ pengunjung }}</div>
        </q-card-section>
        <q-card-section>
          User atau pengunjung ada di aplikasi e-pelayanan.
        </q-card-section>
      </q-card>
    </div>

    <div class="w-full q-pa-sm">
      <q-table
        class="my-sticky-header-table"
        title="Pengaduan Masyarakat"
        :data="build"
        :columns="tableHeaders"
        :filter="filter"
        no-data-label="No data"
        row-key="name"
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-btn
            flat
            round
            class="q-mr-md"
            color="primary"
            icon="archive"
            no-caps
            @click="exportTable"
          >
            <q-tooltip>Download CSV</q-tooltip>
          </q-btn>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon color="primary" name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="user_id" :props="props">
              {{ props.row.user_id }}
            </q-td>
            <q-td key="kategoriPengaduan" :props="props">
              {{ props.row.kategoriPengaduan }}
            </q-td>
            <q-td key="gambar" :props="props">
              <q-img class="w-20 rounded-md" :src="`https://api.akusaralawoffice.com/api_pelayanan/storage/${props.row.gambar}`" />
            </q-td>
            <q-td key="deskripsi" :props="props">
              {{ props.row.deskripsi }}
            </q-td>
            <q-td key="created_at" :props="props">
              {{ props.row.created_at }}
            </q-td>
            <q-td key="updated_at" :props="props">
              {{ props.row.updated_at }}
            </q-td>
          </q-tr>
        </template>

      </q-table>
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
import api from "../api/fetch.api.js";
import UA from '../utils/userAccess.js';
import { exportFile } from 'quasar';

export default defineComponent({
  
  setup(props, { root }) {
    let charts = [];
    const token = sessionStorage.getItem("token");
    
    const state = reactive({
      build: [],
      dataUser: {},
      isLoading: false,
      admin: null,
      camat: null,
      pengunjung: null,
      filter: '',
    });

    onMounted(() => {
      if (!token) {
        root.$router.push({ path: "/" });
      }

      UA.UA_ADMIN();
      fetchDataUser();
      getDataPengaduan();
    });

    const getDataPengaduan = async () => {
      const data = await api.doFetch("pengaduan");
      console.log('data', data.data);
      charts = data.data || [];
      state.build = charts;
    }

    const fetchDataUser = async () => {
      const response = await api.doFetch("dataUser");
      // console.log('responses', response);

      let dataPengunjung = response.filter(function (index){
        return index.level === 'pengunjung'
      });
      state.pengunjung = dataPengunjung.length;

      let dataAdmin = response.filter(function (index){
        return index.level === 'admin'
      });
      state.admin = dataAdmin.length;

      let dataCamat = response.filter(function (index){
        return index.level === 'camat'
      });
      state.camat = dataCamat.length;
    };

    const exportTable = () => {
      const content = [ tableHeaders.map(col => wrapCsvValue(col.label)) ].concat(
        charts.map(row => tableHeaders.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }

    function wrapCsvValue (val, formatFn) {
      let formatted = formatFn !== void 0
        ? formatFn(val)
        : val

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
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
        label: "User ID",
        field: "user_id",
        name: "user_id",
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
      {
        label: "Create at",
        field: "created_at",
        name: "created_at",
        sortable: true,
        align: "left",
      },
      {
        label: "Update at",
        field: "updated_at",
        name: "updated_at".substring(0, 10),
        sortable: true,
        align: "left",
      },
    ];

    return {
      ...toRefs(state),
      fetchDataUser,
      getDataPengaduan,
      tableHeaders,
      exportTable
    };
  },
});
</script>

<style lang="scss" scoped>
.my-sticky-header-table {
  height: 50vh;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #c1f4cd;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
}
</style>
