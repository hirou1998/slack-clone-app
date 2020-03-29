<template>
  <div>
  	  <p class="channel-title">{{ displayChannelName }}</p>
	  <div class="container">
	  	<chat-area
	  		:channelInfo="channelInfo" 
			:messages="messageArrayWithReplys"
		/>
	  </div>
  </div>
</template>

<script>
import ChatArea from '~/components/ChatArea.vue'
import firebase from 'firebase'
import {db} from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default{
  components: {	
      ChatArea
  },
  data(){
  	return {
  		channelInfo: {
  			id: null,
  			name: null,
  			private: false,
  			description: null
		},
		messagesArray: [],
		replysArray: []
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
			for(var i = 0; i < this.replysArray.length; i++){
				for(var j = 0; j < this.messagesArray.length; j++){
					if(this.replysArray[i].parentMessageId === this.messagesArray[j].id){
						this.messagesArray[j].replys.push(this.replysArray[i]);
					}
				}
			}
			return this.messagesArray;
		}
	},
  methods: {
	...mapActions(['setChannelInfo']),
  },
  mounted(){
	console.log(location.href);
	const channelId = this.$route.params.id;
	this.messagesArray = [];
	this.replysArray = [];

	db.collection('channels').doc(channelId).collection('messages').orderBy("ts")
		.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				const doc = change.doc;
				if(change.type === 'added'){
					console.log('added ' + doc.id + ' channel-------');
					if(!doc.data().parentMessageId){
						this.messagesArray.push({
							id: doc.id,
							...doc.data(),
							replys: []
						})
					}else{
						this.replysArray.push({
							id: doc.id,
							...doc.data(),
							replys: []
						})
					}
				}else if(change.type === 'modified'){
					console.log(doc.id + ' channel-------');
				}
			})
		})
	
  	db.collection('channels').doc(channelId).get()
  		.then((doc) => {
			this.channelInfo.id = channelId,
  			this.channelInfo.name = doc.data().name;
  			this.channelInfo.private = doc.data().private;
			this.channelInfo.description = doc.data().description;
			this.setChannelInfo(this.channelInfo);
  		})		

  }
}
</script>

<style scoped>
.container{
	height: 94vh;
}
</style>