<template>
	<div>
		<form @submit.prevent="editMessage" class="text-form" @keydown.enter.ctrl="editMessage">
			<textarea v-model="message.text" :disabled="!isAuthenticated"></textarea>
			<div class="edit-options">
				<div class="cancel-edit" @click="cancelEdit">Cancel</div>
				<button class="save-edit" type="submit" :disabled="!isAuthenticated">Save Changes</button>
			</div>
		</form>
	</div>
</template>

<script>
import firebase from 'firebase'
import {db} from '~/plugins/firebase'

export default{
	props: ['message', 'channelId',],
	data(){
		return{

		}
	},
	computed: {
		isAuthenticated(){
			return this.$store.getters.isAuthenticated;
		},
		getUserInfo(){
			return this.$store.state.user;
		}
	},
	methods: {
		editMessage: function(){
			db.collection('channels').doc(this.channelId).collection('messages').doc(this.message.id).update({
				text: this.message.text,
				edited: true
			})
			.then(() => {
				this.$emit('cancel');
				//console.log("edited");
			})
			.catch((err) => {
				console.log(err);
			})
		},
		cancelEdit: function(){
			this.$emit('cancel');
		}
	}

}

</script>

<style scoped>
.input-layout{
  height: 10%;
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
.edit-options{
	display: flex;
	margin: 5px 0;
}
.cancel-edit{
	cursor: pointer;
	padding: 4px 10px;
	border: solid 1px #595959;
	border-radius: 4px;
}
.save-edit{
	background-color: #007a5a;
	color: #fff;
	padding: 4px 10px;
	border-radius: 4px;
	margin-left: 5px;
}
</style>