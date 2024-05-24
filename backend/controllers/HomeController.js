import models from "../models"

export default {
  list: async(req, res) =>{
    try{
      
      var contentTopic = await models.Content.find().sort({'createdAt':-1})
      
      let totalTopics = await models.Topics.find().sort({'createdAt':-1})
      let totalContent = await models.Content.find().sort({'createdAt':-1})
      let contentImagesPng = await models.Content.find({type:"image/png"}).sort({'createdAt':-1})
      let contentImagesJpg = await models.Content.find({type:"image/png"}).sort({'createdAt':-1})
      let contentImagesJpeg = await models.Content.find({type:"image/png"}).sort({'createdAt':-1})
      let totalContentText = await models.Content.find({type:"text/plain"}).sort({'createdAt':-1})

      res.status(200).json({
        totalTopics: totalTopics.length,
        totalContents: totalContent.length,
        totalContentText: totalContentText.length,
        totalImages: contentImagesJpeg.length+ contentImagesJpg.length + contentImagesPng.length,
        contentTopic: contentTopic
      })
      return

    }catch(err){
      console.log(err)
      res.status(500).send({message: 'ocurrio un problema'})
    }
  },
}