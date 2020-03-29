<template>
    <nuxt-link
        :to="`/channels/${channelId}/thread/${message.id}`"
    >
        <div class="reply-bar">
            <div class="reply-bar-icons">
                <img
                    v-for="(user, key) in replyUsers"
                    :key="key"
                    :src="user"
                >
            </div>
            <p class="reply-bar-count">{{message.replyCount}}件のリプライ</p>
            <P class="reply-bar-latest">最新のリプライ：{{lastReply}}</P>
        </div>
    </nuxt-link>
</template>

<script>
import Vue from 'vue'
export default {
    props: ['message'],
    data: function(){
        return{
            tsList: []
        }
    },
    computed: {
        lastReply(){
            for(var key in this.message.replys){
                this.tsList.push(this.message.replys[key].ts.seconds);
            }
            var latest = Math.max.apply(null, this.tsList);
            return (latest * 1000);
        },
        channelId(){
            return this.$store.state.channelInfo.id;
        },
        replyUsers(){
            var usersArray = {};
            for(var i = 0; i < this.message.replys.length; i++){
                if(!usersArray[this.message.replys[i].uid]){
                    usersArray[this.message.replys[i].uid] = this.message.replys[i].icon;  
                }
            }
            return usersArray;
        }
    }
}
</script>

<style>
.reply-bar{
    display: flex;
    align-items: center;
    padding-left: 55px;
}
.reply-bar-icons{
    height: 30px;
    margin-right: 5px;
}
.reply-bar-icons img{
    width: 30px;
    border-radius: 5px;
}
.reply-bar-count{
    color: #2570aa;
    margin-right: 10px;
}
.reply-bar-latest{
    color:#3e3e3e;
}
</style>