<template>
  <div class="hello">
    <div>
      <div class="wrapper">
        <div class="search-wrapper">
          <input type="text" id="login" class="fadeIn second" name="email" placeholder="Buscar"  v-on:keyup.enter="onEnter" v-model="search" @input="input">
          <button class="btn btn-dark button btn-refresh" @click="onRefresh()" >Refresh</button>
        </div>

        <div>
          <router-link  v-if="rol ==='Creador' || rol ==='admin'" to='/add'>Agregar contenido</router-link>
          <router-link  v-if="rol ==='Creador' || rol ==='admin'" to='/add-topic'>Agregar tema</router-link>

        </div>
      </div>
      <p>Buscar por titulo o tipo de documento</p>
     
    </div>
    
    <table>
        <tr>
          <td>Titulo</td>
          <td>Tipo</td>
          <td>Usuario</td>
          <td>Acciones</td>
        </tr>
        <tbody>
          <tr v-for="cont in content" :key="cont.name" >
            <td >
              {{cont.title}}
            </td>
             <td >
              {{cont.type}}
            </td>
            <td >
              {{cont.username}}
            </td>
            <td>
              <router-link :to="'/detail/' + cont._id" v-if="rol ==='Lector' || rol ==='Creador' || rol ==='admin'">ver</router-link>
              <router-link :to="'/edit/' + cont._id" v-if="rol ==='Creador' || rol ==='admin'">editar</router-link>
              <a @click="onDelete(cont._id)" v-if="rol ==='admin'">borrar</a>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LibraryView',
  components: {

  },
  data: function(){
    return {
      rol: localStorage.rol,
      content:[],
      search:''
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/content/home/list` )
      .then( data =>{
        if(data.status == 200){
          this.content = data.data.content;
          console.log(this.content)
        }else{
        console.log(data)
          this.error = true;
          this.error_msg = data.data.message;
        }
      })
      .catch(function () {
        console.log("error")
        //this.error = ref('does it work?');
      })
  },
  methods: {
    onSearch(){
      axios.get(`http://localhost:3000/api/content/home/list?search=${this.search}` )
        .then( data =>{
        console.log(data)
          if(data.status == 200){
            this.content = data.data.content;
            console.log(this.content)
          }else{
          console.log(data)
            this.error = true;
            this.error_msg = data.data.message;
          }
        })
        .catch(function () {
          console.log("error")
          //this.error = ref('does it work?');
        })
    },
    input() {
      this.onSearch()
    },
    onRefresh() {
     axios.get(`http://localhost:3000/api/content/home/list` )
      .then( data =>{
        if(data.status == 200){
          this.content = data.data.content;
          console.log(this.content)
        }else{
        console.log(data)
          this.error = true;
          this.error_msg = data.data.message;
        }
      })
      .catch(function () {
        console.log("error")
        //this.error = ref('does it work?');
      })
    },
    onDelete(id) {
      this.token= localStorage.token;
      axios.delete(`http://localhost:3000/api/content/delete/${id}`, { headers: { token: this.token }})
      .then( data =>{
        if(data.status == 200){
          this.onRefresh()
        }else{
        console.log(data)
          this.error = true;
          this.error_msg = data.data.message;
        }
      })
      .catch(function () {
        console.log("error")
        //this.error = ref('does it work?');
      })
    }
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.btn-refresh{
  margin-left:10px;
  height: 34px;
  border-radius: 8px;
  border: none;
  width: 100px;
}

table{
  margin-top:50px;
  margin-left:20px;
  margin-right:20px;
  width: 95%;
}

td{
  border: 1px solid rgba(66, 185, 131, 0.5);
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
  margin:10px;
}

p {
  margin:0px;
  text-align: left;
  padding-left: 20px;
  padding-top: 10px;
}

</style>
