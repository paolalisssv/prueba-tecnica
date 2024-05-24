<template>
  <div class="wrapper">
  <a>Detalles del contenido</a>
    <form v-on:submit.prevent="detail">
      <p>Titulo:</p>
      <input type="text" id="title" disabled class="fadeIn second" name="title" placeholder="Titulo" v-model="title">
      <p>Usuario:</p>
      <input type="text" id="user" disabled class="fadeIn second" name="user" placeholder="Username" v-model="user">
      <p>Tematica:</p>
      <input type="text" id="topic" disabled class="fadeIn second" name="topic" placeholder="Tematica" v-model="topic">
      <p>Tipo de archivo:</p>
      <input type="text" id="type" disabled class="fadeIn second" name="type" placeholder="Tipo" v-model="type">
      <p>Contenido:</p>
      <div>
        <img :src="'http://localhost:3000/api/content/'+this.content" v-if="this.type ==='image/png' || this.type==='image/jpeg'">
        <p v-if="this.type ==='text/plain'"> {{fileContent}}</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
  name: 'DetailContentView',
  components: {

  },
  data: function(){
    return {
      content:"",
      type:"",
      title:"",
      topic:"",
      user:"",
      id:"",
      fileContent: ''
    }
  },
  mounted() {
    this.token= localStorage.token;
    const route = useRoute()
    this.id = route.params.id
    axios.get(`http://localhost:3000/api/content/show/${this.id}`, { headers: { token: this.token }} )
      .then( data =>{
          if(data.status == 200){
            console.log('ok')
            console.log(data.data[0]._id)
            this.content=data.data[0].content
            this.type=data.data[0].type
            this.title=data.data[0].title
            this.topic=data.data[0].topic
            this.user= data.data[0].user
            this.id=data.data[0]._id
          }else{
          console.log(data)
            this.error = true;
            this.error_msg = data.data.message;
          }
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  margin-top:50px;
}

img{
  width:300px;
  height: 300px;
}

form{
  margin-top:20px
}

p{
  margin:0px;
}

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
</style>
