import routerx from 'express-promise-router'
import User from './User';
import Topics from './Topics';
import Content from './Content';
import Home from './Home'

const router = routerx()

router.use('/user/', User)
router.use('/topics/', Topics)
router.use('/content/', Content)
router.use('/home/', Home)





export default router;