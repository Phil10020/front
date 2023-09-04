<template>
  <section class="position-relative">
    <swiper
    :spaceBetween="30"
    :effect="'fade'"
    :navigation="false"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <template v-for="i in 3" :key="i">
      <swiper-slide v-if="data[0]?.Picture['PictureUrl' + i]"
        >
        <div class="slide-background" :style="{ backgroundImage: `url(${data[0]?.Picture['PictureUrl' + i]})`}">
          <!-- <h1 v-if="data[0]?.Picture['PictureDescription' + i]">{{ data[0]?.Picture['PictureDescription' + i] }}</h1> -->
        </div>
      </swiper-slide
      >
    </template>
    </swiper>
    <div class="position-absolute cityDetail-swiper-text text-white"><h1>{{  data[0]?.[`${category}Name`]}}</h1></div>
    <v-breadcrumbs bg-color="transparant" :items="breadcrumbItems" class="text-black position">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
  </section>
  <section>
    <v-container>
      <v-sheet color="transparent" class=" py-5 cityDetail-sheet">
        <h2>{{ data[0]?.DescriptionDetail || data[0]?.Description}}</h2>
      </v-sheet>
      <v-sheet color="transparent py-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-btn v-if="data[0]?.WebsiteUrl" :href="data[0]?.WebsiteUrl" target="_blank">官方網站</v-btn>
            <h3 v-if="data[0]?.Address" class="my-5">地址:&nbsp;{{ data[0]?.Address }}</h3>
            <h3 class="my-5">連絡電話:&nbsp;{{ data[0]?.Phone }}</h3>
            <h3 v-if="data[0]?.OpenTime" class="my-5">營業時間:&nbsp;{{ data[0]?.OpenTime }}</h3>
            <h3 class="my-5">更新日期:&nbsp;{{ formattedUpdateTime }}</h3>
            <v-chip-group class="text-secondary mb-10">
              <v-chip v-if="data[0]?.Class1">{{ data[0]?.Class1 }}</v-chip>
              <v-chip v-if="data[0]?.Class2">{{ data[0]?.Class2 }}</v-chip>
              <v-chip v-if="data[0]?.Class3">{{ data[0]?.Class3 }}</v-chip>
            </v-chip-group>
            <v-sheet color="transparent" class="d-flex justify-center">
              <v-btn size="x-large" color="primary" class="" @click="addCart"><h3 class="text-secondary">點我加入行程</h3></v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <GMapMap
              :center="{lat: data[0]?.Position.PositionLat, lng: data[0]?.Position.PositionLon}"
              :zoom="19"
              map-type-id="terrain"
              style="width: auto; height: 50vh"
              >
              <GMapMarker  :icon="mapIcon.icon1" :position="{lat: data[0]?.Position.PositionLat, lng: data[0]?.Position.PositionLon}">
              </GMapMarker>
            </GMapMap>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>

  </section>
  <!-- <section>
    <div>
    <h1>City Detail</h1>
    <p>City ID: {{ id }}</p>
    <p>Category: {{ category }}</p>
    <p>City: {{ city }}</p>
    <pre>{{ data[0] }}</pre>
  </div>
  </section> -->
</template>

<script setup>
import { tdxApi, apiAuth } from '@/plugins/axios'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import { useUserStore } from '@/store/user'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// googleMapIcon
import icon1 from '@/assets/images/logoSVG.svg'

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules'

const modules = [EffectFade, Navigation, Pagination, Autoplay]
const user = useUserStore()

const createSnackbar = useSnackbar()

const route = useRoute()
const router = useRouter()
const id = route.query.id
const city = route.query.city
const category = route.query.category
const data = reactive([])
const url = `${category}/${city}?$filter=${category}ID%20eq%20%27${id}%27&$format=JSON`

const breadcrumbItems = ref([
  {
    title: '城市探索',
    disabled: false,
    to: {
      name: 'City',
      query: {
        city
      }
    }
  },
  {
    title: '',
    disabled: false,
    to: ''
  },
  {
    title: '',
    disabled: true
  }
])
const schema = yup.object({
  id: yup.string().required(),
  city: yup.string().required(),
  category: yup.string().required()
})

onMounted(async () => {
  try {
    await schema.validate(route.query)
    const res = await tdxApi.get(url)
    await data.push(res.data[0])
    breadcrumbItems.value[1].title = data[0]?.City || ''
    breadcrumbItems.value[2].title = data[0]?.[`${category}Name`] || ''
    console.log(data[0])
  } catch (error) {
    if (error.name === 'ValidationError') {
      // router.go(-1)
    }
  }
})()

// 時間更新-------------
const formattedUpdateTime = computed(() => {
  if (data[0]?.UpdateTime) {
    const dateTime = new Date(data[0].UpdateTime)
    const dateString = dateTime.toISOString().split('T')[0]
    return dateString
  }
  return ''
})

// GoogleMap

const mapIcon = {
  icon1
}

// 加入行程

const addCart = async () => {
  console.log('test')
  try {
    if (!user.isLogin) {
      router.push('/login')
      return
    }
    const { data: res } = await apiAuth.post('/users/cart', {
      ...data[0],
      productName: data[0][category + 'Name'],
      productID: data[0][category + 'ID'],
      productCategory: category,
      productCity: city,
      action: 'add'
    })
    user.cart = res.result
    console.log('test2')
  } catch (error) {
    console.log(error)
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

// https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$filter=ScenicSpotID%20eq%20%27C1_379000000A_000001%27&$format=JSON
</script>
