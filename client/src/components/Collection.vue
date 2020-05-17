/* eslint-disable */
<template>
<div  class="row" >
    <div class="col-md-4 col-3 my-1" v-for="(coll,index) in collections" :key="coll._id" >
        <div class="card h-100 mb-4">
               <a name="buttonDelete" id="buttonDelete">
                <img style="max-width: 20px; max-height: 20px; float: right;margin-top: 10px;margin-bottom: 10px; margin-right: 10px;"
                     src="../assets/delete.png" v-on:click="deleteCollection(coll._id,index)"/>
            </a>
            <img :src="imgPath + coll.collectionImage" class="img">
            <div class="image">
                <router-link :to="{name: 'Categorie', params: {collection: coll}}">
                    <img name="see" id="see"
                    src="../assets//see.png"/>
                </router-link>
                <router-link :to="{name: 'CreateCollection', params: {collection: coll}}">
                 <img name="see" id="see"
                  src="../assets//edit.png" />
                </router-link>

            </div>
            <div class="card-inner">
                <div class="header">
                    <h2>
                   <a>{{coll.name}}</a>
                    </h2>
                </div>
                <div class="content">
                </div>
        </div>
    </div>
    </div>
     <router-link to="/Createcollection">
         <footer>
    <a id="collection-button" name="collection-button">
        <img style="max-width: 70px; max-height: 100px;" src="../assets/add.png" /></a>
</footer></router-link>
</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
/* eslint-disable */
export default {
  data() {
    return {
      collections: [],
      imgPath: "http://localhost:4000/",
      index: "",
    };
  },

  created: function() {
    this.fetchItems();
  },

  methods: {
    test(){
      console.log(localStorage.getItem('usertoken'))
    },
    fetchItems() {
      let uri = "http://localhost:4000/collections/getAll";
      axios.get(uri,{headers:{'authorization': localStorage.getItem('usertoken')}}).then(response => {
        this.collections = response.data;
      });
    },
    deleteCollection(id, index) {
      this.$confirm("Are you sure?")
        .then(() => {
          axios
            .delete("http://localhost:4000/collections/delete/" + id,{headers:{'authorization': localStorage.getItem('usertoken')}})
            .then(res => {
              this.$alert(res.data);
            });
          this.collections.splice(index, 1);
        })
        .catch(err => {});
    },
    createCollection() {
      this.$prompt().then(img => {
        console.log(text);
      });
    },
    see(id){
       router.push({ name: 'CreateCollection',params: { id: id } })
    }
  }
};
</script>

<style scoped>
#colle{
  max-height: 200px;
}
#collection-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
#collection-button:hover {
  zoom: 1.2;
}

div {
  background: #0c0202;
  background: rgb(255, 255, 253) url() repeat top left;
}

.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.2s ease-in-out;
        box-sizing: border-box;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #FFF;
        text-align: center;
        
}

.card:hover {
  opacity: 0.7;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.23);
}
.card:hover #see {
  opacity: 1;
}

#see:hover {
  opacity: 2;
}

#mid:hover {
  opacity: 2;
}
#see {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
  /* float: center; position: absolute; 
        margin-top: 100px; 
        margin-left: -330px;  */
  opacity: 0;
}

.card > .card-inner {
  padding: 10px;
}

.card .header h2,
h3 {
  margin-bottom: 0px;
  margin-top: 0px;
}

.card .header {
  margin-bottom: 5px;
}

.card img {
  width: 100%;
  height: 70%;
}

#titre {
  font-weight: bold;
  margin-top: 1%;
}

#coll {
  text-align: center;
  font-family: serif;
}
</style>