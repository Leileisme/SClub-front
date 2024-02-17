import events from '../models/events.js'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    const data = { ...req.body, Image: req.file.path }
    const result = await events.create(data)

    res.status(200).jsov({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error, 'events controllers 的 error')
    // 使用者驗證錯誤
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({
        success: false,
        message
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'events create 未知錯誤'
      })
    }
  }
}
