<template>
	<div class="chat-area">
	    <div class="chats-layout">
	      <messages 
	      	:messages="messages"
	      	:channelId="channelInfo.id"
			/>
	    </div>
	    <div class="input-layout">
	      <chat-form :channelId="channelInfo.id" />
	    </div>
  	</div>
</template>

<script>
import Messages from '~/components/Messages.vue'
import ChatForm from '~/components/Chatform.vue'
import firebase from 'firebase'
import Vue from 'vue'
import {db} from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default{
	props: ['channelInfo', 'messages'],
	data: function(){
		return{
			// messages: null,
			// messagesArray: {},
			// replysArray: {},
			// dataUpdated: false
		}
	},
	components: {
		Messages,
		ChatForm
	},
	computed: {
		currentMessages(){
			return this.$store.state.messages;
		}
	},
	methods: {
		...mapActions(['setMessages']),
	},
	mounted(){
		const channelId = this.$route.params.id;
	}
}
</script>

<style>
.chats-layout{
  overflow: scroll;
  height: 92.5%;
}
.channel-title{
	font-size: 22px;
	padding: 0 10px 10px;
	border-bottom: solid 1px;
	font-weight: bold;
	background-color: #c6c6c6;
}
</style>