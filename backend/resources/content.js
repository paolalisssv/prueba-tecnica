export default{
  content_list: (content)=>{
    console.log(content)
    return{
      _id: content._id,
      title: content.title,
      username: content.user,
      type: content.type
    }
  }
}