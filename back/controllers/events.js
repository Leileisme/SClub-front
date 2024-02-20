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

export const getEventAll = async (req, res) => {
  try {
    const regex = new RegExp(req.query.search || '', 'i')

    const data = await events.find({
      $or: [
        { TITLE: regex },
        { CITY: regex },
        { DATE: regex }
      ]
    }).limit(10)

    console.log(data, 'data getEventAll')
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
      message: 'getEventAll 的未知錯誤'
    })
  }
}

export const getEventById = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    const HOST_USER = await events.findById(req.params.id, 'HOST').populate('HOST', 'NICK_NAME CLUB_TH IMAGE DESCRIPTION')
    const result = await events.findById(req.params.id)
    result.HOST = HOST_USER.HOST

    if (!result) throw new Error('NOT FOUND')

    res.status(200).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error, 'events controllers 的 error')
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(400).json({
        success: false,
        message: 'ID 格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(404).json({
        success: false,
        message: '查無商品'
      })
    } else {
      res.status(500).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}
