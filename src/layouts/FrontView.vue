<style>
.v-app-bar {
  border: 1px solid black !important;
}
</style>
<template>
    <v-navigation-drawer v-if="isMobile" v-model="drawer" location="right" temporary>
    <v-list nav>
      <template v-for="navItem in navItems" :key="navItem.to">
        <v-list-item :to="navItem.to" v-if="navItem.show">
          <template v-slot:prepend>
            <v-icon :icon="navItem.icon"/>
            <v-list-item-title>{{ navItem.text }}</v-list-item-title>
          </template>
        </v-list-item>
      </template>
      <v-list-item v-if="isLogin" @click="logout">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout"/>
        </template>
        <v-list-title >登出</v-list-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="transparent">
    <v-container class="d-flex align-center">
      <v-btn  to="/" :active="false">
        <v-app-bar-title>Trip Map</v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = true"></v-app-bar-nav-icon>
      <template v-if="!isMobile">
        <template v-for="navItem in navItems" :key="navItem.to">
          <v-btn variant="text" :prepend-icon="navItem.icon" :to="navItem.to" v-if="navItem.show">
            {{ navItem.text }}
            <v-badge color="success" content="10" floating v-if="navItem.to === '/cart'"></v-badge>
          </v-btn>
        </template>
      </template>
      <v-btn v-if="!isMobile && isLogin" prepend-icon="mdi-logout" @click="logout">登出</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()
const user = useUserStore()
const { isLogin, isAdmin } = storeToRefs(user)

const drawer = ref(false)
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const navItems = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !isLogin.value },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !isLogin.value },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: isLogin.value },
    { to: '/order', text: '訂單', icon: 'mdi-clipboard-list-outline', show: isLogin.value },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: isLogin.value && isAdmin.value }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
    createSnackbar({
      text: error.response.data.message,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}

</script>
