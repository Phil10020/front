<style>
</style>
<template>
  <!-- <v-sheet v-show="showToTop" class="toTopBtn position-sticky" @click="scrollToTop">
    <v-img src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png" height="88" cover></v-img>
  </v-sheet> -->
  <v-sheet
    v-show="showToTop" class="toTopBtn position-sticky" @click="scrollToTop"
    max-width="100" max-height="100"
    color="transparent"
  >
    <v-img src="../../assets/images/logoSVG.svg" height="100" cover></v-img>
  </v-sheet>
  <section class="section01 d-flex justify-center align-end" id="section01">
    <!-- <div class="background" />
     -->
     <video src="../../assets/images/bg.mp4" autoplay loop muted></video>
    <v-row class="section01-mask d-flex align-center">
      <v-col cols="12">
        <div class="mask-filter relative top-0 d-flex flex-column align-center  justify-center">
          <p class="mb-3"  data-aos="fade-right" data-aos-delay="600" data-aos-duration="600">人的一生至少要有兩次衝動</p>
          <p class="mb-3"  data-aos="fade-left"  data-aos-duration="600">一次是奮不顧身地的愛情</p>
          <p  data-aos="fade-right" data-aos-duration="600">一次是說走就走的旅行</p>
        </div>
      </v-col>
      <!-- <v-col cols="3" class="d-flex justify-end">
        <div class="me-5">
          <v-img width="100"
        :aspect-ratio="1" src="../../assets/images/taiwan.svg"></v-img>
        <br>
        <h1>台灣</h1>
        </div>
      </v-col> -->
    </v-row>
    <div class="section01-btn">
      <v-btn icon color="transparent" borderless elevation="0" class="relative" @click="scrollToNextSection">
        <v-icon size="60" color="white">mdi-chevron-double-down</v-icon>
      </v-btn>
    </div>
  </section>
  <section class="section02 py-5" id="section02">
    <v-container color="secondary">
      <div class="category-border-l"><v-icon color="secondary">mdi-image-filter-hdr</v-icon>景點</div>
    </v-container>
    <!-- 景點卡片區塊----------------- -->
    <v-container>
      <v-row >
        <v-col cols="12" md="4">
          <router-link v-if="sport[test1]?.ScenicSpotID !== undefined" :to="{ name: 'CityDetail', query: { id: sport[test1]?.ScenicSpotID, category: 'ScenicSpot', city: 'Taipei' }}">
            <v-card
        max-width="400"
        class="mx-auto mb-5"
        :style="isSmallScreen ? '' :`transform: rotate(${pic1}deg)`"
        >
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-img class="d-flex align-end" :src="sport[test1]?.Picture.PictureUrl1" aspect-ratio="1.5" cover><h1 class="text-center section02-card-text">{{ sport[test1]?.ScenicSpotName }}</h1></v-img>
            </v-col>
          </v-row>
        </v-container>
            </v-card>
          </router-link>
          <router-link v-if="sport[test2]?.ScenicSpotID !== undefined" :to="{ name: 'CityDetail', query: { id: sport[test2]?.ScenicSpotID, category: 'ScenicSpot', city: 'Taipei' }}">
            <v-card
            max-width="400"
            class="mx-auto"
            :style="isSmallScreen ? '' :`transform: rotate(${pic2}deg)`"
            >
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-img class="d-flex align-end" :src="sport[test2]?.Picture.PictureUrl1" aspect-ratio="1.5" cover><h1 class="text-center section02-card-text">{{ sport[test2]?.ScenicSpotName }}</h1></v-img>
                </v-col>
              </v-row>
            </v-container>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="12"  md="4" class="d-md-block d-none">
          <router-link v-if="sport[test3]?.ScenicSpotID !== undefined" :to="{ name: 'CityDetail', query: { id: sport[test3]?.ScenicSpotID, category: 'ScenicSpot', city: 'Taipei' }}">
            <v-card
        max-width="400"
        class="mx-auto mb-5"
        aspect-ratio="1.5" cover
        :style="isSmallScreen ? '' :`transform: rotate(${pic4}deg)`"
        >
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-img class="d-flex align-end" :src="sport[test3]?.Picture.PictureUrl1" aspect-ratio="1.5" cover><h1 class="text-center section02-card-text">{{ sport[test3]?.ScenicSpotName }}</h1></v-img>
            </v-col>
          </v-row>
        </v-container>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="12" md="4">
          <router-link v-if="sport[test4]?.ScenicSpotID !== undefined" :to="{ name: 'CityDetail', query: { id: sport[test4]?.ScenicSpotID, category: 'ScenicSpot', city: 'Taipei' }}">
            <v-card
        max-width="400"
        class="mx-auto mb-5"
        aspect-ratio="1.5" cover
        :style="isSmallScreen ? '' :`transform: rotate(${pic4}deg)`"
        >
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-img class="d-flex align-end" :src="sport[test4]?.Picture.PictureUrl1" aspect-ratio="1.5" cover><h1 class="text-center section02-card-text">{{ sport[test4]?.ScenicSpotName }}</h1></v-img>
            </v-col>
          </v-row>
        </v-container>
            </v-card>
          </router-link>
          <router-link v-if="sport[test5]?.ScenicSpotID !== undefined" :to="{ name: 'CityDetail', query: { id: sport[test5]?.ScenicSpotID, category: 'ScenicSpot', city: 'Taipei' }}">
            <v-card
            max-width="400"
            class="mx-auto"
            :style="isSmallScreen ? '' :`transform: rotate(${pic5}deg)`"
            >
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-img  class="d-flex align-end" :src="sport[test5]?.Picture.PictureUrl1" aspect-ratio="1.5"
  cover><h1 class="text-center section02-card-text">{{ sport[test5]?.ScenicSpotName }}</h1></v-img>
                </v-col>
              </v-row>
            </v-container>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- 美食區塊-------------------- -->
  <section class="section03 py-10">
    <div class="section03-bg"></div>
    <v-container color="secondary" class="py-5">
      <div class="d-flex justify-end">
        <div class="category-border-r"><v-icon color="secondary" size="32">mdi-food</v-icon>美食</div>
      </div>
      <v-row>
        <v-col cols="12" md="3">
          <router-link v-if="food[test1]?.RestaurantID !== undefined" :to="{ name: 'CityDetail', query: { id: food[test1]?.RestaurantID, category: 'Restaurant', city: 'Tainan' }}">
            <v-card
      :loading="loading"
      class="mx-auto rounded-xl"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        cover
        height="250"
        :src="food[test1]?.Picture.PictureUrl1"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ food[test1]?.RestaurantName }}</v-card-title>
        <v-card-subtitle>
          <span class="me-1">{{ food[test1]?.OpenTime }}</span>

          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>

        <div class="my-4 text-subtitle-1">
          {{food[test1]?.Address}}
        </div>

        <div class="food-description">{{ food[test1]?.Description }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

            </v-card>
          </router-link>
        </v-col>
        <v-col cols="12" md="3">
          <router-link v-if="food[test2]?.RestaurantID !== undefined" :to="{ name: 'CityDetail', query: { id: food[test2]?.RestaurantID, category: 'Restaurant', city: 'Tainan' }}">
            <v-card
      :loading="loading"
      class="mx-auto rounded-xl "
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        cover
        height="250"
        :src="food[test2]?.Picture.PictureUrl1"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ food[test2]?.RestaurantName }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ food[test2]?.OpenTime }}</span>

          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>

        <div class="my-4 text-subtitle-1">
          {{food[test2]?.Address}}
        </div>

        <div class="food-description">{{ food[test2]?.Description }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

            </v-card>
          </router-link>
        </v-col>
        <v-col cols="12" md="3" class="d-none d-md-block">
          <router-link v-if="food[test3]?.RestaurantID !== undefined" :to="{ name: 'CityDetail', query: { id: food[test3]?.RestaurantID, category: 'Restaurant', city: 'Tainan' }}">
            <v-card
      :loading="loading"
      class="mx-auto rounded-xl"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        cover
        height="250"
        :src="food[test3]?.Picture.PictureUrl1"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ food[test3]?.RestaurantName }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ food[test3]?.OpenTime }}</span>

          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>

        <div class="my-4 text-subtitle-1">
          {{food[test3]?.Address}}
        </div>

        <div class="food-description">{{ food[test3]?.Description }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

            </v-card>
          </router-link>
        </v-col>
        <v-col cols="12" md="3" class="d-none d-md-block">
          <router-link v-if="food[test4]?.RestaurantID !== undefined" :to="{ name: 'CityDetail', query: { id: food[test4]?.RestaurantID, category: 'Restaurant', city: 'Tainan' }}">
            <v-card
      :loading="loading"
      class="mx-auto rounded-xl "
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        cover
        height="250"
        :src="food[test4]?.Picture.PictureUrl1"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ food[test4]?.RestaurantName }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ food[test4]?.OpenTime }}</span>

          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>

        <div class="my-4 text-subtitle-1">
          {{food[test4]?.Address}}
        </div>

        <div class="food-description">{{ food[test4]?.Description }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- 旅宿區塊--------------- -->
  <section class="section04 py-10">
    <v-container color="secondary">
      <div class="category-border-l"><v-icon color="secondary">mdi-home-city</v-icon>旅宿</div>
    </v-container>
    <div class="d-flex justify-center  mb-15">
      <router-link v-if="hotel[test1]?.HotelID !== undefined" :to="{ name: 'CityDetail', query: { id: hotel[test1]?.HotelID, category: 'Hotel', city: 'Kaohsiung' }}">
        <v-sheet
        class=" section04-card "
        max-width="60vw"
      >
      <v-row>
        <v-col cols="12" md="4" class="section04-card-head ">
          <h1 class="d-md-none text-center pt-3">
              {{ hotel[test1]?.HotelName }}
          </h1>
          <v-img
            class="align-end text-white "
            height="250"
            width="100vw"
            :src="hotel[test1]?.Picture.PictureUrl1"
            cover
            style="top: 40px;left: -40px;"
          >
            <!-- <v-card-title v-if="hotel[test4]?.Spec" class="section04-card-title">{{ hotel[test4]?.Spec }}</v-card-title> -->
          </v-img>
        </v-col>
        <v-col cols="8" class="section04-card-body pe-5 d-md-block d-none">
          <v-card-title class="py-4">
            <h1>
              {{ hotel[test1]?.HotelName }}
            </h1>
          </v-card-title>
          <v-row class="d-flex">
            <v-col cols="2">地址:&nbsp;</v-col>
            <v-col cols="10">{{ hotel[test1]?.Address }}</v-col>
          </v-row>
          <v-row class="d-flex">
            <v-col cols="2">連絡電話:&nbsp;</v-col>
            <v-col cols="10">{{ hotel[test1]?.Phone }}</v-col>
          </v-row>
          <v-row class="d-flex">
            <v-col cols="2">特色:&nbsp;</v-col>
            <v-col cols="10" class="hotel-description">{{ hotel[test1]?.Description }}</v-col>
          </v-row>
        </v-col>
      </v-row>
        </v-sheet>
      </router-link>
    </div>
    <div class="d-flex   justify-center">
      <router-link v-if="hotel[test2]?.HotelID !== undefined" :to="{ name: 'CityDetail', query: { id: hotel[test2]?.HotelID, category: 'Hotel', city: 'Kaohsiung' }}">
        <v-sheet
        class=" section04-card "
        max-width="60vw"
      >
      <v-row class="d-flex flex-md-row-reverse">
        <v-col cols="12" md="4" class="section04-card-head  ">
          <h1 class="d-md-none text-center pt-3">
              {{ hotel[test2]?.HotelName }}
          </h1>
          <v-img
            class="align-end text-white "
            height="250"
            width="100vw"
            :src="hotel[test2]?.Picture.PictureUrl1"
            cover
            style="top: 40px;right: -40px;"
          >
            <!-- <v-card-title v-if="hotel[test4]?.Spec" class="section04-card-title">{{ hotel[test4]?.Spec }}</v-card-title> -->
          </v-img>
        </v-col>
        <v-col cols="8" class="section04-card-body pe-5 d-md-block d-none">
          <v-card-title class="py-4">
            <h1>
              {{ hotel[test2]?.HotelName }}
            </h1>
          </v-card-title>
          <v-row class="d-flex">
            <v-col cols="2">地址:&nbsp;</v-col>
            <v-col cols="10">{{ hotel[test2]?.Address }}</v-col>
          </v-row>
          <v-row class="d-flex">
            <v-col cols="2">連絡電話:&nbsp;</v-col>
            <v-col cols="10">{{ hotel[test2]?.Phone }}</v-col>
          </v-row>
          <v-row class="d-flex">
            <v-col cols="2">特色:&nbsp;</v-col>
            <v-col cols="10" class="hotel-description">{{ hotel[test2]?.Description }}</v-col>
          </v-row>
        </v-col>
      </v-row>
        </v-sheet>
      </router-link>
    </div>
  </section>

  <!-- 活動區塊---------------- -->
  <section class="section05 py-10">
    <v-container color="secondary ">
      <div class="d-flex justify-end">
        <div class="category-border-r"><v-icon color="secondary">mdi-ticket</v-icon>活動</div>
      </div>
    </v-container>
    <v-container class="d-flex justify-center section05-swiper">
      <swiper
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      :width="800"
      :height="500"
      class="mySwiper"
    >
      <swiper-slide class="section05-card d-flex" v-for="activities in activity" :key="activities.ActivityID">
        <v-sheet class="section05-card d-flex align-center">
          <div class="section05-card-bg" :style="{ 'background-image': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${activities?.Picture.PictureUrl1})` }"></div>
          <div class="section05-card-text">
            <div class="d-flex align-center justify-center section05-card-title">
              <h1 style="writing-mode:vertical-lr;" class="py-3">{{ activities?.ActivityName }}</h1>
            </div>
            <div class="d-flex flex-column justify-center">
              <div>
                <h3>時間:</h3>
                <h3>{{ activities?.StartTime }}</h3>
              </div>
              <div>
                <h3>地址:</h3>
                <h3>{{ activities?.Address }}</h3>
              </div>
              <div>
                <h3>敘述:</h3>
                <h3 class="food-description">{{ activities?.Description }}</h3>
              </div>
              <div class="d-flex justify-center mt-5">
                <router-link v-if="activities?.ActivityID !== undefined" :to="{ name: 'CityDetail', query: { id: activities?.ActivityID, category: 'Activity', city: 'Taipei' }}">
                  <v-btn class="" size="x-large" color="primary">詳細資訊</v-btn>
                </router-link>
              </div>
            </div>
          </div>
        </v-sheet>
      </swiper-slide>
      </swiper>
    </v-container>
  </section>
</template>

<script setup>
import { api, sportApi, foodApi, hotelApi, activityApi } from '@/plugins/axios'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'

// swiper
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-cards'

import 'swiper/css/effect-fade'

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules'

const createSnackbar = useSnackbar()
const sport = reactive([])
const food = reactive([])
const hotel = reactive([])
const activity = reactive([])
const all = 'Tainan'
const city = 'Taipei'
const hotelCity = 'Kaohsiung'
// const foodCity = 'Keelung'
const sportUrl = `${city}?%24top=30&%24format=JSON`
const foodUrl = `${all}?%24top=100&%24format=JSON`
const hotelUrl = `${hotelCity}?%24top=100&%24format=JSON`
const activityUrl = `${city}?%24top=100&%24format=JSON`

const isSmallScreen = ref(window.innerWidth <= 768)
const showName = ref(false)
const products = ref([]);

// 加入隨機值

(async () => {
  try {
    const { data } = await api.get('/products')
    products.value.push(...data.result)
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
})()

const fetchData = async (api, url, dataArr) => {
  try {
    const response = await api.get(url)
    const filteredData = response.data.filter(item => Object.keys(item.Picture).length !== 0)
    dataArr.push(...filteredData.slice(0, 30))
  } catch (error) {
    console.log(error)
  }
}

(async () => {
  await fetchData(sportApi, sportUrl, sport)
  await fetchData(foodApi, foodUrl, food)
  await fetchData(hotelApi, hotelUrl, hotel)
  await fetchData(activityApi, activityUrl, activity)

  console.log('sport', sport)
  console.log('hotel', hotel)
})()

// 產生隨機值
const usedIndexes = []
const randomIndex = () => {
  let index
  do {
    index = Math.floor(Math.random() * 30)
  } while (usedIndexes.includes(index)) // 检查是否已存在于数组中

  usedIndexes.push(index) // 将索引添加到已使用数组中
  return index
}

const test1 = randomIndex()
const test2 = randomIndex()
const test3 = randomIndex()
const test4 = randomIndex()
const test5 = randomIndex()

// 隨機數值-45~45
const randomValue = () => {
  const randomFloat = Math.random()
  const randomNumber = (randomFloat * 60) - 30
  return randomNumber
}

const pic1 = randomValue()
const pic2 = randomValue()
const pic3 = randomValue()
const pic4 = randomValue()
const pic5 = randomValue()

console.log('hotel', hotel)
const scrollToNextSection = () => {
  const nextSection = document.getElementById('section02')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 回到頂部
const showToTop = ref(false)
const handleScroll = () => {
  showToTop.value = window.scrollY > 65
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// swiper參數----------------

const modules = [EffectCards, Autoplay]

</script>
