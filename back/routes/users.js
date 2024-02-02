import { Router } from 'express'
import { create } from '../controllers/users.js'

// import fileUpload from '../middlewares/fileUpload.js'

const router = Router()
// users.js的路由，註冊時沒有頭貼，但會給自動頭貼，編輯時可改，那路由要fileUpload?
router.post('/', create)

export default router
