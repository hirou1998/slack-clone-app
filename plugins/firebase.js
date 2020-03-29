import firebase from 'firebase/app' //firebase全般の機能を利用するため
import 'firebase/auth' //ログイン機能を使うため
import 'firebase/firestore' //データベース機能を使うため

if(!firebase.apps.length){
	const config = {
		apiKey: "AIzaSyAU4Yj0Gdu2wI1g3LrQVId2aB9kvE5-XSY",
		authDomain: "slack-clone-app-b3f70.firebaseapp.com",
		databaseURL: "https://slack-clone-app-b3f70.firebaseio.com",
		projectId: "slack-clone-app-b3f70",
		storageBucket: "slack-clone-app-b3f70.appspot.com",
		messagingSenderId: "1085616377499"
	}
	firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
	firebase,
	db
}