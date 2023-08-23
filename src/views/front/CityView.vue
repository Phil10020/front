<style lang="scss" scoped>
  .v-sheet {
    background-color: transparent;
  }

</style>
<template>
  <section id="cityView">
    <v-sheet class="banner">
      <v-row class="justify-center search-bar" color="transparent">

        <v-col cols="5"  md="2" class="">
          <v-select
            chips
            label="城市"
            :items="cityNameData?.[0]"
            variant="solo"
            v-model="selectedCity"
            item-title="CityName"
            item-value="City"
          >
          </v-select>
        </v-col>
        <v-col cols="5" md="2" class="">
          <v-select
            chips
            label="特色"
            :items="cityCategory"
            variant="solo"
            v-model="selectedCategory"
            item-title="name"
            item-value="category"
            @update:modelValue="getData"
          >
          </v-select>
        </v-col>
        <v-col cols="10" md="5"  id="search-icon">
          <v-text-field
              append-icon="mdi-magnify"
              v-model="searchKeyword"
              label="關鍵字搜尋"
              @click:append="searchItem()"
              @keydown.enter="searchItem()"
              variant="solo-filled"
              class="position-relative"
          >
        </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>
  </section>
  <section class="city-contain mt-5">
    <v-breadcrumbs bg-color="transparant" :items="breadcrumbItems" class="text-black position">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
    <v-container>
      <div class="mb-5">
        <h3 >搜尋到<span class="text-success">{{ sport.length }}</span>筆資料</h3>
      </div>
      <v-row v-if="sport.length !== 0">
        <v-col cols="6"  md="3"  v-for="sportItem in displayedItems"
            :key="sportItem[selectedCategoryChange + 'ID']">
            <router-link v-if="sportItem[selectedCategoryChange + 'Name'] !== undefined" :to="{ name: 'CityDetail', query: { id: sportItem[selectedCategory + 'ID'], category: `${selectedCategory}`, city: `${selectedCity}` }}">
              <v-lazy
              :min-height="200"
              :options="{'threshold':0.5}"
              transition="fade-transition"
              >
                <v-card
                  class="mx-auto"
                  max-width="400"
                >
                  <v-img
                    class="align-end text-secondary"
                    height="200"
                    :src="sportItem?.Picture.PictureUrl1"
                    cover
                  >
                    <v-card-title style="background-color: rgba(91, 112, 31,0.8);color:white">{{ sportItem[selectedCategoryChange + 'Name'] }}</v-card-title>
                  </v-img>

                </v-card>
              </v-lazy>
            </router-link>
        </v-col>
        <v-col cols="10" >
          <v-pagination
            v-model="page"
            :length="totalPages"
            :total-visible="totalVisible"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-sheet v-else height="50vh">
        <v-sheet class="data-not-found d-flex align-center justify-center">
          <v-sheet class="d-flex text-secondary">
            <h1>沒有相關資料，</h1>
            <h1 class="">請重新查詢。</h1>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-container>
  </section>
</template>
<script setup>
import { cityApi, activityApi, foodApi, hotelApi, sportApi, tdxApi } from '@/plugins/axios'
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 設定Query參數
const city = computed(() => {
  return route.query.city
})
const cityName = computed(() => {
  return route.query.cityName
})

const cityNameData = reactive([])
const breadcrumbItems = ref([
  {
    title: '首頁',
    disabled: false,
    to: ''
  },
  {
    title: '城市探索',
    disabled: false,
    to: 'city'
  },
  {
    title: '',
    disabled: true,
    to: ''
  }
]);

(async () => {
  try {
    // breadcrumbItems.value[1].title = cityName
    const sportRes = await cityApi.get()
    console.log(sportRes.data)
    await cityNameData.push(sportRes.data)
  } catch (error) {
    // if (error.name === 'ValidationError') {
    //   // router.go(-1)
    // }
  }
})()

// 設定select選單旅遊類型
const cityCategory = [
  {
    name: '景點',
    category: 'ScenicSpot'
  },
  {
    name: '美食',
    category: 'Restaurant'
  },
  {
    name: '旅宿',
    category: 'Hotel'
  },
  {
    name: '活動',
    category: 'Activity'
  }
]

// 設定麵包穴初始值
const selectedCity = ref(route.query.city)
const selectedCategory = ref(cityCategory[0].category)
const selectedCityChange = ref(route.query.city)
const selectedCategoryChange = ref(selectedCategory.value)

// axios資料
const sport = reactive([])
// const foodCity = 'Keelung'
const searchItemUrl = computed(() => {
  return `${selectedCategoryChange.value}/${selectedCityChange.value}?%24top=1000&%24format=JSON`
})

// 搜尋功能
const searchKeyword = ref('')
const searchKeywordChange = ref('')
const searchItem = async () => {
  try {
    selectedCategoryChange.value = selectedCategory.value
    selectedCityChange.value = selectedCity.value
    searchKeywordChange.value = searchKeyword.value
    const res = await tdxApi.get(searchItemUrl.value)
    const filteredData = res.data.filter(item => {
      const hasValidPicture = item.Picture &&
    item.Picture.PictureUrl1 &&
    item.Picture.PictureUrl1.includes('https')

      const matchesSearchKeyword = item[selectedCategoryChange.value + 'Name'].includes(searchKeyword.value)

      return hasValidPicture && matchesSearchKeyword
    })

    sport.splice(0, sport.length)
    sport.push(...filteredData)
    breadcrumbItems.value[2].title = selectedCityChange.value || ''
    page.value = 1
    router.replace({
      query: {
        ...route.query,
        city: selectedCityChange.value,
        category: selectedCategoryChange.value,
        keyword: searchKeywordChange.value
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// 資料頁數設定
const page = ref(1)// 初始頁數
const itemsPerPage = ref(12)// 每頁數量
const getScreenWidth = () => {
  return window.innerWidth
}

const totalVisible = ref(7)
// Update itemsPerPage based on screen width
watch(() => {
  if (getScreenWidth() < 768) {
    itemsPerPage.value = 6
    totalVisible.value = 4
  } else {
    itemsPerPage.value = 12
    totalVisible.value = 7
  }
})
const totalPages = computed(() => {
  return Math.ceil(sport.length / itemsPerPage.value)
})

// 當前頁面顯示資料
const displayedItems = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return sport.slice(startIndex, endIndex)
})

selectedCategoryChange.value = route.query.category || 'ScenicSpot'
selectedCategory.value = route.query.category || 'ScenicSpot'
selectedCityChange.value = route.query.city || 'Taipei'
selectedCity.value = route.query.city || 'Taipei'
searchKeyword.value = route.query.keyword || ''
searchKeywordChange.value = route.query.keyword || ''
searchItem()
</script>
