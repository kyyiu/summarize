// import { Component } from 'react'
import { useState, useEffect } from 'react'
// 获取router
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
// 引入子组件
import Son from './son.jsx'
// 引入图片，不然直接引入(使用src属性)会找不到文件
import pic from '../../static/111.jpg'

// export default class Index extends Component {

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <Text>Hello world!</Text>
//       </View>
//     )
//   }
// }


// 使用hooks
function Index() {
	const list = [
		{ id: 1, name: 'z1'},
		{ id: 2, name: 'z2'},
		{ id: 3, name: 'z3'},
		{ id: 4, name: 'z4'},
	]
	const [ userName, setUserName ] = useState('hooks');
	const [ title, setTitle ] = useState('');
	const [ article, setArticle ] = useState([])
	
	// getCurrentInstance().router 和 useRouter 返回的内容也一样
	// const router = useRouter()
	
	useEffect(()=>{
		// console.log(getCurrentInstance().router.params)
		setTitle(getCurrentInstance().router.params.title3);
		Taro.request({
			url: 'https://apiblog.jspang.com/default/getArticleList'
		}).then(res=>{
			console.log(res.data);
			setArticle(res.data.list);
		})
	}, [])
	
	return (
		<View>
			<Text>{ userName }</Text>
			<Son por={ userName }/>
			<View>{ title }</View>
			<Image src={ pic }  width="100px"/>
			{/*也可以使用require*/ }
			<Image src={ require('../../static/111.jpg') } width="100px"/>
			<View>
				{
					list.map((item, index)=>{
						return (
							<View key={ item.id }> { item.name } </View>
						)
					})
				}
				{
					article.map((item, index) => {
						return(
							<View key={index}>{item.title}</View>
						)
					})
				}
			</View>
		</View>
	)
}

export default Index;