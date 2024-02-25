<template>
  <!-- 頂部導覽列 -->
  <TicketAppBar></TicketAppBar>
  使用票券
  <v-container style="margin-top: 1rem;">
    <v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import TicketAppBar from '@/components/TicketView/TicketAppBar.vue'

const router = useRouter()
const route = useRoute()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

</script>
