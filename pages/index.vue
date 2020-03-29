<template>
  <div class="container">
  	<div v-if="isAuthenticated" class="user-info-block">
	    <img :src="user.icon" class="user-icon">
	    <p class="user-name">{{ user.name }}</p>
	  </div>
	  <p v-else>No user sign in</p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default{
	data(){
		return{
			user:[]
		}
	},
	computed: {
	    isAuthenticated(){
	      return this.$store.getters.isAuthenticated
	    }
	  }
}
</script>