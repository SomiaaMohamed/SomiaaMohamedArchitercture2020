<template>
  <div class="container">
    <!-- <input type="text" v-model="search" placeholder="search Ouvrage"/> -->
    <div class="form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text" class="form-control" v-model="search" placeholder="Search">
  </div>
  <!-- <div v-if="filtredOuv.length == 0">
    <img src="../assets//kim.jpg"/>

  </div> -->
      <div v-if="!filtredOuv.length == 0 " class="row">
    <div class="card" v-for="(ouv,index) in filtredOuv" :key="ouv._id">
      <div class="front" style="background-image: url(http://localhost:4000/uploads/livre.jpg);">
        <div class="messageBox" v-if="!ouv.prix">
          <h1 id="construction">This Book is coming soon!</h1>
        </div>
        <p style="color: black;">{{ ouv.titre }}</p>
      </div>
      <div class="back">
        <div>
          <p name="auteur" id="auteur">Written BY :</p>
          <h1 name="auteurName" id="auteurName"> {{ouv.auteur}}</h1>
              <p v-if="ouv.prix" name="auteur" id="auteur"> Price : {{ ouv.prix }}</p>
                <p v-if="!ouv.prix" name="auteur" id="auteur"> Comming soon</p>
          <a class="middle" name="mid" id="mid">
            <img name="see" id="see" src="../assets//edit.png" v-on:click="update({ ouv })"/>
          </a>
          <a class="middle" name="mid" id="mid">
            <img name="delete" id="delete" src="../assets//delete.png" v-on:click="deleteOuvrage(ouv._id,index)"/>
          </a>
        </div>
      </div>
      </div>
      </div>
    <footer>
        <router-link :to="{name: 'CreateOuvrage', params: {cat: categorie}}">
    <a  id="collection-button" name="collection-button">
        <img style="max-width: 70px; max-height: 100px;" src="../assets/add.png" /></a>
        </router-link>
</footer>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import router from "../router";
import CreateOuvrage from './CreateOuvrage'
export default {
  props: ["categorie"],
  data(){
      return{
          ouvrages: [],
          search:'',
      };
  },
  created: function(){
      this.fetchItems();
  },
    computed:{
    filtredOuv: function(){
      return this.ouvrages.filter((ouv) =>{
        return ouv.titre.match(this.search)
      })
    }
  },
  methods:{
      fetchItems(){
           let uri = "http://localhost:4000/ouvrages/getOne/"+this.categorie._id;
      axios.get(uri).then(response => {
        this.ouvrages = response.data;
        console.log(this.ouvrages)
      });
      },
      deleteOuvrage(id,index){
           this.$confirm("Are you sure?")
        .then(() => {
          axios
            .delete("http://localhost:4000/ouvrages/delete/" + id)
            .then(res => {
              this.$alert(res.data);
            });
          this.ouvrages.splice(index, 1);
        })
        .catch(err => {});
      },
      update(ouv){
               this.$modal.show(
        CreateOuvrage,
        {
          cat: this.categorie,
          ouv: ouv,
        },
        {
  height: 'auto',
}, 
        {
        'closed': (event) => { let uri =
        "http://localhost:4000/ouvrages/getOne/" + this.categorie._id;
      axios.get(uri).then(response => {
        this.ouvrages = response.data;
        console.log(this.ouvrages);
      });}
        },
         {
          draggable: true
        },
      );
      }
  }
};
</script> 

<style scoped>
.main {
    width: 50%;
    margin: 50px auto;
}

/* Bootstrap 4 text input with search icon */

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
.messageBox {
  background: red;
  padding-top: -50%;
  opacity: 0.4;
  border: #eee solid 2px;
  position: absolute;
  top: 95%;
  left: 50%;
  width: 100%;
  height: 12%;
  /* margin-right: -50%; */
  transform: translate(-50%, -50%);
  text-shadow: 0px 0px 8px #000;
  color: #fff;
}

