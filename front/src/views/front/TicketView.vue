<template>
  票券
<v-col cols="12" >
          <v-tabs
            v-model="tab"
            align-tabs="start"
          >
            <v-tab value="one" class="rounded-ts-xl me-2" style="border:  1.8px rgba(204,204,204,0.5) solid; min-width: 80px;">動態</v-tab>
            <v-tab value="two" class="rounded-ts-xl" style="border:  1.8px rgba(204,204,204,0.5) solid;min-width: 80px;">活動</v-tab>
          </v-tabs>
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <!-- 動態貼文 -->
        <v-window v-model="tab" style="width: 100%; " >
          <v-window-item value="one">
          <v-col cols="12" >
          <v-row >
            <v-col
              v-for="n in 9"
              :key="n"
              class="d-flex child-flex"
              cols="4"
              style="padding: 2px;"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                cover
                class="bg-grey-lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>

        </v-col>
        </v-window-item>

        <!-- 活動 -->
        <v-window-item value="two">
          <v-col cols="12" style="background: ;">
            <v-row>
              <!-- 主辦活動 -->
              <v-col cols="12" style="color: #25ECE0; padding-bottom: 5px;">主辦活動</v-col>
              <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>

              <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0; ">
              <span>{{ new Date().getMonth() }}</span>
              <span  style="font-size: 0.7rem; ">月</span>
              <span>{{  new Date().getDate()  }}</span>
              <span style="font-size: 0.7rem; ">日</span>

              </v-col>
              <v-col cols="7" style="background: teal;"></v-col>

              <v-col cols="1" style="background-color: ;" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-camera</v-icon>
              </v-col>
              <v-col cols="1" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-dots-vertical</v-icon>
              </v-col>

              <!-- 分隔線 -->
              <v-col cols="12">
                <v-divider color="#fff" class="border-opacity-50"></v-divider>
              </v-col>

              <!-- 活動紀錄 -->
              <v-col cols="12" style="color: #25ECE0; padding-bottom: 5px;">活動紀錄</v-col>
              <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px;padding-bottom: 0;">{{ new Date().getFullYear() }}</v-col>

              <v-col cols="2" style="background: rgba(6, 50, 107,0);padding-right: 0;">
              <span>{{ new Date().getMonth() }}</span>
              <span  style="font-size: 0.7rem; ">月</span>
              <span>{{  new Date().getDate()  }}</span>
              <span style="font-size: 0.7rem; ">日</span>

              </v-col>
              <v-col cols="8" style="background: ;"></v-col>

              <v-col cols="1" style="background-color: ;" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-camera</v-icon>
              </v-col>
              <v-col cols="1" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-dots-vertical</v-icon>
              </v-col>

            </v-row>
          </v-col>
        </v-window-item>
      </v-window>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const tab = ref('')
</script>
