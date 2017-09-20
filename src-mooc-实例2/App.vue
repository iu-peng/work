<template>
	<div id="app">
		<transition name="custom-classes-transition"
		            enter-active-class="animated zoomInUp"
		            leave-active-class="animated zoomOutDown" mode="out-in">
		    <router-view></router-view>
		</transition>
	</div>
</template>


<style type="text/css">
	
</style>

<script>
	export default {
		methods:{
		}
	}
</script>