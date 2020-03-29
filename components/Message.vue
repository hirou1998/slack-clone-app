<template>
  <div>
  	<div 
	  	class="chat-container" 
		v-on:mouseover="showOptions"
		v-on:mouseleave="hideOptions"
	>
	    <message-content
			:message="message"
			v-if="!nowEdit" 
		/>
		<reply-bar
			:message="message"
			v-if="message.replyCount > 0"
		/>
	    <edit-form
			:message="message"
			:channelId="channelId"
			v-if="nowEdit"
			@cancel="closeEditArea"
		/>
	    <div 
			class="chat-options"
			v-if="mouseovered && !nowEdit"
		>
	  	  <nuxt-link
			v-bind:to="`/channels/${channelId}/thread/${message.id}`"
		  >
	  	  	<p class="chat-option-item">Reply</p>
	  	  </nuxt-link>
	  	  <p class="chat-option-item" @click="favoriteMessage">Favorite</p>
	  	  <p class="chat-option-item" @click="editMessage">Edit</p>
	    </div>
	  </div>
  </div>
</template>

<script>
import EditForm from '~/components/EditForm.vue'
import ChatForm from '~/components/Chatform.vue'
import MessageContent from '~/components/MessageContent.vue'
import ReplyBar from '~/components/ReplyBar.vue'
import {db} from '~/plugins/firebase'
import firebase from 'firebase'
import Vue from 'vue'
import { mapActions } from 'vuex'

export default{
	props: ['message', 'channelId', 'index'],
	components: {
		EditForm,
		ChatForm,
		MessageContent,
		ReplyBar
	},
	data(){
		return{
			mouseovered: false,
			nowEdit: false
		}
	},
	computed: {
		displayName(){
			return "@" + this.message.name
		},
		getUserInfo(){
			return this.$store.state.user
		},
		isAuthenticated(){
			return this.$store.getters.isAuthenticated;
		}
	},
	methods: {
		...mapActions(['setThreadStart']),
		showOptions: function(){
			this.mouseovered = true
		},
		hideOptions: function(){
			this.mouseovered = false
		},
		closeReplyArea: function(){
			this.replyArea = false
		},
		favoriteMessage: function(){
			console.log('fav');
			// if(!this.isAuthenticated){
			// 	return
			// }
			// db.collection('channels').doc(this.channelId).collection('messages').doc(this.message.id).collection('favorites').add({
			// 	name: this.getUserInfo.displayName,
			// 	icon: this.getUserInfo.photoURL
			// })
			// .then(() => {
			// 	alert('you liked a message')
			// })
			// .catch((err) => {
			// 	console.log(err)
			// })
		},
		editMessage: function(){
			this.nowEdit = true;
		},
		closeEditArea: function(){
			this.nowEdit = false;
		}
	}
}
</script>

<style scoped>
.chat-container{
  position: relative;
}
.chat-options{
	display: flex;
	align-items: flex-end;
	position: absolute;
	top: 0;
	right: 0;
}
.chat-option-item{
	cursor: pointer;
	padding: 0 5px;
}
.reply-area{
	display: flex;
}
.reply-area-close{
	cursor: pointer;
}
</style>