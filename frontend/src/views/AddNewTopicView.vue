<template>
  <div class="hello">
  <h4>Agregar nuevo tema</h4>
   <form v-on:submit.prevent="addNew">
      <input type="text" id="name" class="fadeIn second" name="title" placeholder="Tema" v-model="name">
      <input type="file"  id="cover" class="fadeIn second" name="cover" placeholder="Imagen" @change="getImage" accept="image/*">
      <div>
        <img :src="previewUrl" v-if="previewUrl">
        <p v-else>No image...</p>
      </div>
      <input type="submit" class="fadeIn fourth button" value="Guardar contenido">
      <p v-if="errorEmpty">Todos los campos deben estar llenos</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddNewTopicView',
  components: {

  },
   data: function(){
    return {
      name:"",
      imagen : null,
      errorEmpty: false,
      previewUrl: ''
    }
  },
  methods:{
    getImage(event){
      this.imagen = event.target.files[0];
      const reader = new FileReader()
      const that = this
      reader.onload = function (event) {
        that.previewUrl = event.target.result
      }
      reader.readAsDataURL(this.imagen)
      
    },
    addNew(){
      if(this.imagen === null || this.name === ""){
        this.errorEmpty = true
      }else{
        this.token= localStorage.token;
        var data = new  FormData();
        data.append('cover', this.imagen);
        data.append('name', this.name);

        axios.post('http://localhost:3000/api/topics/register', data, { headers: { token: this.token }} )
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
img{
 width:300px;
 height: 300px;
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
