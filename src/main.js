import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

//使用vue-router
Vue.use(VueRouter);
//使用vue-resource
Vue.use(VueResource);

//引入主组件
import App from './App';

//引入nav组件
import introduce from 'components/nav/introduce';
import play from 'components/nav/play';
import tips from 'components/nav/tips';
import writingBoard from 'components/nav/writingBoard';
import search from 'components/nav/search';
import todolist from 'components/nav/todolist';
import nav from 'components/nav/nav';
import slider from 'components/nav/bilibili_slider';


var router = new VueRouter({
	mode:"history",
	routes:[{
		path:"/",
		name:"intro",
		component:introduce
	},{
		path:"/play",
		name:"play",
		component:play
	},{
		path:"/tips",
		name:"tips",
		component:tips
	},{
		path:"/writingBoard",
		name:"writingBoard",
		component:writingBoard
	},{
		path:"/search",
		name:"search",
		component:search
	},{
		path:"/todolist",
		name:"todolist",
		component:todolist
	},{
		path:"/nav",
		name:"nav",
		component:nav
	},{
		path:"/slider",
		name:"slider",
		component:slider
	}]
});
router.beforeEach(function(to,from,next) {
	if( to.params.title ){
		document.title = to.params.title;
	}else{
		document.title = "自我介绍";
	}
	next();
});
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});  
