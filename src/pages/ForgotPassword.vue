<template>
  <div class="fullscreen bg-hero q-pa-md flex flex-center">
    <q-card
      bordered
      class="style-login bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl"
    >
      <div class="q-ma-md">
        <q-card-section>
          <div class="text-h5 font-bold">
            Forgot Password
          </div>
          <div class="text-gray-500">Please input email for forget password</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="onResetPassword" class="">
            <q-input
              outlined
              v-model="form.email"
              label="Email *"
              type="email"
              lazy-rules
              required
              :rules="[
                (val) => (val && val.length > 0) || 'Please type email',
              ]"
            >
              <template v-slot:append>
                <q-icon name="email" class="cursor-pointer" />
              </template>
            </q-input>

            <q-btn
                label="Reset Password"
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
import api from '../api/fetch.api';
import axios from 'axios';

export default defineComponent({
  props: {},
  setup(props, { root }) {
    const state = reactive({
      form: {
        email: "",
      },
    });

    onMounted(() => {});

    const onResetPassword = async () => {
        // const data = await api.doPost("forgot-password", {
        //     email: state.form.email
        // });
        // console.log('data', data);
        
        await axios
        .post(api.baseUrl+"forgot-password", {
          email: state.form.email,
        })
        .then((response) => {
            Notify.create({
              type: 'positive',
              message: response.data.status
            })
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      ...toRefs(state),
      onResetPassword,
    };
  },
});
</script>

<style lang="scss" scoped>
.style-login {
  width: 450px;
}
</style>
