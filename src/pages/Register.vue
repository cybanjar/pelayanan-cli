<template>
  <div class="row justify-center">
    <div class="col">
      <img class="w-full q-pa-md" src="../assets/example-3.svg" />
    </div>
    <div class="col q-ma-md">
      <q-card bordered class="bg-gray-50 bg-opacity-70 rounded-xl shadow-2xl">
        <div class="q-ma-md">
          <q-card-section>
            <div class="text-h5 font-bold">
              <q-icon name="lock" color="primary" class="q-mr-sm" />
              Register
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-sm">
              <q-input
                class=""
                outlined
                v-model="form.name"
                label="Complete name *"
                required
              >
                <template v-slot:append>
                  <q-icon name="person" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input
                outlined
                class=""
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
                required
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
                label="Birthday"
                outlined
                v-model="form.birthday"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.birthday">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-select
                outlined
                v-model="form.sex"
                :options="jk"
                label="Sex"
              />

              <q-input
                v-model="form.address"
                outlined
                label="Address"
                type="textarea"
              />

              <q-select
                outlined
                v-model="form.religion"
                :options="agama"
                label="Religion"
              />

              <q-input
                outlined
                type="tel"
                v-model="form.phoneNumber"
                label="Phone Number"
              />

              <div class="text-right q-mb-md">
                <div class="q-mb-sm">
                  Have account?<a href="/login" class="text-bold"> Login</a>
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
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import api from "../api/userAuth.api";
import { Notify } from "quasar";

export default defineComponent({
  props: {},
  setup(props, { root: { $router }, emit }) {
    const state = reactive({
      form: {
        name: null,
        email: null,
        password: null,
        birthday: "2019/02/01",
        sex: 'male',
        address: null,
        religion: 'islam',
        phoneNumber: null,
      },
      jk: ["male", "female"],
      agama: ["islam", "kristen", "hindu", "budha"],
      isPwd: true,
      result: "",
    });

    onMounted(async () => {});

    const onSubmit = async () => {};

    // Notify.create({
    //   type: "negative",
    //   message: "Wrong username or password",
    // });

    const onReset = () => {
      state.form.name = null;
      state.form.email = null;
      state.form.password = null;
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
