import routerx from 'express-promise-router'
import UserController from '../controllers/UserController'
import auth from '../middleware/auth'

const router = routerx()

router.post('/register', UserController.register)
router.post('/register_admin', auth.verifyAdmin, UserController.register_admin)
router.post('/login', UserController.login)
router.delete('/remove',auth.verifyAdmin, UserController.remove)
router.post('/login_admin', UserController.login_admin)

export default router;