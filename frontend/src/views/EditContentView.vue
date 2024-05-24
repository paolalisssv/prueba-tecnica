<template>
  <div class="hello">
  <h4>Editar contenido</h4>
   <form v-on:submit.prevent="edit">
      <input type="text" id="title" class="fadeIn second" name="title" placeholder="Titulo" v-model="title">
      <p>Tematica</p>
       <select v-model="topic">
        <option disabled value="">Tematica</option>
        <option v-for="top in topics" :key="top.name" v-bind:value="top._id">
          {{ top.name }}
        </option>
      </select>
      <p>Tipo de archivo</p>
      <select v-model="type">
        <option disabled>Tipo de archivo</option>
        <option value="image/png">image/png</option>
        <option value="image/jpeg">image/jpeg</option>
        <option value="text/plain">text/plain</option>
      </select>
      <input type="file"  id="content" class="fadeIn second" name="content" placeholder="Content" @change="getFile" >
      <div v-if="this.type==='image/png' || this.type==='image/jpeg'">
        <img :src="previewUrl" v-if="previewUrl">
        <p v-else>No image...</p>
      </div>
      <input type="submit" class="fadeIn fourth button" value="Editar contenido">

      <p v-if="this.errorType">El archivo y el tipo de archivo debe coincidir</p>
      <p v-if="this.errorEmpty">Todos los campos deben estar llenos</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
  name: 'EditContentView',
  components: {

  },
   data: function(){
    return {
      previewUrl: '',
      preview: '',
      content:null,
      token:"",
      title:"",
      topic:"",
      type:"",
      topics:[],
      id:"",
      errorEmpty: false,
      errorType: false,
      contentType:"",
      fileChange: false,
    }
  },
  mounted() {
    this.token= localStorage.token;
    axios.get('http://localhost:3000/api/topics/list/', { headers: { token: this.token }} )
      .then( data =>{
          if(data.status == 200){
          console.log("dataaa",data)
            this.topics = data.data
          }else{
          console.log(data)
            this.error = true;
            this.error_msg = data.data.message;
          }
    })
    this.token= localStorage.token;
    const route = useRoute()
    this.id = route.params.id
    axios.get(`http://localhost:3000/api/content/show/${this.id}`, { headers: { token: this.token }} )
      .then( data =>{
          if(data.status == 200){
            if(data.data[0].type === 'image/png' || data.data[0].type ==='image/jpeg'){
              this.previewUrl ='http://localhost:3000/api/content/'+data.data[0].content
            }
            this.preview=data.data[0].content
            this.type=data.data[0].type
            this.contentType =data.data[0].type
            this.title=data.data[0].title
            this.topic=data.data[0].topic
            this.user= data.data[0].user
            this.id=data.data[0]._id
            console.log(data.data[0].content)
          }else{
          console.log(data)
            this.error = true;
            this.error_msg = data.data.message;
          }
      })
  },
  methods:{
    getFile(event){
      this.content = event.target.files[0];
      this.contentType= event.target.files[0].type

      const reader = new FileReader()
      const that = this
      reader.onload = function (event) {
        that.previewUrl = event.target.result
      }
      reader.readAsDataURL(this.content)

      this.fileChange=true
    },
    edit(){
       
      if(this.fileChange === true){
        if(this.contentType !== this.type){
          this.errorType = true
        }
      }
      if(this.title === "" || this.topic === "" ){
        this.errorEmpty = true
      }
      else{
        var data = new  FormData();
        if(this.content){
        console.log('se envia')
          data.append('content', this.content);
          data.append('type', this.type);
        }
        data.append('title', this.title);
        data.append('topic', this.topic);
        data.append('user', localStorage._id);
        data.append('_id', this.id);
        this.token= localStorage.token;

        axios.put('http://localhost:3000/api/content/update', data, { headers: { token: this.token }} )
        .then( data =>{
          console.log(data)
           if(data.status == 200){
             this.$router.push('/library');
           }else{
             this.error = true;
             this.error_msg = data.data.message;
           }
        })
        .catch(function () {
         console.log("error")
         //this.error = ref('does it work?');

        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p{
  margin:0px;
}
img{
 width:300px;
 height: 300px;
}
</style>
