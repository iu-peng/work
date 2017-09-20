<template>
	<div>
		<h1>big</h1>
		<button @click="locationChange(0)">lisa1</button>
		<button @click="locationChange(1)">lisa2</button>
		<button @click="locationChange(2)">lisa3</button>
		<p>{{ $route.params.abc }}</p>
		<p>姓名:{{info.userName}}</p>
		<p>性别：{{info.sex}}</p>
		<p>年龄：{{info.age}}</p>
	</div>
</template>

<script>
	let data = [
		{
			userName:'lisa0',
			sex:'女',
			age:31
		},
		{
			userName:'lisa1',
			sex:'女',
			age:32
		},
		{
			userName:'lisa2',
			sex:'女',
			age:33
		}
	]
	export default {
		data(){
			return {
				info:{
					userName:'xx',
					sex:'xx',
					age:'xx'
				}
			}
		},
		watch:{
			$route(){
				let id = this.$route.params.abc
				if(data[id]){
					this.info = data[id]
				}
			}
		},
		mounted(){
			console.log(this.$route)
			let id = this.$route.params.abc
			if(data[id]){
				this.info = data[id]
			}
		},
		methods:{
			locationChange(id){
				this.$router.push({
					path:'/user/'+id
				})
			}
		}
	}
</script>

<style>
	p {
		font-size:30px;
	}
	button {
		width:100px;
		height:30px;
		font-size:20px;
	}
</style>
