<template>
	<div>
		<p class="channel-title">{{ displayChannelName }}</p>
		<div class="container">
			<chat-area 
				:messages="messageArrayWithReplys[0]"
		  		:channelInfo="channelInfo"
			/>
			<!-- {{messagesArray[messageId]}} -->
		  	<thread
		  		:selectedMessage="messageArrayWithReplys[1]"
				:messageId="messageId"
				:selected="selectedNum"
		  		class="thread-area" />
	  	</div>
	</div>
</template>

<script>
 import ChatArea from '~/components/ChatArea.vue'
 import Thread from '~/components/Thread.vue'
 import {db} from '~/plugins/firebase'
 import Vue from 'vue'
 import { mapActions } from 'vuex'
export default{
	components: {
		ChatArea,
		Thread
	},
	data(){
		return{
			channelInfo: {
				id: null,
				name: null,
				private: false,
				description: null
			},
			messageId: null,
			messagesArray: [],
			replysArray: [],
			selectedNum: undefined,
			selectedMessage: [],
			messageIdArray: [],
			replyFlg: false
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
		messageArrayWithReplys(){
			if(!this.replyFlg){
				for(var i = 0; i < this.replysArray.length; i++){
				//console.log('i: ' + i);
					if(this.replysArray[i].parentMessageId === this.selectedMessage[0].id){
						this.selectedMessage[0].replys.push(this.replysArray[i]);
					}
					for(var j = 0; j < this.messagesArray.length; j++){
						//console.log('j: ' + j)
						if(this.replysArray[i].parentMessageId === this.messagesArray[j].id){
							//console.log('hit')
							this.messagesArray[j].replys.push(this.replysArray[i]);
							break
						}
					}
				}
			}else{
				var lastReply = this.replysArray[this.replysArray.length - 1];
				for(var i = 0; i < this.messagesArray.length; i++){
					if(this.messagesArray[i].id === lastReply.parentMessageId){
						this.messagesArray[i].replys.push(lastReply);
					}
				}
			}
			//console.log('new array was created');
			return [this.messagesArray, this.selectedMessage];
		}
	},
	methods: {
		...mapActions(['setMessages']),
		...mapActions(['setChannelInfo']),
		...mapActions(['setSelectedMessage'])
	},
	mounted(){
		const messageId = this.$route.params.id;
		const channelId = this.$route.params.channels;
		this.messageId = messageId;
		this.messagesArray = [];
		this.replysArray = [];

		db.collection('channels').doc(channelId).collection('messages').orderBy("ts")
		.onSnapshot((snapshot) => {
			if(snapshot.docChanges().length === 1){
				this.replyFlg = true;
			}else{
				this.replyFlg = false;
			}
			snapshot.docChanges().forEach((change) => {
				const doc = change.doc;
				//console.log(doc);
				if(change.type === 'added'){
					//console.log('added ' + doc.id + ' thread-------');
					if(!doc.data().parentMessageId){
						if(doc.id === messageId){
							this.selectedMessage.push({
								id: doc.id,
								...doc.data(),
								replys: []
							});
							this.messagesArray.push({
								id: doc.id,
								...doc.data(),
								replys: []
							})
						}else{
							this.messagesArray.push({
								id: doc.id,
								...doc.data(),
								replys: []
							})
						}
					}else{
						this.replysArray.push({
							id: doc.id,
							...doc.data(),
							replys: []
						})
					}
				if(this.messageIdArray.indexOf(doc.id) == -1){
					this.messageIdArray.push(doc.id);
				}
				}else if(change.type === 'modified'){
					//console.log('thread---modified' + doc.id)

				}
			})
		})
	
		db.collection('channels').doc(channelId).get()
			.then((doc) => {
				this.channelInfo.id = channelId;
				this.channelInfo.name = doc.data().name;
				this.channelInfo.private = doc.data().private;
				this.channelInfo.description = doc.data().description;
				this.setChannelInfo(this.channelInfo);
			})
	}
}
</script>

<style>
.container{
  height: 100%;
  display: flex;
}
.thread-area{
	flex: 1;
}
.chat-area{
	flex: 2.5;
}
</style>