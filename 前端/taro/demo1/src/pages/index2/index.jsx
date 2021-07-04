import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

export default function Index2() {
	
	const [ title2, setTitle2 ] = useState('title2');
	
	const go2Index = () => {
		Taro.navigateTo({
			url: '/pages/index/index?title3=' +  title2 + '&other=oo'
		})
	} 
	
	const go2Index_2 = () => {
		Taro.redirectTo({
			url: '/pages/index/index'
		})
	} 
	
	return (
		<View>
			<Text>页面2</Text>
			<Button onClick={go2Index}>去index页面</Button>
			<Button onClick={go2Index_2}>去index页面,不能返回上一级页面</Button>
		</View>
	)
	
}