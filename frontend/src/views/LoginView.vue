<template>
  <div class="wrapper">
    <h4>Iniciar sesion</h4>
    <form v-on:submit.prevent="login">
      <input type="text" id="login" class="fadeIn second" name="email" placeholder="Correo" v-model="email">
      <input type="text" id="password" class="fadeIn third" name="password" placeholder="Contraseña" v-model="password">
      <input type="submit" class="fadeIn fourth button" value="Iniciar sesion">
    </form>
    <p v-if="errorEmpty">Todos los campos deben estar llenos</p>

    <div class="alert alert-danger" role="alert" v-if="error">
      <p>hay un error</p>
    </div>

    <p>¿No tienes una cuenta?</p>
    <router-link to="/sign-up">Registrate</router-link>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'LoginView',
  components: {

  },
  data: function(){
    return {
      email: "",
      password: "",
      error: false,
      error_msg: "hubo un error",
      errorEmpty:false
    }
  },
  methods:{
    login(){
       if(this.email === "" || this.password === "" ){
        this.errorEmpty = true
      }else{
        let json = {
          "email" : this.email,
          "password": this.password
        };
        axios.post('http://localhost:3000/api/user/login', json)
        .then( data =>{
           if(data.status == 200){
             localStorage.token = data.data.token;
             localStorage.username = data.data.user.username;
             localStorage.rol = data.data.user.rol;
             localStorage._id = data.data.user._id;
             localStorage.loged= true;


             this.$router.push('/');
           }else{
           console.log(data)
             //this.error = true;
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


<style scoped>
.wrapper{
  padding-top:100px;
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
