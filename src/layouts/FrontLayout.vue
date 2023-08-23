<style lang="scss" scoped>
  .v-list-item {
    a {
      color: var(--secondary-color)!important;
    }
  }
  .v-list {
    border-top: 5px solid var(--secondary-color);
  }
</style>
<template>
    <v-navigation-drawer class="app-bar-style" v-if="isMobile" v-model="drawer" location="right" temporary>
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" :to="{name: 'Home'}" :active="false">
       首頁
      </v-list-item>
        <v-menu >
          <template v-slot:activator="{ props }">
            <v-list-item
              color="transparent"
              v-bind="props"
              prepend-icon="mdi-city"
            >
              城市探索
            </v-list-item>
          </template>
          <v-list width="30vw" class="d-flex flex-wrap">
            <v-list-item
              v-for="(item, index) in city"
              :key="item.CityID"
              :value="index"
              class="d-block"
            >
              <!-- 直接在 v-list-item 中使用 router-link 进行导航 -->
              <router-link :to="{ name: 'City', query: { city: item.City } }">
                <v-list-item-title>{{ item.CityName }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>

      <template v-for="navItem in navItems" :key="navItem.to">
        <v-list-item :to="navItem.to" v-if="navItem.show">
          <template v-slot:prepend>
            <v-icon :icon="navItem.icon"/>
          </template>
          <template v-slot:append>
            <v-badge color="success" :content="cart.toString()" v-if="navItem.to === '/cart'" ></v-badge>
          </template>
          <v-list-item-title>{{ navItem.text }}</v-list-item-title>
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

  <v-app-bar class="nav-bg" :elevation="11">
    <v-container class="d-flex align-center">
      <router-link to="/">
        <v-img src="../assets/images/logo.svg" width="180"></v-img>
      </router-link>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = true"></v-app-bar-nav-icon>
      <template v-if="!isMobile">
        <v-btn prepend-icon="mdi-home" :to="{name: 'Home'}" :active="false">首頁</v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              <v-icon>mdi-city</v-icon>
              <p>城市探索</p>
            </v-btn>
          </template>
          <v-list width="30vw" class="d-flex flex-wrap">
            <v-list-item
              v-for="(item, index) in city"
              :key="item.CountyID"
              :value="index"
              class="d-block"
            >
            <router-link :to="{name: 'City', query: { city: item.City }}">
              <v-list-item-title>{{ item.CityName }}</v-list-item-title>
            </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <template v-for="navItem in navItems" :key="navItem.to">
          <v-btn variant="text" :prepend-icon="navItem.icon" :to="navItem.to" v-if="navItem.show">
            {{ navItem.text }}
            <v-badge color="success" :content="cart.toString()" floating v-if="navItem.to === '/cart'"></v-badge>
          </v-btn>
        </template>
      </template>
      <v-btn v-if="!isMobile && isLogin" prepend-icon="mdi-logout" @click="logout">登出</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view :key="$route.fullPath"></router-view>
  </v-main>
  <Footer></Footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import Footer from '@/layouts/FooterLayout.vue'

const createSnackbar = useSnackbar()

const user = useUserStore()
const { isLogin, isAdmin, cart } = storeToRefs(user)

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const drawer = ref(false)

const navItems = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !isLogin.value },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !isLogin.value }, //* ************* */
    { to: '/cart', text: '行程管理', icon: 'mdi-cart', show: isLogin.value },
    { to: '/orders', text: '我的行程', icon: 'mdi-format-list-numbered', show: isLogin.value },
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
const CityDetail = [
  // {
  //   CityID: '',
  //   CityName: '全台灣',
  //   CityCode: '',
  //   City: '',
  //   CountyID: 'ALL'
  // },
  {
    CityID: 'A',
    CityName: '臺北市',
    CityCode: 'TPE',
    City: 'Taipei',
    CountyID: 'A',
    Version: '23.05.1'
  },
  {
    CityID: 'B',
    CityName: '臺中市',
    CityCode: 'TXG',
    City: 'Taichung',
    CountyID: 'B',
    Version: '23.05.1'
  },
  {
    CityID: 'C',
    CityName: '基隆市',
    CityCode: 'KEE',
    City: 'Keelung',
    CountyID: 'C',
    Version: '23.05.1'
  },
  {
    CityID: 'D',
    CityName: '臺南市',
    CityCode: 'TNN',
    City: 'Tainan',
    CountyID: 'D',
    Version: '23.05.1'
  },
  {
    CityID: 'E',
    CityName: '高雄市',
    CityCode: 'KHH',
    City: 'Kaohsiung',
    CountyID: 'E',
    Version: '23.05.1'
  },
  {
    CityID: 'F',
    CityName: '新北市',
    CityCode: 'NWT',
    City: 'NewTaipei',
    CountyID: 'F',
    Version: '23.05.1'
  },
  {
    CityID: 'G',
    CityName: '宜蘭縣',
    CityCode: 'ILA',
    City: 'YilanCounty',
    CountyID: 'G',
    Version: '23.05.1'
  },
  {
    CityID: 'H',
    CityName: '桃園市',
    CityCode: 'TAO',
    City: 'Taoyuan',
    CountyID: 'H',
    Version: '23.05.1'
  },
  {
    CityID: 'I',
    CityName: '嘉義市',
    CityCode: 'CYI',
    City: 'Chiayi',
    CountyID: 'I',
    Version: '23.05.1'
  },
  {
    CityID: 'J',
    CityName: '新竹縣',
    CityCode: 'HSQ',
    City: 'HsinchuCounty',
    CountyID: 'J',
    Version: '23.05.1'
  },
  {
    CityID: 'K',
    CityName: '苗栗縣',
    CityCode: 'MIA',
    City: 'MiaoliCounty',
    CountyID: 'K',
    Version: '23.05.1'
  },
  {
    CityID: 'M',
    CityName: '南投縣',
    CityCode: 'NAN',
    City: 'NantouCounty',
    CountyID: 'M',
    Version: '23.05.1'
  },
  {
    CityID: 'N',
    CityName: '彰化縣',
    CityCode: 'CHA',
    City: 'ChanghuaCounty',
    CountyID: 'N',
    Version: '23.05.1'
  },
  {
    CityID: 'O',
    CityName: '新竹市',
    CityCode: 'HSZ',
    City: 'Hsinchu',
    CountyID: 'O',
    Version: '23.05.1'
  },
  {
    CityID: 'P',
    CityName: '雲林縣',
    CityCode: 'YUN',
    City: 'YunlinCounty',
    CountyID: 'P',
    Version: '23.05.1'
  },
  {
    CityID: 'Q',
    CityName: '嘉義縣',
    CityCode: 'CYQ',
    City: 'ChiayiCounty',
    CountyID: 'Q',
    Version: '23.05.1'
  },
  {
    CityID: 'T',
    CityName: '屏東縣',
    CityCode: 'PIF',
    City: 'PingtungCounty',
    CountyID: 'T',
    Version: '23.05.1'
  },
  {
    CityID: 'U',
    CityName: '花蓮縣',
    CityCode: 'HUA',
    City: 'HualienCounty',
    CountyID: 'U',
    Version: '23.05.1'
  },
  {
    CityID: 'V',
    CityName: '臺東縣',
    CityCode: 'TTT',
    City: 'TaitungCounty',
    CountyID: 'V',
    Version: '23.05.1'
  },
  {
    CityID: 'W',
    CityName: '金門縣',
    CityCode: 'KIN',
    City: 'KinmenCounty',
    CountyID: 'W',
    Version: '23.05.1'
  },
  {
    CityID: 'X',
    CityName: '澎湖縣',
    CityCode: 'PEN',
    City: 'PenghuCounty',
    CountyID: 'X',
    Version: '23.05.1'
  },
  {
    CityID: 'Z',
    CityName: '連江縣',
    CityCode: 'LIE',
    City: 'LienchiangCounty',
    CountyID: 'Z',
    Version: '23.05.1'
  }
]
const city = ref(CityDetail)

</script>
