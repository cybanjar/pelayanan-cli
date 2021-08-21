<template>
  <div class="fullscreen bg-hero q-pa-md flex flex-center">
    <q-card
      bordered
      class="style-login bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl"
    >
      <div class="q-ma-md">
        <q-card-section>
          <div class="text-h5 font-bold">
            Reset Password
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="onResetPassword" class="q-gutter-y-sm">
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

            <q-input
              outlined
              v-model="form.password"
              autocomplete="on"
              :type="isPwd ? 'password' : 'text'"
              label="Password *"
              lazy-rules
              required
              :rules="[
                (val) => (val && val.length > 6) || 'Min password 8',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              outlined
              v-model="form.password_confirmation"
              autocomplete="on"
              :type="isPwd2 ? 'password' : 'text'"
              label="Password Confirmation *"
              lazy-rules
              required
              :rules="[
                (val) => (val && val.length > 6) || 'Please type password confirmation',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>

            <q-btn
                label="Reset Password"
                class="w-full q-mt-md q-py-xs"
                type="submit"
                unelevated
                color="primary"
            />

            <div class="text-red" v-if="validation.message">{{ validation.message }}</div>
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
        password: "",
        password_confirmation: ""
      },
      isPwd: true,
      isPwd2: true,
      validation: {
        message: ''
      }
    });

    onMounted(() => {
    });

    const onResetPassword = async () => {
        // await axios
        // .post(api.baseUrl+'reset-password', {
        //   token: root.$route.query.token,
        //   email: state.form.email,
        //   password: state.form.password,
        //   password_confirmation: state.form.password_confirmation
        // })
        // .then((response) => {
        //     console.log("response : ", response.message);
        //     Notify.create({
        //       type: 'positive',
        //       message: response.data.message
        //     })
        //     root.$router.push({ path: "/login" });
        // })
        // .catch((error) => {
        //   let errors = error.response.data
        //   console.log(errors.message);
        //   state.validation.message = errors.message;
        // });

        const fetchData = await api.doPost('reset-password', {
          token: root.$route.query.token,
          email: state.form.email,
          password: state.form.password,
          password_confirmation: state.form.password_confirmation
        })
        if(fetchData == null) {
          console.log('gagal')
          state.validation.message = "Data Failed!"
        } else if (fetchData.statusText == "OK") {
          Notify.create({
            type: 'positive',
            message: fetchData.data.message
          })
          root.$router.push({ path: "/login" });
        }
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
