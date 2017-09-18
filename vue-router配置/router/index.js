import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '@/components/home'
import project from '@/components/project'
import doc from '@/components/doc'
import login from '@/components/login'

let router = new Router({
	mode:'history',
	routes: [
		{
			path: '/',//默认主页
			component: home
		},
		{
			path: '/project',
			component: project
		},
		{
			path: '/doc',
			component: doc
		},
		{
			path: '/login',
			component: login
		}
	]
})

export default router
