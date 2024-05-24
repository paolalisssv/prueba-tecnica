import routerx from 'express-promise-router'
import multiparty from 'connect-multiparty'
import auth from '../middleware/auth'
import TopicsController from '../controllers/TopicsController'

const router = routerx()
var path = multiparty({uploadDir: './uploads/covers'})


router.post('/register', [auth.verifyCreator, path], TopicsController.register)
router.get('/list', auth.verifyReader, TopicsController.list)
router.put('/update', [auth.verifyCreator, path], TopicsController.update)
router.delete('/delete/:id', auth.verifyAdmin, TopicsController.remove)


export default router;