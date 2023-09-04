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
              <th>圖片</th>
              <th>名稱</th>
              <th>詳情</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item._id">
              <router-link :to="{ name: 'CityDetail', query: { id: item.productID, category: item.productCategory, city: item.productCity }}">
                <td class="d-flex align-center justify-center">
                  <div>
                    <v-img :src="item.Picture.PictureUrl1" cover width="200" aspect-ratio="1"></v-img>
                  </div>
                </td>
              </router-link>
              <td width="15%">{{ item.productName }}</td>
              <td>
                <p class="cart-view-description">
                  {{ item.Description || item.DescriptionDetail }}
                </p>
              </td>
              <td>
                <VBtn color="red" variant="text" icon="mdi-delete" @click="updateCart(item.productID)"></VBtn>
              </td>
            </tr>
            <tr v-if="cart.length === 0">
              <td colspan="6" class="text-center">沒有行程</td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
      <VCol cols="12" class="text-center">
        <VBtn color="secondary" @click="submit" :disabled="!canCheckout">儲存行程</VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

const cart = ref([])
const breadcrumbItems = ref([
  {
    title: '首頁',
    disabled: false,
    to: '/'
  },
  {
    title: '行程管理',
    disabled: false,
    to: ''
  }
])

const updateCart = async (productID) => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      productID,
      action: 'delete'
    })
    const index = cart.value.findIndex(item => item.productID === productID)
    if (index !== -1) {
      // Remove the item from the cart array
      cart.value.splice(index, 1)
    }
    user.cart = data.result
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
const canCheckout = computed(() => {
  return cart.value.length > 0
})

const submit = async (req, res) => {
  try {
    await apiAuth.post('/orders')
    user.cart = 0
    router.push('/orders')
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
//
(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
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
</script>
