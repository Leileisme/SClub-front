import users from '../models/users.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    // 這邊的 image 是我表單自訂的名字
    // req.body.IMAGE = req.file.path
    await users.create(req.body)
    res.status(200).json({
      success: true,
      message: ''
    })
  } catch (error) {
    console.log(error, 'users create controller')
    // 當 models 驗證未過時，將產生一個 ValidationError 錯誤
    if (error.name === 'ValidationError') {
      // error.errors 中的錯誤是根據 models 定義中設置的驗證條件所產生的
      // EX: required: [true, '缺少「通知類別」']

      // error.errors 包含了驗證失敗時的詳細資訊，EX：哪個欄位未通過驗證...
      // error.errors[0] 取錯誤物件第一個屬性名稱
      // error.errors[key].message 取其錯誤訊息
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({
        success: false,
        message
      })
      // 錯誤代碼 11000 ： 資料重複
    } else if (error.name === 'MongoServerError' && error.code === 1100) {
      res.status(409).json({
        success: false,
        message: '帳號已註冊'
      })
    } else {
      res.status(500).json({
        success: false,
        message: '註冊的未知錯誤'
      })
    }
  }
}

// 回傳的資料以後可以看看要不要增加
export const login = async (req, res) => {
  try {
    // jwt.sign 創造一個新的JWT，並接受三個參數 ( 物件、密鑰、選項 )
    const TOKEN = jwt.sign({ _id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.TOKENS.push(TOKEN)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '',
      result: {
        TOKEN,
        EMAIL: req.user.EMAIL,
        ROLE: req.user.ROLE,
        SCHOOL_NAME: req.user.SCHOOL_NAME,
        SCHOOL_CITY: req.user.SCHOOL_CITY,
        USER_NAME: req.user.USER_NAME,
        NICK_NAME: req.user.NICK_NAME,
        CLUB_TH: req.user.CLUB_TH,
        CLUB_CATEGORY: req.user.CLUB_CATEGORY,
        IMAGE: req.user.IMAGE,
        TICKET_CART: req.user.TICKET_CART,
        SCORES: req.user.SCORES,
        NOTIFY: req.user.NOTIFY,
        KEEP_POST: req.user.KEEP_POST,
        KEEP_EVENT: req.user.KEEP_EVENT,
        FANS: req.user.FANS,
        FOLLOW: req.user.FOLLOW,
        IS_STUDENT: req.user.IS_STUDENT,
        IS_ABLE: req.user.IS_ABLE,
        IS_ADMIN: req.user.IS_ADMIN,
        MAKE_EVENT: req.user.MAKE_EVENT,
        MAKE_POST: req.user.MAKE_POST,
        DESCRIBE: req.user.DESCRIBE
      }
    })
  } catch (error) {
    console.log(error, 'users login controller')
    res.status(500).json({
      success: false,
      message: '登入的未知錯誤'
    })
  }
}

export const logout = async (req, res) => {
  try {
    req.TOKENS = req.user.TOKENS.filter((token) => token !== req.TOKENS)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: ''
    })
  } catch (error) {
    console.log(error, 'users logout controller')
    res.status(500).json({
      success: false,
      message: '登出的未知錯誤'
    })
  }
}

export const extend = async (req, res, next) => {
  try {
    const idx = req.user.TOKENS.findIndex((token) => token === req.TOKEN)
    const TOKEN = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.TOKENS[idx] = TOKEN
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '',
      result: TOKEN
    })
  } catch (error) {
    console.log(error, 'users extend controller')
    res.status(500).json({
      success: false,
      message: 'token換新的未知錯誤'
    })
  }
}

// pinai 只存 JWT ，登入後執行 getProfile 取個人資料 放本地
export const getProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      massage: '',
      result: {
        EMAIL: req.user.EMAIL,
        ROLE: req.user.ROLE,
        SCHOOL_NAME: req.user.SCHOOL_NAME,
        SCHOOL_CITY: req.user.SCHOOL_CITY,
        USER_NAME: req.user.USER_NAME,
        NICK_NAME: req.user.NICK_NAME,
        CLUB_TH: req.user.CLUB_TH,
        CLUB_CATEGORY: req.user.CLUB_CATEGORY,
        IMAGE: req.user.IMAGE,
        TICKET_CART: req.user.TICKET_CART,
        SCORES: req.user.SCORES,
        NOTIFY: req.user.NOTIFY,
        KEEP_POST: req.user.KEEP_POST,
        KEEP_EVENT: req.user.KEEP_EVENT,
        FANS: req.user.FANS,
        FOLLOW: req.user.FOLLOW,
        IS_STUDENT: req.user.IS_STUDENT,
        IS_ABLE: req.user.IS_ABLE,
        IS_ADMIN: req.user.IS_ADMIN,
        MAKE_EVENT: req.user.MAKE_EVENT,
        MAKE_POST: req.user.MAKE_POST,
        DESCRIBE: req.user.DESCRIBE
      }
    })
  } catch (error) {
    console.log(error, 'users getProfile controller')
    res.status(500).json({
      success: false,
      message: '取得個人資料的未知錯誤'
    })
  }
}

export const getUser = async (req, res) => {
  try {
    // i 是不分大小寫
    const regex = new RegExp(req.query.search || '', 'i')

    const data = await users.find({
      $or: [
        { USER_NAME: regex },
        { NICK_NAME: regex }
      ]
    })

    res.status(200).json({
      success: true,
      message: '',
      result: {
        data
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'getUser 的未知錯誤'
    })
  }
}

export const edit = async (req, res) => {
  try {
    req.body.IMAGE = req.file?.path

    // findOneAndUpdate用於找到並更新 MongoDB 中的特定文件
    // 三個參數(尋找資料的key,更新的資料,選項)
    await users.findOneAndUpdate({ USER_NAME: req.body.USER_NAME }, req.body, { runValidators: true }).orFail(new Error('NOT FOUND'))

    res.status(200).json({
      success: true,
      message: ''
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(400).json({
        success: false,
        message: 'ID 格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(404).json({
        success: false,
        message: '查無使用者'
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({
        success: false,
        message
      })
    } else {
      res.status(500).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}
