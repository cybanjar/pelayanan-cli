<template>
  <div class="fullscreen bg-hero q-pa-md flex flex-center">
    <q-card
      bordered
      class="style-login bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl"
    >
      <div class="q-ma-md">
        <q-card-section>
          <div class="text-h5 font-bold">
            <!-- <q-icon name="lock" color="primary" class="q-mr-sm" /> -->
            Login
          </div>
          <div class="text-gray-500">Welcome back, please login</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="onLogin" class="q-gutter-md">
            <q-input
              outlined
              v-model="form.email"
              label="Email *"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:append>
                <q-icon name="email" class="cursor-pointer" />
              </template>
            </q-input>

            <!-- <q-select
              color="primary"
              outlined
              v-model="form.level"
              :options="form.optionsLevel"
              label="Level"
            /> -->

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
                <router-link class="text-bold underline" to="/register"
                  >Register</router-link
                > 
                Or
                <br />
                <router-link class="text-bold underline" to="/forgot-password"
                  >Lupa password</router-link
                >
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
  onMounted,
} from "@vue/composition-api";
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
      isCamat: false
    });

    onMounted(() => {});

    const onLogin = async () => {
      const login = await axios
        .post("http://localhost:8000/api/login", {
          email: state.form.email,
          password : state.form.password
        })
        .then((response) => {
          let responseAPI = response.data;
          // console.log("response : ", responseAPI);

          if (responseAPI["success"] == false) {
            Notify.create({
              message: responseAPI["message"],
              icon: "error",
              color: "red",
            });
          } else {
            Notify.create({
              message: "Welcome back, " + responseAPI["user"]["name"],
              icon: "check_circle",
              color: "green",
            });

            sessionStorage.setItem("token", responseAPI["access_token"]);

            sessionStorage.setItem(
              "users",
              JSON.stringify(responseAPI["user"])
            );

            const infoUser = responseAPI["user"]["level"];
            if (infoUser == "admin") {
              root.$router.push({ path: "/admin" });
            } else if (infoUser == "camat") {
              root.$router.push({ path: "/camat" });
            } else {
              root.$router.push({ path: "/pengaduan" });
            }
          }
        })
        .catch((error) => {
          // state.validation = error.response.data;
          console.log(error);
        });
    };

    const onReset = () => {
      state.form.email = null;
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
</style>
