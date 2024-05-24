<template>
  <div class="wrapper">
    <p>En nuestra biblioteca de contenidos podras encontrar {{data.totalContents}} contenidos de diferentes tematicas.</p>
    <p> {{data.totalImages}} imagenes</p>
    <p> {{data.totalTopics}} tematicas diferentes</p>
    <p> {{data.totalContentText}} textos</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {

  },
  data: function(){
    return {
      data: "",
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/home/list/')
      .then( data =>{
        console.log(data)
          if(data.status == 200){
            this.data = data.data
          }else{
            this.error = true;
            this.error_msg = data.data.message;
          }
      })
      .catch(function () {
         console.log("error")
         //this.error = ref('does it work?');
        })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  margin-top:80px;
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
