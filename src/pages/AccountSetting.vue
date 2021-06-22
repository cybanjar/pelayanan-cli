<template>
  <q-page>
    <div class="text-h5 q-mx-lg q-my-md">My Profile</div>
    <div class="row justify-center q-mx-lg">
      <div class="col-md-6 col-xs-12">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 capitalize">{{ dataPrepare["name"] }}</div>
            <div class="text-gray-400">
              Level access
              <q-badge color="primary">{{ dataPrepare["level"] }}</q-badge>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-secondary">{{ dataPrepare["email"] }}</div>
            <div class="text-secondary">{{ dataPrepare["lokasi"] }}</div>
            <div class="text-secondary">{{ dataPrepare["phoneNumber"] }}</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>

          <ul v-for="(item, index) in dataPengaduan" :key="index">
            <li>{{ item['kategoriPengaduan'] }}
                <q-img
                  :src="`http://localhost:8000/storage/${item['gambar']}`"
                  :ratio="16/9"
                />
            </li>
          </ul>


          
        </q-card>
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
  onBeforeMount,
} from "@vue/composition-api";
import axios from 'axios';
export default defineComponent({
  props: {},

  setup(props, { root }) {
    const state = reactive({
      dataPrepare: [],
      dataPengaduan: [],
    });

    onBeforeMount(() => {
      if (!sessionStorage.getItem("token")) {
        root.$router.push({ path: "/login" });
      }

      if (state.dataPrepare === null) {
        console.log("hehe");
      }

      const myprofile = JSON.parse(sessionStorage.getItem("users"));
      state.dataPrepare = myprofile;
    });

    onMounted(() => {
      
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
