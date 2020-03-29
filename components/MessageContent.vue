<template>
	<div>
		<div class="message-content">
			<div class="icon-block">
			<img v-bind:src="message.icon">
			</div>
			<div class="message-block">
			<p class="user-name">{{ displayName }}</p>
			<p>{{message.text}}</p>
			<p class="show-edited">{{ showEdited }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props: ['message'],
	computed: {
		displayName(){
			return "@" + this.message.name;
		},
		sentTime(){
			return this.message.st.toDate();
		},
		showEdited(){
			if(this.message.edited === true){
				return "(edited)";
			}else{
				return null
			}
		}
	},
	mounted(){
		//console.log(this.message);
	}
}
</script>

<style>
.message-content{
	display: flex;
	margin: 10px 0;
}
.icon-block{
  width: 40px;
  height: 4	0px;
  margin-right: 16px;
}
.icon-block img{
  width: 100%;
  border-radius: 10px;
}
.message-block{
	position: relative;
}
.user-name{
  font-weight: bold;
}
.show-edited{
	color: #595959;
	position: absolute;
	bottom: 0;
	right: -20px;
	transform: translate(100%, 0);
}
</style>