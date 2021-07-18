<template>
  <q-page class="row q-pa-md">
    <div class="col-md-4 q-pa-sm col-sm-4 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 text-center text-weight-bold uppercase">Admin {{ admin }}</div>
        </q-card-section>
        <q-card-section>
          Mengurusi administrasi yang ada di aplikasi e-pelayanan.
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 q-pa-sm col-sm-4 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 text-center text-weight-bold uppercase">Camat {{ admin }}</div>
        </q-card-section>
        <q-card-section>
          Jabatan sebagai camat di aplikasi e-pelayanan.
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 q-pa-sm col-sm-4 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 text-center text-weight-bold uppercase">Pengunjung {{ admin }}</div>
        </q-card-section>
        <q-card-section>
          User atau pengunjung ada di aplikasi e-pelayanan.
        </q-card-section>
      </q-card>
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

export default defineComponent({
  
  setup(props, { root }) {
    const token = sessionStorage.getItem("token");
    
    const state = reactive({
      dataUser: {},
      isLoading: false,
      admin: null,
      camat: null,
      pengunjung: null,
    });

    onMounted(() => {
      if (!token) {
        root.$router.push({ path: "/" });
      }

      UA.UA_ADMIN();
      fetchDataUser();
    });

    const fetchDataUser = async () => {
      const response = await api.doFetch("dataUser");
      console.log('responses', response);

      state.admin = response;
      for (let indexAdmin = 0; indexAdmin < state.admin.length; indexAdmin++) {
        const element = state.admin[indexAdmin];
        state.admin = element.level.length;
      }
    };

    return {
      ...toRefs(state),
      fetchDataUser,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
