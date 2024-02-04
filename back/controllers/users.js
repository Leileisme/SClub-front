import users from '../models/users.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    // 這邊的 image 是我表單自訂的名字
    // req.body.IMAGE = req.file.path
    console.log('start')
    await users.create(req.body)
    console.log('end')
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
    const token = jwt.sign({ _id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.TOKENS.push(token)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '',
      result: {
        TOKENS: token,
        EMAIL: req.user.EMAIL,
        ROLE: req.user.ROLE
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
    const idx = req.user.TOKENS.findIndex((token) => token === req.TOKENS)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.TOKENS[idx] = token
    await req.save()
    res.status(200).json({
      success: true,
      message: '',
      result: token
    })
  } catch (error) {
    console.log(error, 'users extend controller')
    res.status(500).json({
      success: false,
      message: 'token換新的未知錯誤'
    })
  }
}
