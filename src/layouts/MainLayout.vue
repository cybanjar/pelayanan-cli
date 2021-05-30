<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white q-pa-sm q-gutter-y-sm" unelevated>
      <q-toolbar class="text-primary">
        <q-btn to="/" flat dense round icon="lightbulb" aria-label="Menu" />

        <q-toolbar-title class=""> e-Pelayanan </q-toolbar-title>

        <q-toolbar-title>
          <q-btn to="/" stretch flat label="Home" />
          <q-btn to="/profile" stretch flat label="Profile" />
          <q-btn to="/pengaduan" stretch flat label="Pengaduan" />
          <q-btn to="/kontak" stretch flat label="Kontak" />
        </q-toolbar-title>

        <div v-if="isLogin">
          <q-btn to="/register" class="q-mx-sm" outline rounded label="Register" />
          <q-btn to="/login" class="shadow-xl px-2" color="primary" rounded unelevated label="Login" />
        </div>
        <div v-else>
          <!-- <q-btn to="/" @click="removeAuth" class="shadow-xl" color="primary" label="Logout" rounded unelevated /> -->
  
          <q-btn-dropdown color="primary" rounded unelevated class="shadow-xl" icon="account_circle">
            <!-- <q-avatar size="42px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar> -->

            <!-- <q-btn to="/" @click="removeAuth" class="shadow-xl" color="primary" label="Logout" rounded unelevated />
            <q-btn to="/profile" flat label="Profile" /> -->
            
            <q-list>
              <q-item @click="goToProfile" clickable v-close-popup >
                <q-item-section>
                  <q-item-label>Account Settings</q-item-label>
                </q-item-section>
              </q-item>

              <q-item @click="removeAuth" clickable v-close-popup >
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
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

  setup(props, { root }) {
    const state = reactive({
      isLogin: false
    });

    const removeAuth = () => {
      sessionStorage.removeItem('auth');
      // root.$router.push('/')
      window.location.reload();
    }

    const goToProfile = () => {
      root.$router.push('/profile')
    }

    onMounted(() => {
      // if (!sessionStorage.getItem('auth')) {
      //   root.$router.push({path: '/login'})
      // } 

      if (sessionStorage.getItem('auth')) {
        state.isLogin = false;
      } else {
        state.isLogin = true;
      }

    });

    return {
      ...toRefs(state),
      removeAuth,
      goToProfile
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

