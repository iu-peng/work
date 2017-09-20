<template>
	<div>
		<lay-header></lay-header>
		<transition name="custom-classes-transition"
		            enter-active-class="animated zoomInUp"
		            leave-active-class="animated zoomOutDown" mode="out-in">
		    <router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import layHeader from '@/components/header'
	export default {
		components:{
			layHeader
		}
	}
</script>