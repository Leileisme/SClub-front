import { Router } from 'express'
import { create } from '../controllers/events.js'
import fileUpload from '../middlewares/fileUpload.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth.jwt, fileUpload, create)

export default router
