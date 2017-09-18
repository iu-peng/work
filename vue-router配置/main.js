import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import '@/assets/css/app.css'

new Vue({
	el:'#app',
	router:router,
	template:'<App/>',
	components:{
		App
	}
})
