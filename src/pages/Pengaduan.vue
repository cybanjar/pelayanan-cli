<template>
  <q-page>
    <div class="text-h5 q-mx-lg">Form Pengaduan</div>
    <div class="row q-ma-lg">
      <div class="col-md-6 col-xs-12">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-select
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
              v-model="isi"
              type="textarea"
              required
            />

            <q-file
              v-model="files"
              label="Pick files/ picture"
              counter
              outlined
              use-chips
              max-files="3"
              multiple
              class="q-pr-md"
              max-total-size="4096"
              @rejected="onRejected"
            >
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
              label="Login"
              class="q-px-sm"
              type="submit"
              unelevated
              color="primary"
            />
          </q-form>
      </div>
      <div class="col-md-6 col-xs-12"></div>
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
import { Notify } from "quasar";

export default defineComponent({
  props: {},

  setup(props, { root }) {
    const state = reactive({
      jenisPengaduan: null,
      optionsJenisPengaduan: ["KTP", "Sosial", "Jalan", "Pelayanan", "Lainnya"],
      isi: "",
      files: [],
    });

    onMounted(() => {
      if (!sessionStorage.getItem("auth")) {
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

    const onSubmit = () => {
      console.log("ok");
    };

    const onReset = () => {
      state.jenisPengaduan = null;
      state.isi = null;
      state.files = null;
    };

    const onRejected = (rejectedEntries) => {
      Notify.create({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    }

    return {
      ...toRefs(state),
      onSubmit,
      onReset,
      onRejected
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
