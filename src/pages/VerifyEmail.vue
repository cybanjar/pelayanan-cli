<template>
  <div class="fullscreen bg-hero q-pa-md flex flex-center">
    <q-card
      bordered
      class="style-login bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl"
    >
      <div class="q-ma-md">
        <q-card-section>
          <div class="text-h5 font-bold">Verify Account</div>
          <div class="text-gray-500">Please input email for verify email</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="onVerifyEmail" class="">
            <q-input
              outlined
              v-model="form.email"
              label="Email *"
              type="email"
              lazy-rules
              required
              :rules="[(val) => (val && val.length > 0) || 'Please type email']"
            >
              <template v-slot:append>
                <q-icon name="email" class="cursor-pointer" />
              </template>
            </q-input>

            <q-btn
              label="Sent Link Verify"
              class="w-full q-mt-md q-py-xs"
              type="submit"
              unelevated
              color="primary"
            />

            <div class="float-right text-right q-mb-md">
              <div class="q-my-sm">
                Are you login?
                <router-link class="text-bold underline" to="/login"
                  >Login</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import { Notify } from "quasar";
import api from "../api/fetch.api";
import axios from "axios";

export default defineComponent({
  props: {},
  setup(props, { root }) {
    const state = reactive({
      form: {
        email: "",
        token: sessionStorage.getItem("token"),
      },
    });

    onMounted(() => {
    });

    const onVerifyEmail = async () => {
      axios.defaults.headers.common.Authorization = `Bearer ${state.form.token}`;
      await axios
        .post(api.baseUrl+'email/verification-notification', {
          email: state.form.email,
        })
        .then((response) => {
          console.log("response : ", response);
          Notify.create({
            type: "positive",
            message: response.data.status,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      ...toRefs(state),
      onVerifyEmail,
    };
  },
});
</script>

<style lang="scss" scoped>
.style-login {
  width: 450px;
}
</style>
