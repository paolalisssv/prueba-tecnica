import HomeController from '../controllers/HomeController'
import routerx from 'express-promise-router'

const router = routerx()

router.get('/list',  HomeController.list)


export default router;