<template>
  <div class="fullscreen bg-hero q-pa-md flex flex-center">
    <q-card
      bordered
      class="style-login bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl"
    >
      <div class="q-ma-md">
        <q-card-section>
          <div class="text-h5 font-bold">
            <q-icon name="lock" color="primary" class="q-mr-sm" />
            Login
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="onLogin" class="q-gutter-md">
            <q-input outlined v-model="form.email" label="Email *" type="email">
              <template v-slot:append>
                <q-icon name="person" class="cursor-pointer" />
              </template>
            </q-input>

            <q-select
              color="primary"
              outlined
              v-model="form.level"
              :options="form.optionsLevel"
              label="Level"
            />

            <q-input
              outlined
              v-model="form.password"
              autocomplete="on"
              :type="isPwd ? 'password' : 'text'"
              label="Password *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
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
                <a href="/register" class="text-bold"> Register</a>
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
                label="Login"
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
import api from "../api/userAuth.api";
import axios from "axios";
import { Notify } from "quasar";

export default defineComponent({
  props: {},
  setup(props, { root }) {
    const state = reactive({
      form: {
        email: "",
        password: "",
        level: "",
        optionsLevel: ["admin", "pengunjung", "camat"],
      },
      isPwd: true,
      result: "",
      count: 1,
      validation: false,
    });

    onMounted(() => {});

    const onLogin = async () => {
      const email = state.form.email;
      const password = state.form.password;
      const level = state.form.level;

      const login = await axios
        .post("http://localhost:8000/api/login", {
          email,
          password,
          level,
        })
        .then((response) => {
          let responseAPI = response.data;
          console.log("response : ", responseAPI);
          
          if (responseAPI["success"] == false) {
            Notify.create({
              message: responseAPI["message"],
              icon: "error",
              color: "red",
            });
          } else {
            console.log("sukses");
            
            root.$router.push({ path: "/pengaduan" });
          }
        })
        .catch((error) => {
          // state.validation = error.response.data;
          console.log(error);
        });
    };

    const onReset = () => {
      state.form.username = null;
      state.form.password = null;
    };

    return {
      ...toRefs(state),
      onLogin,
      onReset,
    };
  },
});
</script>

<style lang="scss" scoped>
.style-login {
  width: 450px;
}

.bg-hero {
  background-image: url("../assets/header-0.jpg");
  background-repeat: no-repeat;
  //   object-fit: cover;
}
</style>
