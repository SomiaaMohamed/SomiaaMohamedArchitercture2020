<template>
    <div>
        <h1>Items</h1>

        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link to="/item" class="btn btn-primary">Create Item</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="(item,index) in items" :key="item._id">
                    <td>{{ item._id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td><router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger" v-on:click="deleteItem(item._id,index )">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
/* eslint-disable */
    export default {
        data(){
            return{
                items: []
            }
        },

        created: function()
        {
            this.fetchItems();
        },

        methods: {
            fetchItems()
            {
              let uri = 'http://localhost:4000/items';
              axios.get(uri).then((response) => {
                  this.items = response.data;
              });
            },
            deleteItem(id,index)
            {
                //console.log(index)
              let uri = 'http://localhost:4000/items/delete/'+id;
              this.items.splice(index, 1);
              axios.get(uri);
            }
        }
    }
</script>