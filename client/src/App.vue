
<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>
<script>
/*eslint-disable*/
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components : {
    'Navbar' : Navbar
  }
}
</script>



