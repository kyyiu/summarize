// namespace Home{
// 	class Header {
// 		constructor(){
// 			const ele = document.createElement('div');
// 			ele.innerText = 'this is header';
// 			document.body.appendChild(ele)
// 		}
// 	}
// 	class Content {
// 		constructor(){
// 			const ele = document.createElement('div');
// 			ele.innerText = 'this is content';
// 			document.body.appendChild(ele)
// 		}
// 	}
// 	class Footer {
// 		constructor(){
// 			const ele = document.createElement('div');
// 			ele.innerText = 'this is footer';
// 			document.body.appendChild(ele)
// 		}
// 	}
// 	export class Page{
// 		constructor(){
// 			new Header();
// 			new Content();
// 			new Footer();
// 		}
// 	}
// }

namespace Home {
	export class Page {
		constructor(){
			new Components.Header();
			new Components.Content();
			new Components.Footer();
		}
	}
}