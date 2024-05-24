import routerx from 'express-promise-router'
import multiparty from 'connect-multiparty'
import auth from '../middleware/auth'
import ContentController from '../controllers/ContentController'

const router = routerx()
var path = multiparty({uploadDir: './uploads/contents'})


router.post('/register', [auth.verifyCreator, path], ContentController.register)
router.get('/list', auth.verifyReader, ContentController.list)
router.get('/home/list',  ContentController.home_list)
router.get('/show/:id', auth.verifyCreator, ContentController.show)
router.put('/update', [auth.verifyCreator, path], ContentController.update)
router.delete('/delete/:id', auth.verifyAdmin, ContentController.remove)
router.get('/uploads/contents/:img', ContentController.obtainImage)



export default router;