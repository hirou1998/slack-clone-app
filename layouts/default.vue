<template>
  <div class="app-layout">
    <div class="sidebar">
      <div v-if="isAuthenticated" class="user-info-block">
        <img :src="getUserInfo.photoURL" class="user-icon">
        <p class="user-name">{{ getUserInfo.displayName }}</p>
      </div>
      <p class="sidebar-title sidebar-default-sentence">
        Channels<span class="create-channel-button" @click="createChannel">+</span>
      </p>
      <p class="sidebar-channel-name sidebar-default-sentence" v-for="channel in channels">
        <nuxt-link v-bind:to="`/channels/${channel.id}`" class="to-channel-nav">
            <span v-if="channel.private">?</span>
            <span v-else>#</span>
            {{channel.name}}
        </nuxt-link>
      </p>
      <div class="login-logout-btn" v-if="!isAuthenticated" v-on:click="openLoginModal">
        <p>Sign In here</p>
      </div>
      <div class="login-logout-btn" v-else v-on:click="signOut">
        <p>Sign Out here</p>
      </div>
    </div>
    <el-dialog
      :visible.sync="SignIndialogVisible"
      width="30%">
      <div class="sign-in-modal-content">
        <img src="~/assets/google_sign_in.png" @click="signIn">
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="createChanneldialogVisible"
      width="50%">
      <create-channel
        @close="closeCreateChannelModal">
      </create-channel>
    </el-dialog>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import {db} from '~/plugins/firebase'
import firebase from 'firebase'
import Vue from 'vue'
import { mapActions } from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CreateChannel from '~/components/CreateChannel.vue'
Vue.use(ElementUI)

export default {
  components: {
      CreateChannel
  },
  data(){
    return {
      channels: [],
      SignIndialogVisible: false,
      createChanneldialogVisible: false
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
    ...mapActions(['setUser']),
    openLoginModal: function(){
      this.SignIndialogVisible = true;
    },
    openCreateChannelModal: function(){
      this.createChanneldialogVisible = true;
    },
    signIn: function(){
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setUser(user)
        this.SignIndialogVisible = false
      })
    },
    signOut: function(){
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null);
        }).catch((err) => {
          console.log(err);
        })
    },
    createChannel: function(){
      if(!this.isAuthenticated){
        alert('Please Sign In');
        return
      }else{
        this.createChanneldialogVisible = true;
      }
    },
    closeCreateChannelModal: function(){
      this.createChanneldialogVisible = false;
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setUser(user);
        db.collection('profiles').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    })
    db.collection('channels')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc;
          if(change.type == 'added'){
            this.channels.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
      })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    resize: none;
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
}
button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.app-layout{
  display: flex;
}
.sidebar{
  width: 300px;
  background-color: #009380;
  height: 100vh;
  padding: 20px;
  position: relative;
}
.main-content{
  width: 100%;
  background-color: #f1f1f1;
  height: 100vh;
}
.sidebar-default-sentence{
  color: #dddddd;
  margin-top: 5px;
  position: relative;
}
.create-channel-button{
    border: solid 2px #fff;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding: 0 0px 4px 0px;
    position: absolute;
    top: 0;
    right: 0;
}
.login-logout-btn{
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translate(-50%, 0);
  border: solid 2px;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  width: 150px;
}
.login-logout-btn p{
  font-weight: bold;
  text-align: center;
}
.user-info-block{
  display: flex;
  margin: 10px 0;
  align-items: center;
}
.user-icon{
  width: 40px;
  border-radius: 5px;
  margin-right: 5px;
}
.user-name{
  font-size: 16px;
}
.sign-in-modal-content{
  text-align: center;
}
.sign-in-modal-content img{
  width: 70%;
  cursor: pointer;
}
.to-channel-nav{
  text-decoration: none;
  color: #fff;
}
</style>
