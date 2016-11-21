<template>
	<div class="play">
		<div class="wrap" ref="ul">
			<ul v-for="(item,index) in items" 
			v-bind:style="{zIndex:item.zIndex,width:item.width + 'px',transitionDelay: index * 0.05 + 's',WebkitTransitionDelay: index * 0.05 + 's',transform:'rotateX(' + item.deg + 'deg)'}">
			<li v-for="i in 4" v-bind:style="{backgroundPosition:item.bgp + 'px'}"></li>
			<span></span>
			<span v-bind:style="{left:item.width + 'px'}"></span>
		</ul>
	</div>
	<div class="l_btn"><a href="javascript:;" v-on:click="l_fn">〈</a></div>
	<div class="r_btn"><a href="javascript:;" v-on:click="r_fn">〉</a></div>
	<h1>简单的轮播</h1>
</div>
</template>

<script>
	export default{
		data:function() {
			return {
				uls:"",
				wrap:"",
				items:[],
				len:'',
				ulWidth:25
			};
		},
		methods:{
			l_fn:function() {
				this.items.forEach(function(el,i) {
					el.deg -= 90
				});
			},
			r_fn:function() {
				this.items.forEach(function(el,i) {
					el.deg += 90
				});
			}
		},
		mounted:function() {
			this.len = this.$refs.ul.clientWidth / this.ulWidth;
			var zI = 0;
			for( var i = 0; i < this.len; i++ ){
				zI = (i < (this.len / 2)) ? (++zI) : (--zI);
				this.items.push({zIndex:zI,width: this.ulWidth,bgp:-this.ulWidth * i,deg:0})
			}
		}
	}
</script>

<style scoped>
	.play{
		min-width: 1570px;
		margin-left: 50px;
		margin-top: 50px;
		position: relative;
	}
	.play .wrap{
		position: relative;
		width: 1000px;
		height: 600px;
		margin: 0 auto;
		perspective:800px;
		-webkit-perspective:800px;
	}
	.play  .l_btn,.play  .r_btn{
		position: absolute;
		top: 300px;
		font-size: 50px;
	}
	.play  .l_btn:hover a,.play .r_btn:hover a{
		color:#fff;
	}
	.play  .l_btn{
		left: 100px;
	}
	.play  .r_btn{
		right: 100px;
	}
	.play h1{
		text-align: center;
		margin-top: 60px;
	}
	.play .wrap ul{
		position: relative;
		float: left;
		height: 600px;
		transform-style:preserve-3d;
		-webkit-transform-style:preserve-3d;
		transform-origin: center center -300px;
		-webkit-transform-origin: center center -300px;
		transition:0.4s;
		-webkit-transition:0.4s;
	}
	.play .wrap ul li{
		-webkit-background-size: auto 100%;
		background-size: auto 100%;
		background-repeat: no-repeat;
		position: absolute;
		height: 600px;
		width: inherit;
	}
	.play .wrap ul li:nth-of-type(1){
		background-image: url("../../assets/img1.jpg");
	}
	.play .wrap ul li:nth-of-type(2){
		background-image: url("../../assets/img2.jpg");
		top:-600px;
		transform-origin: bottom;
		-webkit-transform-origin: bottom;
		transform:rotateX(90deg);
		-webkit-transform:rotateX(90deg);
	}
	.play .wrap ul li:nth-of-type(3){
		background-image: url("../../assets/tree.jpg");
		transform:translateZ(600px) rotateX(180deg);
		-webkit-transform:translateZ(-600px) rotateX(180deg);
	}
	.play .wrap ul li:nth-of-type(4){
		background-image: url("../../assets/star.jpg");
		top: 600px;
		transform-origin: top;
		-webkit-transform-origin: top;
		transform:rotateX(-90deg);
		-webkit-transform:rotateX(-90deg);
	}
	.play .wrap ul span{
		height: 600px;
		width: 600px;
		position: absolute;
		background-color: #ccc;
		top: 0;
	}
	.play .wrap ul span:nth-of-type(1){
		left: 0;
		transform-origin: left;
		-webkit-transform-origin: left;
		transform:rotateY(90deg);
		-webkit-transform:rotateY(90deg);
	}
	.play .wrap ul span:nth-of-type(2){
		right: 0;
		transform-origin: left;
		-webkit-transform-origin: left;
		transform:rotateY(90deg);
		-webkit-transform:rotateY(90deg);
	}
</style>