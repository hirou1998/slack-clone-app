//import createPersistedState from "vuex-persistedstate";
export const strict = false;

export const state = () => ({
	user: null,
	threadStart: {
		id: null,
		icon: null,
		name: null,
		text: null
	},
	channelInfo: {
		id: null,
		name: null,
		description: null,
		private: false
	},
	messeges: null,
	selectedMessage: null
});

export const getters = {
	isAuthenticated(state){
		return !!state.user
	}
};

export const mutations = {
	setUser(state, user){
		state.user = user;
	},
	setThreadStart(state, threadStart){
		state.threadStart = threadStart;
	},
	setChannelInfo(state, channelInfo){
		state.channelInfo = channelInfo;
	},
	setMessages(state, messages){
		state.messages = messages;
	},
	setSelectedMessage(state, selectedMessage){
		state.selectedMessage = selectedMessage;
	}
};

export const actions = {
	setUser(context, user){
		context.commit('setUser', user);
	},
	setThreadStart(context, threadStart){
		context.commit('setThreadStart', threadStart);
	},
	setChannelInfo(context, channelInfo){
		context.commit('setChannelInfo', channelInfo);
	},
	setMessages(context, messages){
		context.commit('setMessages', messages)
	},
	setSelectedMessage(context, selectedMessage){
		context.commit('setSelectedMessage', selectedMessage);
	}
};