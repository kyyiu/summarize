<template>
	<div>
		<h1>hello app</h1>
		<mt-button type="default" @click="show">hhh</mt-button>
		<router-link to="/aaa">ah</router-link>
		<router-link to="/ggg">gh</router-link>
		<router-view></router-view>
		<button type="button" class="mui-btn mui-btn-royal">
							紫色
						</button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {};
		},
		methods:{
			show(){
				Toast({
					message: 'toast',
					duration: 1500,
					position: 'top'
				})
			}
		}
	}
	
</script>

<style>
	
</style>