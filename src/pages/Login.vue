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
          <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input
              outlined
              v-model="form.email"
              label="Username *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:append>
                <q-icon name="person" class="cursor-pointer" />
              </template>
            </q-input>

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
  onMounted,
  computed,
  watch,
} from "@vue/composition-api";
import api from "../api/userAuth.api";
import { Notify } from "quasar";

export default defineComponent({
  props: {},
  setup(props, { root: { $router }, emit }) {
    const state = reactive({
      form: {
        email: '',
        password: ''
      },
      isPwd: true,
      result: "",
    });

    onMounted(async () => {
      // if (sessionStorage.getItem("login")) {
      //   $router.push("/");
      // }
    });

    const onSubmit = async () => {
      let isLogin = false;
      let tempData = [];

      const onLogin = await api.doFetch("userAuth", {
        username: state.username,
        password: state.password,
      });

      console.log(onLogin);
      //   state.result = onLogin["response"]
    };

    // Notify.create({
    //   type: "negative",
    //   message: "Wrong username or password",
    // });

    const onReset = () => {
      state.username = null;
      state.password = null;
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
.style-login {
  width: 450px;
}

.bg-hero {
  background-image: url("../assets/header-0.jpg");
  background-repeat: no-repeat;
  //   object-fit: cover;
}
</style>
