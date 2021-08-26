<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary q-pa-sm q-gutter-y-sm" unelevated>
      <q-toolbar class="text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="isMobileVisible"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="isMobileHidden "> <q-img class="w-8 h-8" src="../assets/Bookmark.svg"/> </q-toolbar-title>
        <!-- <q-toolbar-title></q-toolbar-title> -->

        <q-toolbar-title class="isMobileHidden">
          <q-btn to="/" stretch flat label="Home" />
          <q-btn to="/profile" stretch flat label="Profile" />
          <q-btn
            v-show="isPengunjung"
            to="/pengaduan"
            stretch
            flat
            label="Pengaduan"
          />
          <q-btn
            v-show="isCamat"
            to="/camat"
            stretch
            flat
            label="Report"
          />
          <q-btn
            v-show="isAdmin"
            to="/admin"
            stretch
            flat
            label="Report"
          />
          <q-btn to="/kontak" stretch flat label="Kontak" />
        </q-toolbar-title>

        <div v-if="isLogin">
          <q-btn
            to="/register"
            class="q-mx-sm"
            flat
            rounded
            label="Register"
          />
          <q-btn
            to="/login"
            class="shadow-xl px-2"
            color="white"
            rounded
            text-color="primary"
            unelevated
            label="Login"
          />
        </div>
        <div v-else>
          <q-btn-dropdown
            color="primary"
            rounded
            unelevated
            class=""
            icon="account_circle"
          >
            <q-list>
              <q-item @click="goToProfile" clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Account Settings</q-item-label>
                </q-item-section>
              </q-item>

              <q-item @click="removeAuth" clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer unelevated>
      <q-toolbar class="bg-primary">
        <q-toolbar-title>
          <div class="text-grey-50 text-center text-overline">
            Copyright © 2021 | Wanasari
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-primary rounded-right-xl row items-center"
      :breakpoint="4096"
    >
      <q-list>
        <q-item-label header>
          <div
            class="text-uppercase text-harris text-gray-100 text-bold text-h6"
          >
            e-Pelayanan
          </div>
        </q-item-label>
        <div class="cursor-pointer">
          <q-item to="/">
            <q-item-section avatar>
              <q-icon color="grey-4" name="home" />
            </q-item-section>
            <q-item-section
              class=" text-gray-100 capitalize text-xl"
              >Home</q-item-section
            >
          </q-item>
          <q-item to="/profile">
            <q-item-section avatar>
              <q-icon color="grey-4" name="maps_home_work" />
            </q-item-section>
            <q-item-section class=" text-gray-100 capitalize text-xl"
              >Profile</q-item-section
            >
          </q-item>
          <q-item  v-show="isPengunjung" to="/pengaduan">
            <q-item-section avatar>
              <q-icon color="grey-4" name="record_voice_over" />
            </q-item-section>
            <q-item-section class=" text-gray-100 capitalize text-xl"
              >Pengaduan</q-item-section
            >
          </q-item>
          <q-item to="/kontak">
            <q-item-section avatar>
              <q-icon color="grey-4" name="contact_mail" />
            </q-item-section>
            <q-item-section class=" text-gray-100 capitalize text-xl"
              >Contact</q-item-section
            >
          </q-item>
        </div>

        <div class="row justify-center q-mt-xl">
          <div class="col-12 col-md-4 text-center">
            <q-btn
              round
              flat
              @click="leftDrawerOpen = !leftDrawerOpen"
              text-color="grey-4"
              size="md"
              icon="highlight_off"
            />
          </div>
        </div>
      </q-list>
    </q-drawer>

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
      isLogin: false,
      isPengunjung: true,
      isCamat: false,
      isAdmin: false,
    });

    const removeAuth = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("users");
      root.$router.push({ path: "/" });
      window.location.reload();
    };

    const goToProfile = () => {
      root.$router.push("/account-setting");
    };

    onMounted(() => {
      const userStore = JSON.parse(sessionStorage.getItem("users"));
      const userAuth = sessionStorage.getItem("token");
      // console.log('token user', userStore, userAuth);

      // if (userAuth && userStore["level"] != "pengunjung") {
      //   state.isLogin = false;
      //   state.isPengunjung = false;
      // } else if (!userAuth) {
      //   state.isLogin = true;
      // }

      if (userAuth && userStore['level'] === 'pengunjung') {
        state.isPengunjung = true;
      } else if(userAuth && userStore['level'] === 'camat'){
        state.isCamat = true;
      } else if(userAuth && userStore['level'] === 'admin'){
        state.isAdmin = true;
      } else if(!userAuth) {
        state.isLogin = true
      }
    });

    return {
      ...toRefs(state),
      removeAuth,
      goToProfile,
      leftDrawerOpen: false,
    };
  },
});
</script>

<style lang="scss" scoped>

@media screen and (max-width: 576px) {
  .isMobileHidden {
    display: none;
    visibility: hidden;
  } 

}

@media screen and (min-width: 576px) {
  .isMobileVisible {
    display: none;
    visibility: hidden;
  }
}

.rounded-right-xl {
  border-radius: 0 20px 20px 0 !important;
}

.q-drawer {
  background: transparent;
}
</style>

