import bcrypt from 'bcryptjs'
import models from '../models'
import token from '../services/token'
import {isEmail} from '../utils/emailValidator'

export default {
  register: async(req, res) =>{
    try{
      const userValidation = await models.Users.findOne({email: req.body.email, username: req.body.username})
      if(userValidation){
        res.status(400).send({message: 'Ya existe una cuenta registrada con ese correo o username'})
        return
      }

      if(isEmail(req.body.email)===false){
        res.status(500).send({message: 'Email invalido'})
        return
      }
      //descomentar despues de agregar un usuario tio admin
      // if(req.body.rol === 'admin'){
      //   res.status(500).send({message: 'No cuentas con permisos para registrar esta cuenta'})
      //   return
      // }

      req.body.password = await bcrypt.hash(req.body.password,10)
      const user = await models.Users.create(req.body)
      const userInfo = {
        username: user.username,
        email: user.email,
        rol: user.rol,
        id: user._id
      }
      res.status(200).json(userInfo)
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema'})
      console.log(err)
    }
  },
  register_admin: async(req, res) =>{
    try{
      const userV = await models.Users.findOne({email: req.body.email, username: req.body.username})
      if(userV){
        res.status(400).send({message: 'Ya existe una cuenta registrada con ese correo o username'})
        return
      }
      req.body.rol = 'admin'      
      req.body.password = await bcrypt.hash(req.body.password,10)
      let user = await models.Users.create(req.body)
      const userInfo = {
        username: user.username,
        email: user.email,
        rol: user.rol,
        id: user._id
      }
      res.status(200).json(userInfo)
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema'})
      console.log(err)
    }
  },
  login: async(req, res) =>{
    try{
      const user = await models.Users.findOne({email: req.body.email, status:1})
      if(user){
        let compare = await bcrypt.compare(req.body.password, user.password);
        if(compare){
          let tokenT = await token.encode(user._id, user.rol, user.email, user.username)
          const UserLoginInfo= {
            token: tokenT,
            user:{
              _id: user._id,
              rol: user.rol,
              email: user.email,
              username: user.username
            } 
          } 
          console.log(UserLoginInfo)
          res.status(200).json(UserLoginInfo)
        }else{
          res.status(400).send({message: 'el cliente no existe'})
        }
      }else{ 
        res.status(400).send({message: 'el cliente no existe'})
      }
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema'})
      console.log(err)
    }
  },
  login_admin: async(req, res) =>{
    try{
      const user = await models.Users.findOne({email: req.body.email, status:1, rol:"admin"})
      if(user){
        let compare = await bcrypt.compare(req.body.password, user.password);
        if(compare){
          let tokenT = await token.encode(user._id, user.rol, user.email, user.username)
          const UserLoginInfo = {
            token: tokenT,
            user:{
              username: user.username,
              email: user.email,
              rol: user.rol
            } 
          } 
          console.log(UserLoginInfo)
          res.status(200).json(UserLoginInfo)
        }else{
          res.status(400).send({message: 'el cliente no existe'})
        }
      }else{ 
        res.status(400).send({message: 'el cliente no existe'})
      }
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema'})
      console.log(err)
    }
  },
  // update: async(req, res) =>{
  //   try{
  //     if(req.body.password){
  //       req.body.password = await bcrypt.hash(req.body.password,10)
  //     }
  //     await models.Users.findByIdAndUpdate({_id:req.body._id},req.body)
  //     let UserT = await models.Users.findOne({_id:req.body._id})

  //     res.status(200).json({
  //       message:'usuario modificado',
  //       user: UserT
  //     })
  //   }catch(err){
  //     res.status(500).send({message: 'ocurrio un problema'})
  //     console.log(err)
  //   }
  // },

  remove: async(req, res) =>{
    try{
      await models.Users.findByIdAndDelete({_id: req.params.id})
      res.status(200).json({message: 'eliminado correctamente' })
    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  }
}