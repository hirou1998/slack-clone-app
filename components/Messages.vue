<template>
	<div class="chats-container">
      <message 
	  	v-for="(message, index) in messages" 
		:message="message"  
		:channelId="channelId"
		:key="message.id"
		:index="index"
	  />
    </div>
</template>

<script>
import Message from '~/components/Message.vue'

export default{
	props: ['messages', 'channelId'],
	components: {
		Message
	},
	data: function(){
		return{
			selected: undefined
		}
	},
	methods: {
	}
}
</script>

<style scoped>
.chats-container{
  padding: 20px
}
</style>