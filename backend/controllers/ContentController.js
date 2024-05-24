import models from "../models"
import resources from "../resources"
import fs from 'fs'
import path from "path"

export default {
  register: async(req, res) =>{
    try{

      let valid_content = await models.Content.findOne({title: req.body.title});

      if(valid_content ){
        res.status(400).send({message: 'Ya existe un contenido con ese titulo'})
        return
      }
      
      let data = req.body;
      if(req.files){
        console.log("oook")
        console.log(req.body.type)
        console.log(req.files)

        if(req.body.type !== req.files.content.type){
          res.status(400).send({message: 'El tipo de archivo no es compatible, el archivo dever ser tipo '+ req.body.type})
          return
        }

        var img_path = req.files.content.path;
        var name = img_path.split('\\');
        var portada_name = name[0];
          
        data.content= portada_name;
      }
      let content = await models.Content.create(data)
      res.status(200).json(content)
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema', error: err})
      console.log(err)
    }
  },
  update: async(req, res) =>{
    try{
      let data = req.body;
      console.log('dataaa',req.files)
      if(req.files){
        console.log('iin')
        if(req.body.type && req.files.content.type){
          if(req.body.type !== req.files.content.type) {
          res.status(400).send({message: 'El tipo de archivo no es compatible, el archivo dever ser tipo '+ req.body.type})
          return
          }
        }
        var img_path = req.files.content.path;
        var name = img_path.split('\\');
        var portada_name = name[0];
          
        data.cover = portada_name;
      }

      await models.Content.findByIdAndUpdate({_id:data._id},data)

      res.status(200).json({
        message:'content modificada',
      })
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema'})
      console.log(err)
    }
  },
  show: async(req, res) =>{
    try{
      let content = await models.Content.find({_id: req.params.id}).sort({'createdAt':-1})

      res.status(200).json(content)
      return

    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },
  list: async(req, res) =>{
    try{
      var search = req.query.search

      let Content = await models.Content.find({
        $or:[
          {'title': new RegExp(search, 'i')},
          {'type': new RegExp(search, 'i')},
        ]
      }).sort({'createdAt':-1})

      res.status(200).json({
        content: Content,
        total:Content.length
      })
      return

    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },
  home_list: async(req, res) =>{
    try{
      var search = req.query.search

      let Content = await models.Content.find({
        $or:[
          {'title': new RegExp(search, 'i')},
          {'type': new RegExp(search, 'i')},
        ]
      }).sort({'createdAt':-1})
      
      Content=Content.map((cont)=>{
        return resources.Content.content_list(cont)
      })

      res.status(200).json({
        content: Content,
        total:Content.length
      })
      return

    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },
  remove: async(req, res) =>{
    try{
      await models.Content.findByIdAndDelete({_id: req.params.id})
      res.status(200).json({message: 'Contenido eliminado correctamente' })
    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },

  obtainImage: async(req, res) =>{
    try{
      var img = req.params['img'];


      fs.stat('./uploads/contents/'+img, function(err){
        if(!err){
          let path_img = './uploads/contents/'+img;
          res.status(200).sendFile(path.resolve(path_img));
        }else{
          let path_img = './uploads/default.jpg';
          res.status(200).sendFile(path.resolve(path_img));
        }
      })
    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  }
}