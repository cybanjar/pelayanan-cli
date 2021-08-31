<template>
  <div class="fullscreen bg-hero q-pa-md flex flex-center">
    <q-card
      bordered
      class="style-login bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl"
    >
      <div class="q-ma-md">
        <q-card-section>
          <div class="text-h5 font-bold">
            Register
          </div>
          <div class="text-gray-500">
            If you are in trouble, please register to report
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="onRegister" class="q-gutter-md">
            <q-input outlined v-model="form.name" label="Name" required>
              <template v-slot:append>
                <q-icon name="person" class="cursor-pointer" />
              </template>
            </q-input>

            <q-input
              outlined
              v-model="form.email"
              label="Email *"
              type="email"
              required
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
              counter
              :rules="[
                (val) =>
                  (val && val.length > 7 && val.length <= 20) ||
                  'The password must be at least 8 characters.',
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

            <div class="float-right text-right q-mb-md">
              <div class="q-mb-sm">
                Not have account?
                <router-link class="text-bold underline" to="/login"
                  >Login</router-link
                >
                <br />
                Or back to
                <a href="/" class="text-bold underline"> Home</a>
              </div>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                @click="onReset"
                class="q-mx-sm"
              />
              <q-btn
                label="Register"
                class="q-px-sm"
                type="submit"
                unelevated
                color="primary"
              />
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
  ref,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";
import api from "../api/fetch.api";
import { Notify } from "quasar";

export default defineComponent({
  props: {},
  setup(props, { root }) {
    let responseRegister;
    const state = reactive({
      isFetching: false,
      form: {
        name: "",
        email: "",
        password: "",
      },
      isPwd: true,
      validation: false,
    });

    onMounted(() => {});

    const onRegister = async () => {
      state.isFetching = true;
      async function asyncCall() {
        const fetchLogin = await api.doPost("register", {
          name: state.form.name,
          email: state.form.email,
          password: state.form.password,
        });

        if (fetchLogin) {
          responseRegister = fetchLogin || [];
          if (responseRegister.data.success == true) {
            Notify.create({
              type: "positive",
              message: responseRegister.data.message,
            });
            root.$router.push({ path: "/login" });
          } else {
          }
        } else {
          Notify.create({
            message: "Please check your data",
            type: "negative",
          });
          state.isFetching = true;
          return false;
        }
      }
      asyncCall();
    };

    const onReset = () => {
      state.form.name = null;
      state.form.email = null;
      state.form.password = null;
    };

    return {
      ...toRefs(state),
      onRegister,
      onReset,
    };
  },
});
</script>

<style lang="scss" scoped>
.style-login {
  width: 450px;
}
</style>
