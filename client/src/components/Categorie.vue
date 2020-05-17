<template>
  <div class="container">
       <div class="form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text" class="form-control" v-model="search" placeholder="Search">
  </div>
      <div v-if="filtredCat.length == 0">
    <img src="../assets//kim.jpg"/>

  </div>
    <!-- <button v-on:click="show()">testt</button> -->
    <div v-if="!filtredCat.length == 0 " class="row">
      <div class="col-sm-4 h60" v-for="(cat,index) in filtredCat" :key="cat._id">
        <div class="card h-60 mb-4">
          <div class="card-image h">
            <img class="img-responsive" src="http://localhost:4000/uploads/Collection.jpg" />
            <span class="card-title">{{ cat.name }}</span>
          </div>
          <div class="card-action">
            <a>
                <img name="see" id="see" src="../assets/edit.png" v-on:click="update({ cat })" />
            </a>
            <a>
              <router-link :to="{name: 'Ouvrage', params: {categorie: cat}}">
                    <img name="see" id="see"
                    src="../assets//see.png"/>
                </router-link>
            </a>
             <a>
              <img name="see" id="see" src="../assets/delete.png"  v-on:click="deleteCat(cat._id,index)"/>
            </a>
          </div>
        </div>
      </div>
    </div>
      <footer>
        <a id="collection-button" name="collection-button">
          <img style="max-width: 70px; max-height: 100px;" src="../assets/add.png" v-on:click="show()"/>
        </a>
      </footer>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import router from "../router";
import CreateCat from "./CreateCat";
export default {
  props: ["collection"],
  data() {
    return {
      categories: [],
      search:''
    };
  },
  created: function() {
    this.fetchItems();
  },
  computed:{
    filtredCat: function(){
      return this.categories.filter((cat) =>{
        return cat.name.match(this.search)
      })
    }
  },

  methods: {
    fetchItems() {
      let uri =
        "http://localhost:4000/categories/getOne/" + this.collection._id;
      axios.get(uri).then(response => {
        this.categories = response.data.categories;
        console.log(this.categories);
      });
    },
    show() {
      this.$modal.show(
        CreateCat,
        {
          id: this.collection._id
        },
         {
          draggable: true
        },
        {
        'closed': (event) => { 
          let uri =
        "http://localhost:4000/categories/getOne/" + this.collection._id;
      axios.get(uri).then(response => {
        this.categories = response.data.categories;
        console.log("je suis la");
      }
      ); }
        }
      );
    },
    update(cat){
      
      console.log(cat)
        this.$modal.show(
        CreateCat,
        {
          id: this.collection._id,
          cat : cat
        },
        {
          draggable: true
        },
        {
        'closed': (event) => { let uri =
        "http://localhost:4000/categories/getOne/" + this.collection._id;
      axios.get(uri).then(response => {
        this.categories = response.data.categories;
        console.log(this.categories);
      }); }
        }
      );
    },
    deleteCat(id,index){
       this.$confirm("Are you sure?")
        .then(() => {
          axios
            .delete("http://localhost:4000/categories/delete/" + id)
            .then(res => {
              this.$alert(res.data);
            });
          this.categories.splice(index, 1);
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.card:hover {
  opacity: 0.7;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.23);
}

.card:hover #see {
  opacity: 1;
}

.card-action {
  margin-left: 20px;
}

#mid:hover {
  opacity: 1;
}

#see {
  padding-left: -5px;
  margin: 5px;
  max-width: 50px;
  max-height: 50px;
  opacity: 0;
}

#collection-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
}

#collection-button:hover {
  zoom: 1.2;
}

.card {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
*/ .card {
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 2px;
  background-clip: padding-box;
  max-height: 100px;
  min-width: 100px;
}

.card span.card-title {
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
}

.card .card-image {
  position: relative;
  overflow: hidden;
}

.card .card-image img {
  border-radius: 2px 2px 0 0;
  background-clip: padding-box;
  position: relative;
  /* z-index: -1; */
}

.card .card-image span.card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;
}

.card .card-content {
  padding: 16px;
  border-radius: 0 0 2px 2px;
  background-clip: padding-box;
  box-sizing: border-box;
}

.card .card-content p {
  margin: 0;
  color: inherit;
}

.card .card-content span.card-title {
  line-height: 48px;
}

.card .card-action {
  text-align: center;
  border-top: 1px solid rgba(160, 160, 160, 0.2);
  padding: 16px;
  text-align: center;
  padding-top: 100px;
}

.card .card-action a {
  color: black;
  margin-right: 16px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}

.card .card-action a:hover {
  color: #ffd8a6;
  text-decoration: none;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.23);
}
</style>