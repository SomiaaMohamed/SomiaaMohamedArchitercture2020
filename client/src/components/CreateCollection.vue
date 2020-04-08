<template>
  <div>
    <div v-if="collection">
         <h1 id="titre">Update Collection</h1>
    <form v-on:submit.prevent="updateCollection(collection._id,collection.name)" id="coll" name="coll">
      <div>
            <label>Collection Name:</label>
            <input type="text" class="form-control col-md-10" name="name" :value="collection.name" @input="updateName" required>
        </div>
          <div>
              <label>Image Collection:</label>
              <input type="file" class="form-control col-md-10" @change="onFileSelected"/>
              <br/>
          </div>
            <br />
        <div class="form-group">
          <button id="editButton" name="editButton" class="btn btn-primary" disabled>Update Collection</button>
        </div>
    </form>
    <!-- <button v-on:click="test(collection)">testtt</button> -->
    </div>
    <div v-if="!collection">
    <h1 id="titre">Create Collection</h1>
    <form v-on:submit.prevent="addCollection" id="coll" name="coll">
      <div>
            <label>Collection Name:</label>
            <input type="text" class="form-control col-md-10" v-model="name" name="name" >
        </div>
          <div>
              <label>Image Collection:</label>
              <input type="file" class="form-control col-md-10" @change="onFileSelected"/>
              <br/>
          </div>
            <br />
        <div class="form-group">
          <button class="btn btn-primary">Add Collection</button>
        </div>
    </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import router from '../router'
  export default {
    name: 'CreateCollection',
    props: ['collection'],

    data(){
        return{
          newText:'',
          nameUpdate:'',
          name:'',
          selectedFile : null
        }
    },
    methods: {
      addCollection(){
        const fd = new FormData();
        fd.append('collectionImage', this.selectedFile, this.selectedFile.name)
        fd.append('name',this.name)
        axios.post('http://localhost:4000/collections/add', fd,{headers:{'authorization': localStorage.getItem('usertoken')}}).then((response) => {
          router.push({name : 'Collection'})
        })
    },
    updateName(target) {
      document.getElementById("editButton").disabled = false,
     this.newText = target
},
    onFileSelected(event){
        this.selectedFile = event.target.files[0]
        document.getElementById("editButton").disabled = false
    },
    test(id){
      console.log(id)
    },
    updateCollection(id,name){
      const fd = new FormData()
      if(this.selectedFile){
        if(this.newText.target){
          fd.append('name',this.newText.target.value)
        fd.append('collectionImage', this.selectedFile, this.selectedFile.name)
        }
        else{
          fd.append('name',name)
        fd.append('collectionImage', this.selectedFile, this.selectedFile.name)
        }
      }
      else{
        fd.append('name',this.newText.target.value)
      }
         axios.post('http://localhost:4000/collections/update/'+id, fd,{headers:{'authorization': localStorage.getItem('usertoken')}}).then((response) => {
          router.push({name : 'Collection'})
        })
    }
  }
}
</script>
<style scoped>
#titre {
    font-weight: bold;
    margin-top: 1%;
    text-align: center;
}

input{
    width : 70%;
    margin-left: 15%
}
#coll{
    text-align: center;
    font-family: serif

}


</style>