import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import layout from '@/components/layout'
import home from '@/components/home'
import doc from '@/components/doc'
import project from '@/components/project'
import login from '@/components/login'
import user from '@/components/user'
/*import Big from '@/components/big'*/

let router = new VueRouter({
	mode:'history',
	routes:[
		{path:'/',component:home,name:'home',alias:'/haha'},
		{
			path:'/layout',
			component:layout,

			children:[
				{
					path:'',
					component:{name:'project'}
				},
				{
					path:'/project',//地址栏只有一个后缀地址，不加/会有一串后缀
					name:'project',
					component:project
				},
				{
					path:'/doc',
					name:'doc',
					component:doc,
					/*beforeEnter(to,from,next){
						next(false)
					},*///路由内钩子
				},
				{
					path:'/login',
					name:'login',
					component:login
				},
				{
					path:'/user/:abc',
					name:'user',
					component:user
				}
			]
		}
		/*{path:'/doc',component:doc},
		{
			path:'/project',
			component:project,

			children:[
				{path:'big',component:Big}
			]
		},
		{path:'/login',component:login}*/
		// {path:'*',component:notfound},//定向到404页面
		//{path:'*',redirect:'/'}//如果路径匹配不到直接重定向到首页
		//{path:'*',redirect:{name:'home'}},//如果路径匹配不到直接重定向到首页--路径可以定一个name，从而调用

		//条件重定向
		/*{path:'*',redirect:(to)=>{
			if(to.path === '/abc'){
				return '/'//到主页
			}else if(to.path === 'ab'){
				return '/doc'
			}else{
				return '/haha'
			}
		}}*/
	]
})

router.beforeEach((to,from,next)=>{//全局钩子
	//next(false)//不写next()或写了但是参数为false，不进行渲染
	//next('/project')
	next()
})

export default router