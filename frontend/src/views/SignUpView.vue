<template>
  <div class="hello">
  <h4>Crear cuenta</h4>
     <form v-on:submit.prevent="signup">
      <input type="text" id="signup" class="fadeIn second" name="email" placeholder="Correo" v-model="email">
      <input type="text" id="password" class="fadeIn third" name="password" placeholder="Contraseña" v-model="password">
      <input type="text" id="username" class="fadeIn third" name="username" placeholder="Username" v-model="username">
      <select v-model="rol">
        <option disabled value="">Tipo de usuario</option>
        <option>Creador</option>
        <option>Lector</option>
      </select>
      <input type="submit" class="fadeIn fourth button" value="Crear cuenta">
    </form>
    <p v-if="errorEmpty">Todos los campos deben estar llenos</p>
    
    <p>¿Ya tienes una cuenta?</p>
    <router-link to="/login">Inicia sesion</router-link>
  
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'SignUpView',
  components: {

  },
  data: function(){
    return {
      email: "",
      password: "",
      username:"",
      rol:"",
      error: false,
      error_msg: "",
      errorEmpty:false
    }
  },
  methods:{
    signup(){
      if(this.email === "" || this.username === "" || this.password === "" || this.rol === ""){
        this.errorEmpty = true
      }else{
        let json = {
          "email" : this.email,
          "password": this.password,
          "username" : this.username,
          "rol": this.rol
        };
        axios.post('http://localhost:3000/api/user/register', json)
        .then( data =>{
          console.log(data)
           if(data.status == 200){
             this.$router.push('/login');
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
</style>
