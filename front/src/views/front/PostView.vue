<template>

  <!-- 搜尋列 -->
  <v-text-field
    v-model="search"
    label="搜尋"
    prepend-inner-icon="mdi-magnify"
    single-line
    variant="outlined"
    hide-details
    @input="searchData"
    id="searchBtn"
    style="position: relative;padding: 1rem;max-width: 800px;"
  >
    <v-list-item icon @click="clearSearch" v-if="search !== ''" style="position: absolute; right: 1rem;padding: 0; cursor: pointer;">
      <v-icon>mdi-close</v-icon>
    </v-list-item>
  </v-text-field>

  <!-- 搜尋結果列 -->
  <v-menu activator="#searchBtn" >
    <v-list>
      <!-- 搜尋有符合 -->
      <template v-if="searchResults.length > 0">
        <v-list-item
        v-for="(item) in searchResults"
        :key="item.id"
        :value="item.USER_NAME"
        :to="'/'+item.USER_NAME"
        >

        <!-- xs 手機版 搜尋清單 -->
        <template v-if="isXs">
          <v-row  style="margin: 5px; ">
            <v-col cols="3" class="d-flex justify-center align-center">
              <v-avatar size="100%"  >
              <v-img  :src="item.IMAGE"></v-img>
            </v-avatar>
            </v-col>
            <v-col cols="9"  class="d-flex justify-center align-center">
              <v-row >
                <v-col cols="12" style="padding: 0; margin: 0;font-size: 1.1rem;color: #25ECE0;"  >{{ item.USER_NAME }}</v-col>
                <v-col cols="12" style="padding: 0;margin: 0; font-size: 0.8rem;color: #cccccc;">{{ item.NICK_NAME }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <v-row  style="margin: 5px; ">
            <v-col cols="1" class="d-flex justify-center align-center me-3"  style="height: 45px;">
              <v-avatar size="220%"  >
              <v-img  :src="item.IMAGE"></v-img>
            </v-avatar>
            </v-col>
            <v-col cols="9"  class="d-flex justify-center align-center">
              <v-row >
                <v-col cols="12" style="padding: 0; margin: 0;font-size: 1.1rem;color: #25ECE0;"  >{{ item.USER_NAME }}</v-col>
                <v-col cols="12" style="padding: 0;margin: 0; font-size: 0.8rem;color: #cccccc;">{{ item.NICK_NAME }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>

        <v-divider></v-divider>
      </v-list-item>
    </template>

    <!-- 無搜尋符合 -->
    <template v-else>
      <v-list-item>
        <v-list-item-title>無搜尋結果</v-list-item-title>
      </v-list-item>
    </template>
    </v-list>
  </v-menu>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const search = ref('')
const searchResults = ref([])

const searchData = async () => {
  try {
    const { data } = await apiAuth.get('/users/getUser', {
      params: {
        search: search.value
      }
    })
    searchResults.value = data.result.data
    console.log(data, 'data')
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}

const clearSearch = () => {
  search.value = ''
}

</script>
