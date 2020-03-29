<template>
	<div class="create-channel-container">
		<p class="create-channel-title">Create a Channel</p>
		<form v-on:submit.prevent="executeCreateChannel">
			<div class="create-channel-item-block">
				<p>Channel Name</p>
				<input type="text" name="channel-name" v-model="channelName" required>
			</div>
			<div class="create-channel-item-block">
				<p>Channel description</p>
				<textarea v-model="channelDescription" placeholder="if you want"></textarea>
			</div>
			<div class="create-channel-item-block">
				<p>Make this private?</p>
				<el-switch v-model="isPrivate"></el-switch>
			</div>
			<button type="submit" class="type-1 create-button">Create</button>
		</form>
	</div>
</template>

<script>
import {db} from '~/plugins/firebase'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default{
	data(){
		return {
			isPrivate: false,
			channelName: null,
			channelDescription: null
		}
	},
	methods: {
		executeCreateChannel: function(){
			db.collection('channels').add({
				name: this.channelName,
				description: this.channelDescription,
				private: this.isPrivate
			})
			.then(() => {
				this.$emit('close');
			})
			.catch((err) => {
				console.log(err);
			})
		}
	}
}
</script>

<style>
.create-channel-container{
	position: relative;
	padding: 10px 30px;
}
textarea{
  width: 100%;
  height: 100%;
  border: solid 1px;
  border-radius: 4px;
  padding: 5px;
  background-color: #eee;
}
.type-1{
	background-color: #c6c6c6;
	font-weight: bold;
	border-radius: 4px;
	padding: 5px;
	font-size: 20px;
	color: #5d5d5d;
}
.create-button{
	position: absolute;
	bottom: 0;
	right: 0;
}
.create-channel-title{
	font-size: 40px;
	margin-bottom: 40px;
	font-weight: bold;
}
.create-channel-item-block{
	margin: 20px auto;
}
</style>