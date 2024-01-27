<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
        location="left"
      >

      logoHere
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" title="首頁" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-calendar-check" title="活動" value="home"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-home" title="論壇" value="home"></v-list-item> -->
          <!-- <v-list-item prepend-icon="mdi-home" title="動態" value="home"></v-list-item> -->
          <v-list-item prepend-icon="mdi-home" title="個人檔案" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-home" title="票券" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-home" title="通知" value="home"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-home" title="訊息" value="home"></v-list-item> -->
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh; background-color:rgb(40, 88, 88);"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
</script>
