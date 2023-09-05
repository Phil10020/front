<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <v-breadcrumbs bg-color="transparant" :items="breadcrumbItems" class="text-black position">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
      </VCol>
      <VCol cols="12">
        <VTable>
          <thead>
            <tr>
              <th class="d-md-block d-none">ID</th>
              <th>日期</th>
              <th>活動紀錄</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td class="d-md-block d-none">{{ order._id }}</td>
              <td>{{ new Date(order.date).toLocaleString() }}</td>
              <!-- <td>{{ order.total }}</td> -->
              <td>
                <ul>
                  <li v-for="item in order.cart" :key="item._id">
                    {{ item.productName }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>
  </VContainer>
  <GMapMap :center="center"
      :options="options"
      :zoom="zoom" map-type-id="roadmap"  class="mapHeight">
      <div v-for="order in orders"  :key="order._id">
        <GMapMarker :icon="logoSVG" :key="m.productID"  v-for="(m) in order?.cart" :position="m.position" :clickable="true" :draggable="false">
        </GMapMarker>
      </div>
  </GMapMap>
</template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { mapActions } from 'pinia'
import { reactive, ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import logoSVG from '@/assets/images/logoSVG.svg'

const createSnackbar = useSnackbar()
const mapData = reactive([])
const orders = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/orders')
    orders.push(...data.result)
    orders.forEach(order => {
      order.cart.forEach(item => {
        const position = {
          lat: parseFloat(item.Position.PositionLat),
          lng: parseFloat(item.Position.PositionLon)
        }
        item.position = position // 添加 position 属性到每个 cart 对象
      })
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
})()

const breadcrumbItems = ref([
  {
    title: '首頁',
    disabled: false,
    to: '/'
  },
  {
    title: '我的行程',
    disabled: false,
    to: ''
  }
])

// map
const center = {
  lat: 24.15994867967149, lng: 120.6668839584927
}
const options = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: true,
  fullscreenControl: false,
  zoom: 8,
  clickableIcons: true,
  minZoom: 8,
  maxZoom: 20,
  styles: [
    {
      featureType: 'poi',
      stylers: [{
        visibility: 'off'
      }]
    }
  ]
}

// const clusterIcon = [
//   {
//     textColor: 'black',
//     url: logoSVG,
//     height: 50,
//     width: 50,
//     textSize: 20,
//     anchorText: [12, 0]
//   }
// ]

// const mapImg = {
//   icon1: logoSVG,
//   vector: logoSVG
// }
</script>
