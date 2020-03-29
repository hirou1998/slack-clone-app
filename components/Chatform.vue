<template>
	<div class="input-container">
        <form 
			v-on:submit.prevent="sendMessage" 
			class="text-form" 
			v-on:keydown.enter.ctrl="sendMessage"
		>
        	<textarea 
				v-model="input" 
				:disabled="!isAuthenticated"
			>
			</textarea>
	        <button 
				class="type-1" 
				type="submit" 
				:disabled="!isAuthenticated"
			>
				SEND
			</button>
        </form>
      </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '~/plugins/firebase'

export default{
	props: ['channelId', 'replyMessageId', 'message'],
	data(){
		return{
			user: {
				name: "",
				icon: ""
			},
			input: ""
		}
	},
	computed: {
		isAuthenticated(){
			return this.$store.getters.isAuthenticated;
		},
		getUserInfo(){
			return this.$store.state.user;
		},
		newReplyCount(){
			return this.message[0].replyCount + 1;
		},
		newReplyUsers(){
			var current = this.message[0].replyUsers;
			if(current === undefined || current === null || current.length === 0){
				current = [this.getUserInfo.uid];
			}else{
				if(current.indexOf(this.getUserInfo.uid) != -1){
					current.push(this.getUserInfo.uid);
				}
			}
			return current;
		}
	},
	methods: {
		sendMessage: function(){
			if(!this.replyMessageId){
				db.collection('channels').doc(this.channelId).collection('messages').add({
					text: this.input,
					name: this.getUserInfo.displayName,
					icon: this.getUserInfo.photoURL,
					ts: firebase.firestore.Timestamp.now(),
					replyCount: 0,
					replyUsers: [],
					uid: this.getUserInfo.uid
				})
				.then(() => {
					this.input = ""
				}).catch((err) => {
					console.log(err)
				})
			}else{
				db.collection('channels').doc(this.channelId).collection('messages').add({
					text: this.input,
					name: this.getUserInfo.displayName,
					icon: this.getUserInfo.photoURL,
					ts: firebase.firestore.Timestamp.now(),
					parentMessageId: this.replyMessageId,
					uid: this.getUserInfo.uid
				})
				.then(() => {
					this.input = ""
					console.log(this.input);
				}).catch((err) => {
					console.log(err)
				});

				db.collection('channels').doc(this.channelId).collection('messages').doc(this.replyMessageId).update({
					replyCount: this.newReplyCount,
					replyUsers: this.newReplyUsers
				})
				.then(() => {
					console.log('successfully changed replyCount and replyUsers');
				})
				.catch((err) => {
					console.log(err)
				});
			}
		}
	},
	mounted(){
		//console.log(this.replyCount);
		//console.log(this.replyUsers);
	}
}
</script>

<style scoped>
.input-layout{
  height: 10%;
}
.text-form{
	display: flex;
}
.input-container{
  padding: 10px;
  height: 100%;
}
textarea{
  width: 100%;
  height: 100%;
  border: solid 1px;
  border-radius: 4px;
  padding: 5px;
  background-color: #eee;
}
</style>