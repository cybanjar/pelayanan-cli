<template>
  <q-page>
    <div class="text-h5 q-mx-lg">Form Pengaduan</div>
    <div class="row q-ma-lg">
      <div class="col-md-4 col-xs-12">
        <!-- enctype="multipart/form-data" -->
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          enctype="multipart/form-data"
        >
          <q-select
            outlined
            v-model="kategoriPengaduan"
            clearable
            :options="optionsKategoriPengaduan"
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

          <!-- <q-file outlined class="q-pr-md" label="Upload picture" v-model="files">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file> -->
          <img style="width: 100px" :src="imgPreview" v-if="imgPreview" />
          <input
            type="file"
            id="file"
            ref="file"
            @change="onChange"
            name="file"
            required
          />
          <br />

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
      <div class="col-md-4 col-xs-12 q-mt-sm">
        <div>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Panduan Pengaduan</q-toolbar-title>
          </q-toolbar>

          <q-list bordered>
            <q-item
              v-for="contact in contacts"
              :key="contact.id"
              class="q-my-sm"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ contact.letter }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label  class="text-body2 text-weight-bold text-uppercase">{{ contact.name }}</q-item-label>
                <q-item-label caption lines="3">{{
                  contact.email
                }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon :name="`${contact.icon}`" color="grey" />
              </q-item-section>
            </q-item>
          </q-list>
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
  ref,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";
import { Notify } from "quasar";
import api from "../api/fetch.api.js";

export default defineComponent({
  props: {},

  setup(props, { root }) {
    const token = sessionStorage.getItem("token");

    const state = reactive({
      kategoriPengaduan: null,
      optionsKategoriPengaduan: [
        "ktp",
        "sosial",
        "jalan",
        "pelayanan",
        "keamanan",
        "lainnya",
      ],
      deskripsi: "",
      file: "",
      imgPreview: "",
    });

    onMounted(() => {
      if (!token) {
        Notify.create({
          type: "negative",
          message: "Plase login!",
        });
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
    });

    const onChange = (e) => {
      // state.imgPreview = URL.createObjectURL(e.target.files[0]);
      state.file = e.target.files[0];
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      let existingObj = state;

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let data = new FormData();
      data.append("gambar", state.file);
      data.append("kategoriPengaduan", state.kategoriPengaduan);
      data.append("deskripsi", state.deskripsi);

      await axios
        .post("http://localhost:8000/api/pengaduan", data, config)
        .then((response) => {
          existingObj.success = response.data.success;
          // console.log("response sukses: ", response.data.message);
          Notify.create({
            type: "positive",
            message: response.data.message,
          });
          root.$router.push({ path: "/" });
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: error.response.data["errors"]["gambar"][0],
          });
          existingObj.output = error;
        });
    };

    const onReset = () => {
      state.kategoriPengaduan = null;
      state.deskripsi = null;
    };

    const contacts = [
      {
        id: 1,
        name: "Wajib login",
        email: "Untuk melakukan pengaduan anda diwajibkan login, jika anda belum punya akun silahkan mendaftar dahulu",
        letter: "1",
        icon: "verified_user"
      },
      {
        id: 2,
        name: "Pilih Kategori",
        email: "Pilihlah kategori yang akan anda laporkan, jika tidak ada pada kategori makan anda bisa memilih opsi lainnya",
        letter: "2",
        icon: "task"
      },
      {
        id: 3,
        name: "Input Keterangan",
        email: "Laporkan detail masalah pada kolom keterangan",
        letter: "3",
        icon: "fact_check"
      },
      {
        id: 4,
        name: "Wajib attact file",
        email: "Sebagai tanda bukti anda bisa menyisipkan foto, file, screenshot. File yang di support berupa PDF, JPG, PNG",
        letter: "4",
        icon: "attach_file"
      },
    ];

    return {
      ...toRefs(state),
      onSubmit,
      onReset,
      onChange,
      contacts,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
