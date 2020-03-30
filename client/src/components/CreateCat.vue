<template>
  <div>
           <div v-if="cat">
    <h1 id="titre">Update Categorie</h1>
    <h1></h1>
    <form v-on:submit.prevent="updateCat"  id="coll" name="coll" >
      <div>
        <label>Categorie Name:</label>
        <input type="text" class="form-control col-md-10" name="name"  :value='cat.cat.name' @input="updateName"/>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary" id="editButton" disabled name="editButton" @click="$emit('close')">Update Categorie</button>
      </div>
    </form>
      </div>

      <div v-if="!cat">
    <h1 id="titre">Create Categorie</h1>
    <h1></h1>
    <form v-on:submit.prevent="addCat"  id="coll" name="coll" >
      <div>
        <label>Categorie Name:</label>
        <input type="text" class="form-control col-md-10" name="name" v-model="name" />
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary" @click="$emit('close')">Add Categorie</button>
      </div>
    </form>
      </div>
  </div>
</template>

<style scoped>
#titre {
  font-weight: bold;
  margin-top: 1%;
  text-align: center;
}
input {
  width: 70%;
  margin-left: 15%;
}
#coll {
  text-align: center;
  font-family: serif;
}
</style>

<script>
/* eslint-disable */
import router from '../router'
import axios from 'axios'
export default {
  props: ['id','cat'],
  data(){
      return{
      name:'',
       newText:'',
      }
  },
methods: {
    addCat(){
       const catData = {
        name : this.name,
        collectionID : this.id,
    }
        axios.post('http://localhost:4000/categories/create', catData).then((response) => {
          console.log(response)
        })
    },
    hide(){
        console.log(this.cat)
        // document.getElementById('StudentModal').style.visibility = 'hidden'
        
    },
       updateName(target) {
      document.getElementById("editButton").disabled = false,
     this.newText = target
},
 
    updateCat(){
        let catData = {
            name: this.newText.target.value
        }
        console.log(name)
         axios.post('http://localhost:4000/categories/update/' + this.cat.cat._id, catData).then((response) => {
          console.log(response)
        })

    }

    
}
}

</script>
