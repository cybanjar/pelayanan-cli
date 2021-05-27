<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white q-pa-sm q-gutter-y-sm" unelevated>
      <q-toolbar class="text-primary">
        <q-btn flat dense round icon="lightbulb" aria-label="Menu" />

        <q-toolbar-title class=""> e-Pelayanan </q-toolbar-title>

        <q-toolbar-title>
          <q-btn to="/" stretch flat label="Home" />
          <q-btn to="/profile" stretch flat label="Profile" />
          <q-btn to="/pengaduan" stretch flat label="Pengaduan" />
          <q-btn to="/kontak" stretch flat label="Kontak" />
        </q-toolbar-title>

        <div v-if="isLogin">
          <q-btn to="/register" class="q-mx-sm" stretch flat label="Register" />
          <q-btn to="/login" class="shadow-xl px-2" color="primary" rounded unelevated label="Login" />
        </div>
        <div v-else>
          <q-btn to="/" class="shadow-xl" color="primary" label="Logout" rounded unelevated />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";

export default defineComponent({
  props: {},

  setup() {
    const state = reactive({
      isLogin: true
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

