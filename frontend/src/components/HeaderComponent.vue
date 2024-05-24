<template>
  <div class="header">
    <div>
      <router-link to='/'>Inicio</router-link>
      <router-link to='/library'>Biblioteca</router-link>
    
    </div>
    <router-link to='login'>Iniciar sesion</router-link>
    
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    msg: String
  },
  data: function(){
    return {
      token: "localStorage.token",
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.btn{
  background: transparent;
  border: none;
  color: #fff;
  font-weight: 800;
  font-size: initial;
}
.header{
  background: #42b983;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.header a{
  color: #fff;
  font-weight: 800;
  margin-right: 20px;
  text-decoration: none;
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
</style>
