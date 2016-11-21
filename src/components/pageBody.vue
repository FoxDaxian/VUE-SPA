<template>
	<div class="body">
		<div class="nav">
			<h3>导航</h3>
			<ul>
				<router-link v-for="(item,index) in items" :to="item" tag="li" class="router_li">
					<a 
					href="javascript:;" 
					v-text="item.params.title" 
					:class="{actived:num === index}" 
					ref="a"
					></a>
				</router-link>
			</ul>
		</div>
		<div class="view">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	export default{
		data:function() {
			return {
				items:[{
					name:'intro',
					params:{
						title:'自我介绍'
					}
				},{
					name:'play',
					params:{
						title:'轮播图'
					}
				},{
					name:'tips',
					params:{
						title:'自定义提示框'
					}
				},{
					name:"writingBoard",
					params:{
						title:"写字板"
					}
				},{
					name:"search",
					params:{
						title:"腾百阿度"
					}
				},{
					name:"todolist",
					params:{
						title:"待办事项"
					}
				},{
					name:"nav",
					params:{
						title:"哔哩哔哩nav"
					}
				},{
					name:"slider",
					params:{
						title:"失败的哔哩哔哩nav_slider Orz..."
					}
				}],
				num:0
			};
		},
		mounted:function() {
			var _this = this;
			this.$refs.a.forEach(function(el,index) {
				el.onclick = function() {
					_this.num = index;
				}
			});
		}
	}
</script>

<style scoped>
	.actived{
		color:#fff;
	}
	.body{
		height: calc(100vh - 100px);
		background-color: #95D0DE;
	}
	.body .nav{
		margin:50px 0;
		width: 250px;
		float: left;
		height: calc(100% - 100px);
		border-right:1px solid #000;
		box-sizing: border-box;
	}
	.body .nav h3{
		text-align: center;
		margin-top: 20px;
		margin-bottom: 50px;
		font-size: 30px;
		color:#fff;
		text-shadow: 1px 1px 5px #888888,
		2px 2px 5px #888888,
		3px 3px 5px #888888,
		4px 4px 5px #888888;
	}
	.body .nav ul{
		width: 150px;
		margin:0 auto;
	}
	.body .nav ul .router_li{
		border-bottom:1px solid #000;
		text-align: center;
		padding:10px 0;
	}
	.body .nav ul .router_li a{
		font-size: 18px;
	}
	.body .nav ul .router_li a:hover{
		color:#fff;
	}
	.body .view{
		width: calc(100vw - 267px);
		float: left;
		height: 100%;
		box-sizing: border-box;
		padding:50px 0;
	}
	.fade-enter{
		transform: translate(2000px);
	}
	.fade-leave{
		transform: translate(0px);
	}
	.fade-enter-active {
		animation: bounce-in 0.7s;
	}
	.fade-leave-active {
		animation: bounce-out 0.7s;
	}
	@keyframes bounce-in {
		0% {
			transform: translate(2000px);
		}
		50% {
			transform: translate(-50px);
		}
		100% {
			transform: translate(0);
		}
	}
	@keyframes bounce-out {
		0% {
			transform: translate(0px);
		}
		50% {
			transform: translate(-50px);
		}
		100% {
			transform: translate(2000px);
		}
	}
</style>