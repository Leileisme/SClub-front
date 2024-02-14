<template>
  <template v-if="isXs">
    <v-container >
      <v-row class="box" style="background-color: ;padding-top: 1rem;">
        <!-- 【左】大頭照 -->
        <v-col cols="4" style="border: 0px solid ;" >
          <v-row>
            <!-- <v-col cols="12" ></v-col> -->
            <v-col cols="12" class="d-flex justify-center">
            <v-avatar size="100%" style="margin-top: 0.8rem;" >
              <v-img  :src="user.IMAGE"></v-img>
            </v-avatar>
          </v-col>
          </v-row>
        </v-col>

        <!-- 【右】個人資料 -->
        <v-col cols="8">

          <v-row>

            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; " >
                <!-- 社團名稱/屆數/成員 -->
                <span class="me-3" >{{ user.NICK_NAME }}</span>
                <span class="me-3" style="font-size: 1.05rem;">第{{ user.CLUB_TH }}屆</span>
                <span>
                  <v-btn color="#FF9900" style="min-width: 0; width: 42px;color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">成員</v-btn>
                </span>
            </v-col>

            <v-col cols="12"  style=" font-size: 0.9rem; padding-top: 0.6rem;"  >
              <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ user.SCHOOL_NAME }}</span>
                <span>{{ user.SCHOOL_CITY }}</span>
              </span>
            </v-col>

            <!-- 描述 -->
            <v-col cols="12">{{user.DESCRIBE}}</v-col>

            <v-col cols="12" v-if="user.ROLE === UserRole.CLUB">
              <v-row>
                <v-col cols="4" style="background-color: ;"></v-col>

                  <!-- 活動 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">貼文</v-col>
                  </v-row>
                </v-col>

                <!-- 活動 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">活動</v-col>
                  </v-row>
                </v-col>

                <!-- 粉絲 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">粉絲</v-col>
                  </v-row>
                </v-col>

                <!-- 追蹤 -->
                <v-col cols="2" style="background-color:;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FOLLOW.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">追蹤</v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-col>

          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <v-col cols="12" >
          <v-row>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <!-- <v-btn color="#444" style="font-weight: 900; width: 100%;">編輯社團檔案</v-btn> -->
              <EditClub></EditClub>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn  color="#444" style="font-weight: 900; width: 100%;">分享社團檔案</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn color="#FF9900" style="color: #fff; font-weight: 900;width: 100%;">活躍狀態 {{user.SCORES}} 分</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <!-- 活動 -->
        <v-col cols="12" style="color: #25ECE0; padding-bottom: 5px;">活動</v-col>
        <v-col cols="12" style="padding-top: 0;">
              <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="margin-left: -3px;">mdi-plus</v-icon>新增活動</v-btn>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <!-- 新增限時動態 -->
        <v-col cols="12" style=";">

          <v-row >
            <!-- 每一個小圖 -->
            <v-col cols="3" style="background:" class="text-center">
              <v-btn icon  size="large" text  color="rgba(0,0,0,0)">
                <v-icon style="font-size: 3.8rem; border: 1px solid #ccc; border-radius: 50%;" color="#ccc ">mdi-plus</v-icon>
              </v-btn>
              <div class="mt-3" style="color:#ccc">新增</div>
            </v-col>
          </v-row>

        </v-col>

        <!-- 動態//活動 -->
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

      </v-row>

    </v-container>
  </template>

  <!-- 電腦版 -->
  <template v-else>

    <div style="height: auto; border: #1BBCA9 0px solid; padding: 3rem; " >
      <v-container style="max-width: 800px;">
      <v-row class="box" style="background-color: ">
        <!-- 【左】大頭照 -->
        <v-col cols="4" style="border: 0px solid ;" >
          <v-row>
            <v-col cols="12" class="d-flex justify-center">
            <v-avatar size="100%"  >
              <v-img  :src="user.IMAGE"></v-img>
            </v-avatar>
          </v-col>
          </v-row>
        </v-col>

        <!-- 【右】個人資料 -->
        <v-col cols="8">
          <v-row>

            <!-- 使用者名稱 -->
            <v-col cols="12" style="font-size: 1.6rem; padding-bottom: 0;color: #25ECE0;"> {{user.USER_NAME}}</v-col>
            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; padding-top: 0.5rem;" >
              <v-row>
                <v-col cols="8">
                  <!-- 社團名稱/屆數/成員 -->
                  <span class="me-3" >{{ user.NICK_NAME }}</span>
                  <span class="me-3" style="font-size: 1.05rem;">第{{ user.CLUB_TH }}屆</span>
                  <span>
                    <v-btn color="#FF9900" style="min-width: 0; width: 42px;color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">成員</v-btn>
                  </span>
                </v-col>

                <!-- 建立動態/設定 -->
                <v-col cols="4" class="d-flex justify-end" >
                  <v-icon class="me-3" style="cursor: pointer;" id="post">mdi-plus-box-outline</v-icon>
                  <v-menu activator="#post" width="150" style="text-align: center;">
                    <v-list>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">建立動態</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">建立限動</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                    </v-list>
                  </v-menu>

                  <v-icon class="me-3" style="cursor: pointer;" id="setting">mdi-menu</v-icon>
                  <v-menu activator="#setting" width="150" style="text-align: center;" >
                    <v-list>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">貼文收藏</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">喜歡的活動</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">限動典藏</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <template v-if="user.IS_ADMIN">
                        <v-list-item style="font-size: 1rem; cursor: pointer;" to="/admin">管理員後台</v-list-item>
                        <v-divider style="margin-top:   6px;margin-bottom: 6px;"></v-divider>
                      </template>
                      <v-list-item style="font-size: 1rem; cursor: pointer;" @click="logout">登出</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                    </v-list>
                  </v-menu>

                </v-col>
              </v-row>
            </v-col>

            <!-- 學校 -->
            <v-col cols="12"  style=" font-size: 0.9rem; padding-top: 0.6rem;"  >
              <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ user.SCHOOL_NAME }}</span>
                <span>{{ user.SCHOOL_CITY }}</span>
              </span>
            </v-col>

            <!-- 描述 -->
            <v-col cols="12">{{user.DESCRIBE}}</v-col>

            <v-col cols="12" v-if="user.ROLE === UserRole.CLUB">
              <v-row>
                <v-col cols="4" style="background-color: ;"></v-col>

                  <!-- 活動 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">貼文</v-col>
                  </v-row>
                </v-col>

                <!-- 活動 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">活動</v-col>
                  </v-row>
                </v-col>

                <!-- 粉絲 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">粉絲</v-col>
                  </v-row>
                </v-col>

                <!-- 追蹤 -->
                <v-col cols="2" style="background-color:;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FOLLOW.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">追蹤</v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-col>

          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <v-col cols="12" >
          <v-row>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;" >
              <!-- <v-btn color="#444" style="font-weight: 900; width: 100%;">編輯社團檔案</v-btn> -->
              <EditClub></EditClub>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn  color="#444" style="font-weight: 900; width: 100%;">分享社團檔案</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn color="#FF9900" style="color: #fff; font-weight: 900;width: 100%;">活躍狀態 {{user.SCORES}} 分</v-btn>
            </v-col>

          </v-row>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <!-- 活動 -->
        <v-col cols="12" style="color: #25ECE0; padding-bottom: 5px;">活動</v-col>
        <v-col cols="12" style="padding-top: 0;">
              <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="margin-left: -3px;">mdi-plus</v-icon>新增活動</v-btn>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <!-- 新增限時動態 -->
        <v-col cols="12" style=";">

          <v-row >
            <!-- 每一個小圖 -->
            <v-col :cols="cols" style="background: ;" class="text-center">
              <v-btn icon  size="large" text  color="rgba(0,0,0,0)">
                <v-icon style="font-size: 3.8rem; border: 1px solid #ccc; border-radius: 50%;" color="#ccc ">mdi-plus</v-icon>
              </v-btn>
              <div class="mt-3" style="color:#ccc;"  >新增</div>
            </v-col>
          </v-row>

        </v-col>

        <!-- 動態//活動 -->
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

      </v-row>

    </v-container>
    </div>

  </template>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import logout from '@/composables/logout'
import UserRole from '@/enums/UserRole'
import EditClub from '@/components/EditClub.vue'

const { api, apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()
const tab = ref('')

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)

const cols = computed(() => {
  if (isXs.value) {
    return 3
  } else {
    return 2
  }
})

// 分享網址，但是樣式不好看先留著沒用
const share = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Check out this website:',
      url: window.location.href
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
  } else {
    console.log('Web Share API is not supported in your browser.')
  }
}

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  // padding: 24px !important

</style>
