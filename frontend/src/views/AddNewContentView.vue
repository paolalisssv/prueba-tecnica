<template>
  <div class="hello">
  <h4>Agregar nuevo contenido</h4>
   <form v-on:submit.prevent="addNew">
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
      <div v-if="this.type==='text/plain'">
        <p v-if="this.fileContent">{{this.fileContent}}</p>
        <p v-else>No text...</p>
      </div>
      <input type="submit" class="fadeIn fourth button" value="Subir contenido">
      
      <p v-if="errorType">El archivo y el tipo de archivo debe coincidir</p>
      <p v-if="errorEmpty">Todos los campos deben estar llenos</p>
    
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddNewContentView',
  components: {

  },
   data: function(){
    return {
      imagen:null,
      token:"",
      title:"",
      topic:"",
      type:"",
      topics:[],
      errorType: false,
      errorEmpty: false,
      imageType:"",
      previewUrl: '',
      fileContent:""
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
  },
  methods:{
    getFile(event){
      this.imagen = event.target.files[0];
      this.imageType= event.target.files[0].type;
      const reader = new FileReader()
      const that = this
      reader.onload = function (event) {
        if(this.imageType==='text/plain'){
          that.fileContent = event.target.result
        }else{
          that.previewUrl = event.target.result
        }
      }
      if(event.target.files[0].type==='text/plain'){
        reader.readAsText(this.imagen)
      }else{
        reader.readAsDataURL(this.imagen)
      }
    },
    addNew(){
      if(this.imageType !== this.type){
        this.errorType = true
      }else if(this.type === "" || this.image === null || this.title === "" || this.topic === "" ){
        this.errorEmpty = true
      }
      else{
        this.token= localStorage.token;
        var data = new  FormData();
        if(this.type==='text/plain'){
          data.append('content', this.fileContent);

        }else{
          data.append('content', this.imagen);
        }
        data.append('title', this.title);
        data.append('topic', this.topic);
        data.append('type', this.type);
        data.append('user', localStorage._id);
        this.token= localStorage.token;

        console.log(data)

        axios.post('http://localhost:3000/api/content/register', data, { headers: { token: this.token }} )
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
img{
 width:300px;
 height: 300px;
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
</style>
