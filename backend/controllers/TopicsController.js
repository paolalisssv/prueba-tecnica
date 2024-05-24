import models from "../models"

export default {
  register: async(req, res) =>{
    try{

      let valid_topic = await models.Topics.findOne({name: req.body.name});

      if(valid_topic ){
        res.status(400).send({message: 'Ya existe una tematica con ese nombre'})
        return
      }

      let data = req.body;
      if(req.files){
        var img_path = req.files.cover.path;
        var name = img_path.split('\\');
        var portada_name = name[0];
          
        data.cover= portada_name;
      }
      let topic = await models.Topics.create(data)
      res.status(200).json(topic)
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema', error: err})
      console.log(err)
    }
  },
  update: async(req, res) =>{
    try{
      let data = req.body;
      if(req.files && req.files.cover.path){
        var img_path = req.files.cover.path;
        var name = img_path.split('\\');
        var portada_name = name[0];
          
        data.cover = portada_name;
      }

      await models.Topics.findByIdAndUpdate({_id:data._id},data)

      res.status(200).json({
        message:'tematica modificada',
      })
    }catch(err){
      res.status(500).send({message: 'ocurrio un problema'})
      console.log(err)
    }
  },

  list: async(req, res) =>{
    try{
      let topic = await models.Topics.find().sort({'createdAt':-1})
      console.log("toooop",topic)
      res.status(200).json(topic)
      return

    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },
  remove: async(req, res) =>{
    try{
      await models.Topics.findByIdAndDelete({_id: req.params.id})
      res.status(200).json({message: 'Tematica eliminada correctamente' })
    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },
}