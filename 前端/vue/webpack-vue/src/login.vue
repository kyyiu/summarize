<template>
	<div>
		<h1>hhhhh{{msg}}</h1>
	</div>
</template>


<script>
	export default {
		data(){
			//组件中的data必须是function
			return {
				msg: '123'
			};
		},
		methods:{
			show(){
				console.log('hello2')
			}
		}
	}
</script>


<style>
	
	
</style>