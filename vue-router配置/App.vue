<template>
	<div id="app">
		<transition name="custom-classes-transition"
		            enter-active-class="animated zoomOutUp"
		            leave-class="animated zoomOutUp">
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