import {Router} from 'express'
import {check} from 'express-validator'
import {quotesDownloadsPost, quotesPost} from '../controllers/quotes.js'
import {checkFields} from '../middlewares/check-fields.js'

const router = Router()

router.post(
  '/',
  [
    check('investment', 'investment must be provided').not().isEmpty(),
    checkFields,
  ],
  quotesPost,
)
router.post(
  '/download',
  [
    check('currencies', 'currencies must be provided').not().isEmpty(),
    check('months', 'months must be provided').not().isEmpty(),
    check('type', 'type must be provided').not().isEmpty(),
    checkFields,
  ],
  quotesDownloadsPost,
)

export default router
