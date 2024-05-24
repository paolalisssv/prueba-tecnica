<template>
<HeaderComponent />
  <router-view></router-view>
</template>

<script>

import HeaderComponent from './components/HeaderComponent'

export default {
  name: 'App',
  components: {
   HeaderComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  margin: 0;
}
input{
  width: 300px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #42b983;
}
.button{
  background: #42b983;
  color: #fff;
  font-weight: 800;
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
}

select{
  width: 305px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid #42b983;
}
</style>
