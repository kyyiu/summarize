import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import './index.less'

export default function Index2() {
	
	const [ title2, setTitle2 ] = useState('title2');
	
	useEffect(()=>{
		
	})
	
	const go2Index = () => {
		Taro.navigateTo({
			url: '/pages/index/index?title3=' +  title2 + '&other=oo'
		})
	} 
	
	const sty = {
		height: '100px',
		background: 'red',
	}
	
	const sonS = {
		height: '300px',
		background: 'rgba(0,0,0,.3)',
	}
	
	const go2Index_2 = () => {
		Taro.redirectTo({
			url: '/pages/index/index'
		})
	} 
	
	let t = 0;
	
	return (
		<View>
			<View>
				{
					[1,2,3].map(it=>{
						++t
						console.log(t)
						if(t<3){
							return (<View>{t}</View>)
						}
					})
				}
			</View>
			<Text>页面2</Text>
			<Button onClick={go2Index}>去index页面</Button>
			<Button onClick={go2Index_2}>去index页面,不能返回上一级页面</Button>
			<ScrollView onScroll={e=>console.log(e)} style={sty} scrollY>
				<View style={sonS}>342</View>
			</ScrollView>
		</View>
	)
	
}