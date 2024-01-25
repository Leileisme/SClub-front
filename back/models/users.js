import { Schema,model,ObjectId,Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole.js'
import NotifyType from '../enums/NotifyType.js'

// 幹部
const memberSchema = new Schema({
  // 1.使用者id
  USER:{
    type:ObjectId,
    ref:'users'
  },
  // 2.幹部名稱
  ROLE:{
    type:String,
  },
  // 3.確認狀態(功能先不用，key先存)
  CONFIRM:{
    type:Boolean,
    default:false
  },
  // 4.確認中的使用者(功能先不用，key先存)
  CONFIRM_USER:{
    type:ObjectId,
    ref:'users',
    default:'null'
  },
})

// 票券
const ticketCartSchema = new Schema({
  // 1.活動ID
  EVENT:{
    type:ObjectId,
    ref:'events'
  },
  // 2.票券ID(從events取得票券的_id)
  TICKET:{
    type:ObjectId,
  },
})

// 通知
const notifySchema = new Schema({
  // 1.通知類別
  TYPE:{
    type:Number,
    required:[true,'缺少「通知類別」'],
    enum: {
      values:[0,1,2],
      message: '通知分類錯誤'
    }
  },
  // 2.追蹤的使用者
  FOLLOW_USER:{
    type:ObjectId,
    required() {
      return [this.TYPE === NotifyType.FOLLOW , '缺少「追蹤的使用者」']
    },
    ref:'users'
  },
  // 3.被按讚的活動
  LIKE_EVENT:{
    type:ObjectId,
    required() {
      return [this.TYPE === NotifyType.LIKE , '缺少「被按讚的活動」']
    },
    ref:'events'
  },
  // 4.被按讚的貼文
  LIKE_POST:{
    type:ObjectId,
    required() {
      return [this.TYPE === NotifyType.LIKE , '缺少「被按讚的貼文」']
    },
    ref:'posts'
  },
  // 5.按讚的人
  LIKE_USER:{
    type:ObjectId,
    required() {
      return [this.TYPE === NotifyType.LIKE , '缺少「按讚的人」']
    },
    ref:'users'
  },
  // 6.即將開始的活動
  EVENT_START:{
    type:ObjectId,
    required() {
      return [this.TYPE === NotifyType.EVENT_START , '缺少「即將開始的活動」']
    },
    ref:'events'
  },
  // 7.待確認的社團
  CONFIRM_CLUB:{
    type:ObjectId,
    required() {
      return [this.TYPE === NotifyType.EVENT_START , '缺少「待確認的社團」']
    },
    ref:'users'
  },
  // 8.待確認的社團幹部名稱
  CONFIRM_ROLE:{
    type:String,
    required() {
      return [this.TYPE === NotifyType.EVENT_START , '缺少「待確認的社團」']
    },
  },
})


const schema = new Schema({
  // 1.信箱(學校信箱)
  EMAIL:{
    type: String,
    required:[true,'缺少「使用者信箱」'],
    unique: true,
    maxlength: [40, '「使用者信箱」長度不符'],
    validator: {
      validator (value) {
        return validator.isEmail(value) && (this.ROLE === UserRole.STUDENT ? value.includes('edu') : true)
      },
    message: '「使用者信箱」格式錯誤'
    }
  },
  // 2.密碼，下方還需驗證後加密
  PASSWORD:{
    type: String,
    required:[true,'缺少「使用者密碼」'],
    unique: false,
    minlength: [6, '「使用者密碼」長度不符'],
    maxlength: [20, '「使用者密碼」長度不符']
  },
  // 3.學號
  STUDENT_NO:{
    type: String,
    required() {
      return this.ROLE === UserRole.STUDENT
    },
    unique: true,
    maxlength: [20, '「使用者信箱」長度不符'],
    validator:{
      validator(value){
        return validator.isAlphanumeric(value)
      }
    }
  },
  // 4.學校名字
  SCHOOL_NAME:{
    type: String,
    required:[true,'缺少「使用者學校」'],
    unique: false,
    maxlength: [20, '「使用者學校」長度不符']
  },
  // 5.學校縣市
  SCHOOL_CITY:{
    type: String,
    required:[true,'缺少「使用者學校縣市」'],
    unique: false,
    minlength: [3, '「使用者學校縣市」長度不符'],
    maxlength: [3, '「使用者學校縣市」長度不符'],
    enum: {
      values: ['臺北市','新北市','桃園市','臺中市','臺南市','高雄市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣','基隆市','新竹市','嘉義市'],
      message: '縣市分類錯誤'
    }
  },  
  // 6.姓名/社團名
  REAL_NAME:{
    type: String,
    required:[true,'缺少「使用者姓名/社團名」'],
    unique: false,
    maxlength: [12, '「使用者姓名/社團名」長度不符']
  },
  // 7.用戶名稱
  USER_NAME:{
  type: String,
  required:[true,'缺少「使用者用戶名稱」'],
  unique: true,
  maxlength: [12, '「使用者用戶名稱」長度不符']
  },
  // 8.檔案暱稱
  NICK_NAME:{
    type: String,
    required:[true,'缺少「使用者檔案暱稱」'],
    unique: false,
    maxlength: [12, '「使用者檔案暱稱」長度不符']
    },
  // 9.出生日期
  BDAY:{
    type: String,
    required() {
      return [this.ROLE === UserRole.STUDENT || this.ROLE === UserRole.NOT_STUDENT, '缺少「使用者出生日期」']
    },
    unique: true,
    },
  // 10.性別
  GENDER:{
    type: String,
    required() {
      return [this.ROLE === UserRole.STUDENT || this.ROLE === UserRole.NOT_STUDENT, '缺少「使用者性別」']
    },
    unique: false,
    minlength: [3, '「使用者性別」長度不符'],
    maxlength: [3, '「使用者性別」長度不符'],
    },
  // 11.手機
  MOBILE:{
    type: String,
    required() {
      return [this.ROLE === UserRole.STUDENT || this.ROLE === UserRole.NOT_STUDENT, '缺少「使用者手機」']
    },
    unique: false,
    minlength: [9, '「使用者手機」長度不符'],
    maxlength: [9, '「使用者手機」長度不符'],
    validator:{
      validator(value){
        return validator.isMobilePhone(value)
      }
    },
  },
  // 12.年級
  STUDENT_GRADE:{
    type: String,
    required() {
      return [this.ROLE === UserRole.STUDENT, '缺少「使用者年級」']
    },
    unique: false,
    minlength: [2, '「使用者年級」長度不符'],
    maxlength: [2, '「使用者年級」長度不符'],
    enum: {
      values: ['高一','高二','高三','大一','大二','大三','大四','碩士'],
      message: '「使用者年級」分類錯誤'
    },
    validator:{
      validator(value){
        return validator.isAlphanumeric(value)
      }
    }
  },
  // 13.備用信箱
  USER_NAME:{
    type: String,
    unique: false,
    maxlength: [40, '「使用者備用信箱」長度不符'],
    validator: {
      validator (value) {
        return validator.isEmail(value)
      }
    },
  },
  // 14.社團屆數
  CLUB_TH:{
    type: Number,
    required() {
      return [this.ROLE === UserRole.CLUB , '缺少「社團屆數」']
    },
    unique: false,
    maxlength: [3, '「社團屆數」長度不符'],
  },
  // 15.幹部
  CLUB_SQUAD_LEADER:{
    type: [memberSchema],
    required() {
      return [this.ROLE === UserRole.CLUB , '缺少「社團幹部」']
    },
    unique: false,
    default:[{USER:'',ROLE:'社長',CONFIRM:'false',CONFIRM_USER:'null'},{USER:'',ROLE:'副社長',CONFIRM:'false',CONFIRM_USER:'null'}]
  },
  // 16.社團性質
  CLUB_CATEGORY:{
    type: String,
    required() {
      return [this.ROLE === UserRole.CLUB , '缺少「社團性質」']
    },
    unique: false,
    maxlength: [3, '「社團性質」長度不符'],
    enum: {
      values: ['學術','學藝','音樂','康樂','服務','體育','康輔','聯誼','其他'],
      message: '「社團性質」分類錯誤'
    },
  },
  // 17.使用者角色
  ROLE:{
    type: Number 
    },
  // 18.TOKENS
  TOKENS:{
    type: [String]  
    },
  // 19.票券
  TICKET_CART:{
    type: [ticketCartSchema]
    },
  // 20.榮譽分數
  SCORES:{
    type:Number,
    required:[true,'缺少「使用者榮譽分數」'],
    default:80
    },
  // 21.是否畢業
  IS_STUDENT:{
    type:Boolean,
    required:[true,'缺少「使用者是否畢業」'],
    },
  // 22.通知
  NOTIFY:{
    type:[notifySchema],
    },
  // 23.收藏貼文
  KEEP_POST:{
    type:[ObjectId],
    ref:'posts'
    },
  // 24.收藏活動(活動頁暫時沒做，先存key)
  KEEP_EVENT:{
    type:[ObjectId],
    ref:'events'
    },
})


export default model('users',schema)