#construction {
  font-family: "Pacifico", cursive;
  font-size: 15px;
}
#see {
  max-width: 50px;
  max-height: 50px;
}

#delete {
  max-width: 50px;
  max-height: 50px;
  margin-right: 10px;
}
#titre {
  text-transform: uppercase;
  font-size: 30px;
  color: black;
  position: relative;
  top: -100px;
  font-family: "Arial Black";
}
#auteur {
  font-size: 15px;
  color: black;
  position: relative;
  top: -85px;
  font-family: "Arial Black";
}
#auteurName {
  text-transform: uppercase;
  font-size: 20px;
  color: black;
  position: relative;
  top: -100px;
  font-family: "Arial Black";
  text-decoration: underline;
}
#collection-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
#collection-button:hover {
  zoom: 1.2;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}

.content {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
}

.heading {
  width: 100%;
  margin-left: 1rem;
  font-weight: 900;
  font-size: 1.618rem;
  text-transform: uppercase;
  letter-spacing: 0.1ch;
  line-height: 1;
  padding-bottom: 0.5em;
  margin-bottom: 1rem;
  position: relative;
}
.heading:after {
  display: block;
  content: "";
  position: absolute;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #1a9be6, #1a57e6);
  bottom: 0;
}

.description {
  width: 100%;
  margin-top: 0;
  margin-left: 1rem;
  margin-bottom: 3rem;
}

.card {
  color: inherit;
  cursor: pointer;
  width: calc(33% - 2rem);
  min-width: calc(33% - 2rem);
  height: 400px;
  min-height: 400px;
  perspective: 1000px;
  margin: 1rem;
  position: relative;
}
@media screen and (max-width: 800px) {
  .card {
    width: calc(50% - 2rem);
  }
}
@media screen and (max-width: 500px) {
  .card {
    width: 100%;
  }
}

.front,
.back {
  display: flex;
  border-radius: 6px;
  background-position: center;
  background-size: cover;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 600ms;
}

.front {
  background-size: cover;
  padding: 2rem;
  font-size: 1.618rem;
  font-weight: 600;
  color: #fff;
  overflow: hidden;
  font-family: Poppins, sans-serif;
}
.front:before {
  position: absolute;
  display: block;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a9be6, #1a57e6);
  opacity: 0.25;
  z-index: -1;
}
.card:hover .front {
  transform: rotateY(180deg);
}
.card:nth-child(even):hover .front {
  transform: rotateY(-180deg);
}

.back {
  background: #fff;
  transform: rotateY(-180deg);
  padding: 0 2em;
}
.back .button {
  background: linear-gradient(135deg, #1a9be6, #1a57e6);
}
.back .button:before {
  box-shadow: 0 0 10px 10px rgba(26, 87, 230, 0.25);
  background-color: rgba(26, 87, 230, 0.25);
}
.card:hover .back {
  transform: rotateY(0deg);
}
.card:nth-child(even) .back {
  transform: rotateY(180deg);
}
.card:nth-child(even) .back .button {
  background: linear-gradient(135deg, #e61a80, #e61a3c);
}
.card:nth-child(even) .back .button:before {
  box-shadow: 0 0 10px 10px rgba(230, 26, 60, 0.25);
  background-color: rgba(230, 26, 60, 0.25);
}
.card:nth-child(even):hover .back {
  transform: rotateY(0deg);
}

.button {
  transform: translateZ(40px);
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-weight: bold;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 100px;
  font: inherit;
  border: none;
  position: relative;
  transform-style: preserve-3d;
  transition: 300ms ease;
}
.button:before {
  transition: 300ms ease;
  position: absolute;
  display: block;
  content: "";
  transform: translateZ(-40px);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  border-radius: 100px;
  left: 10px;
  top: 16px;
}
.button:hover {
  transform: translateZ(55px);
}
.button:hover:before {
  transform: translateZ(-55px);
}
.button:active {
  transform: translateZ(20px);
}
.button:active:before {
  transform: translateZ(-20px);
  top: 12px;
}
</style>