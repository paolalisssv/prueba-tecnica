import token from "../services/token"

export default {
  verifyReader: async(req, res, next) =>{
    if(!req.headers.token){
      res.status(404).send({message:'token no enviado '})
    }
    const response = await token.decode(req.headers.token)
    if(response){
      if(response.rol == 'Lector' || response.rol == 'Creador' || response.rol == 'admin'){
        next()
      }else{
        res.status(403).send({message:'no esta permitido visitar esta ruta'})
      }
    }else{
      res.status(403).send({message:'token invalido'})
    }
  },
  verifyCreator: async(req, res, next) =>{
    if(!req.headers.token){
      res.status(404).send({message:'token no enviado '})
    }
    const response = await token.decode(req.headers.token)
    if(response){
      if(response.rol == 'Creador' || response.rol == 'admin'){
        next()
      }else{
        res.status(403).send({message:'no esta permitido visitar esta ruta'})
      }
    }else{
      res.status(400).send({message:'token invalido'})
    }
  },
  verifyAdmin: async(req, res, next) =>{
    if(!req.headers.token){
      res.status(400).send({message:'token no enviado '})
    }
    const response = await token.decode(req.headers.token)
    if(response){
      if(response.rol == 'admin' ){
        next()
      }else{
        res.status(403).send({message:'no esta permitido visitar esta ruta'})
      }
    }else{
      res.status(403).send({message:'token invalido'})
    }
  },
}