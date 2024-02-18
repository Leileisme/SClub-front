import events from '../models/events.js'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    const category = req.body.CATEGORY.split(',')
    const coOrganizer = req.body.CO_ORGANIZER ? req.body.CO_ORGANIZER.split(',') : null
    const data = coOrganizer
      ? { ...req.body, IMAGE: req.file.path, CATEGORY: category, CO_ORGANIZER: coOrganizer }
      : { ...req.body, IMAGE: req.file.path, CATEGORY: category }

    const result = await events.create(data)
    res.status(200).json({
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
