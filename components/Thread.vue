<template>
	<div class="thread-container">
		<p class="thread-title">Thread<span class="thread-channel-name">{{displayChannelName}}</span></p>
		<div class="close-thread">
			<nuxt-link :to="`/channels/${channelInfo.id}`" class="close-thread-button">×</nuxt-link>
		</div>
		<div class="thread-message-block">
			<template v-for="message in selectedMessage">
				<message-content
				:message="message"
				:key="message.id" />
			</template>
			<!-- <p>{{countReplys}}</p> -->
			<div class="reply-area">
				<template v-for="message in selectedMessage">
					<message-content
						v-for="reply in message.replys"
						:message="reply"
						:key="reply.id"
					/>
				</template>
			</div>
		</div>
		<div class="input-layout">
			<chat-form
				:channelId="channelInfo.id"
				:replyMessageId="messageId"
				:message="selectedMessage"
			/>
		</div>
	</div>
</template>

<script>
import MessageContent from '~/components/MessageContent.vue'
import ChatForm from '~/components/Chatform.vue'
import {db} from '~/plugins/firebase'
import Vue from 'vue'
export default{
	props: ['selectedMessage', 'messageId', 'selected'],
	components: {
		MessageContent,
		ChatForm
	},
	data(){
		return{
			message: {
				id: 777,
				icon: null,
				name: null,
				replyCount: null,
				replyUsers: undefined,
				text: null,
				ts: undefined,
				replys: undefined
			}
		}
	},
	computed: {
		displayChannelName(){
			if(this.channelInfo.private == true){
	  			return "?" + this.channelInfo.name
	  		}else{
	  			return "#" + this.channelInfo.name
	  		}
		},
		channelInfo(){
			return this.$store.state.channelInfo;
		},
		countReplys(){
			return this.selectedMessage[0].replyCount;
		}
	},
	mounted(){
	
	}
}
</script>
<style>
.thread-title{
	font-size: 22px;
	padding: 0 10px 10px;
	border-bottom: solid 1px;
	font-weight: bold;
	background-color: #c6c6c6;
}
.thread-channel-name{
	font-weight: normal;
	font-size: .7em;
	display: block;
}
.reply-area{
	margin: 20px 0;
}
.thread-container{
	padding: 0 10px;
	position: relative;
}
.thread-message-block{
	height: 79vh;
	overflow-y: scroll;
}
.close-thread{
	position: absolute;
	top: 10px;
	right: 30px;
}
.close-thread-button{
	text-decoration: none;
	font-size: 20px;
	font-weight: bold;
	color: #000;
}
</style>