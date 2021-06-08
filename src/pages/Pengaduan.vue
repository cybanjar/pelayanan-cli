<template>
  <q-page>
    <div class="text-h5 q-mx-lg">Form Pengaduan</div>
    <div class="row q-ma-lg">
      <div class="col-md-4 col-xs-12">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            transition-show="jump-up"
            transition-hide="jump-down"
            outlined
            v-model="jenisPengaduan"
            clearable
            :options="optionsJenisPengaduan"
            behavior="menu"
            label="Jenis Pengaduan *"
            required
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please select category',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="assessment" />
            </template>
          </q-select>

          <q-input
            outlined
            label="Keterangan *"
            v-model="deskripsi"
            type="textarea"
            required
          />

          <!-- <q-file
            v-model="files"
            label="Pick files/ picture"
            counter
            outlined
            :counter-label="counterLabelFn"
            max-files="3"
            multiple
            class="q-pr-md"
            max-total-size="4096"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file> -->

          <q-file outlined class="q-pr-md" label="Upload picture" v-model="files">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            @click="onReset"
            class="q-mx-sm"
          />
          <q-btn
            label="Submit"
            class="q-px-sm"
            type="submit"
            unelevated
            color="primary"
          />
        </q-form>
      </div>
      <div class="col-md-4 col-xs-12"></div>
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
import { Notify } from "quasar";

export default defineComponent({
  props: {},

  setup(props, { root }) {
    const auth = sessionStorage.getItem("auth");

    const state = reactive({
      jenisPengaduan: null,
      optionsJenisPengaduan: ["ktp", "sosial", "jalan", "pelayanan", "keamanan", "lainnya"],
      deskripsi: "",
      files: null,
    });

    onMounted(() => {
      console.log(auth);
      if (!auth) {
        root.$router.push({ path: "/login" });
      }

      const userStore = JSON.parse(sessionStorage.getItem("users"));
      if (userStore["level"] != "pengunjung") {
        root.$router.push({ path: "/" });
        Notify.create({
          color: "red",
          icon: "error",
          message: "No Access Denied!",
        });
      }

      // get data user
      
    });

    const onSubmit = async () => {
      // let header = axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
      const getAuth = axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
      let jenis = state.jenisPengaduan;
      let deskripsi = state.deskripsi;
      let gambar = state.files;

      console.log(
        state.jenisPengaduan,
        state.deskripsi,
        state.files,
        getAuth
      );

      const submit = await axios
        .post("http://localhost:8000/api/pengaduan", {
          getAuth,
          jenis,
          deskripsi,
          gambar
        })
        .then((response) => {
          console.log("response : ", response);

        })
        .catch((error) => {
          // state.validation = error.response.data;
          console.log(error);
        });
    };

    const onReset = () => {
      state.jenisPengaduan = null;
      state.deskripsi = null;
      state.files = null;
    };


    return {
      ...toRefs(state),
      onSubmit,
      onReset,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
