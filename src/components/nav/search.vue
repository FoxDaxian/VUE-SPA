<style scoped lang="scss">
	.wrap{
		height: 200px;
		line-height:200px;
		font-size: 0;
		margin-top: 200px;
		.input{
			margin-left: 500px;
			width: 536px;
			height: 40px;
			padding:9px 7px;
			font:16px arial;
			border:1px solid #b8b8b8;
			border-right:0;
			outline:none;
			box-shadow:none;
			box-sizing:border-box;
		}
		.btn{
			display: inline-block;
			cursor:pointer;
			width:102px;
			height: 38px;
			line-height: 38px;
			text-align: center;
			background-color: #38f;
			font-size: 16px;
			color:#fff;
			&:hover{
				background-color: #2868c8;
			}
		}
	}
</style>

<template>
	<div class="wrap">
		<input type="text" class="input" v-model="data" ref="input" @keyup.enter="search">
		<span @click="search" class="btn">续一秒</span>
	</div>
</template>

<script>
	export default{
		data:function() {
			return {
				data:""
			};
		},
		methods:{
			search:function() {
				window.open("https://www.baidu.com/s?wd=" + this.data);
			}
		},
	}
</script>