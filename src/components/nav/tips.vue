<template>
	<div class="tips_wrap">
		<div @click="l_add" class="btns">从左边出来</div>
		<div @click="r_add" class="btns">从右边出来</div>
		<div @click="t_add" class="btns">从上边出来</div>
		<div @click="b_add" class="btns">从下边出来</div>
		<transition-group name="l_list" tag="div" v-on:after-enter="afterEnter" class="l_div">
			<div v-for=" item in l_items " :key="item" class="block">提示{{item}}</div>
		</transition-group>
		<transition-group name="r_list" tag="div" v-on:after-enter="afterEnter" class="r_div">
			<div v-for=" item in r_items " :key="item" class="block">提示{{item}}</div>
		</transition-group>
		<transition-group name="t_list" tag="div" v-on:after-enter="afterEnter" class="t_div">
			<div v-for=" item in t_items " :key="item" class="block">提示{{item}}</div>
		</transition-group>
		<transition-group name="b_list" tag="div" v-on:after-enter="afterEnter" class="b_div">
			<div v-for=" item in b_items " :key="item" class="block">提示{{item}}</div>
		</transition-group>
	</div>
</template>

<script>
	export default{
		data:function() {
			return {
				l_items:[],
				l_index:1,
				r_items:[],
				r_index:1,
				t_items:[],
				t_index:1,
				b_items:[],
				b_index:1
			};
		},
		methods:{
			l_add:function() {
				this.l_items.push(this.l_index);
				this.l_index++;
			},
			r_add:function() {
				this.r_items.push(this.r_index);
				this.r_index++;
			},
			t_add:function() {
				this.t_items.unshift(this.t_index);
				this.t_index++;
			},
			b_add:function() {
				this.b_items.push(this.b_index);
				this.b_index++;
			},
			afterEnter:function(a) {
				var _this = this;
				setTimeout(function() {
					_this.l_items.shift();
					_this.r_items.shift();
					_this.t_items.pop();
					_this.b_items.shift();
					_this = null;
				}, 2000);
			}
		}
	}
</script>

<!-- 要是想使用sass，先要下载node-sass和sass-loader，然后在style里写lang=“scss”，就可以使用了，scrped是来限制局部css的 -->
<style lang="scss" scoped>
	.tips_wrap{
		margin-left: 100px;
		margin-top: 50px;
		height: 100%;
		position: relative;
		.btns{
			user-select:none;
			-webkit-user-select:none;
			display: inline-block;
			width: 120px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background-color: #4CB034;
			color:#A0206B;
			font-size: 20px;
			cursor:pointer;
			border-radius:14px;
		}
		.btns:hover{
			color:#fff;
		}
		.block{
			position: relative;
			margin-top: 20px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color:#fff;
			font-size: 20px;
			width: 150px;
			background-color: yellowgreen;
			border-radius:14px;
			box-shadow:1px 1px 5px #0F3B7C,
			2px 2px 5px #0F3B7C,
			3px 3px 5px #0F3B7C,
			4px 4px 5px #0F3B7C,
			5px 5px 5px #0F3B7C,
			6px 6px 5px #0F3B7C,
			10px 10px 10px #000;
			transition:all 0.5s ease-out;
		}
		//左边
		.l_div{
			position: absolute;
			left: 0;
			top: 50px;
		}
		.l_list-enter-active{
			left:0px;
		}
		.l_list-enter{
			left:-178px;
		}
		.l_list-leave-active{
			animation:l_out 1s;
			-webkit-animation:l_out 1s;
		}
		@keyframes l_out{
			0%{
				left:0;
			}
			25%{
				left:20px;
			}
			100%{
				left:-178px;
			}
		}
		@-webkit-keyframes l_out{
			0%{
				left:0;
			}
			25%{
				left:20px;
			}
			100%{
				left:-178px;
			}
		}
		//右边
		.r_div{
			position: absolute;
			right: 0;
			top: 50px;
		}
		.r_list-enter-active{
			left:0px;
		}
		.r_list-enter{
			left:178px;
		}
		.r_list-leave-active{
			animation:r_out 1s;
			-webkit-animation:r_out 1s;
		}
		@keyframes r_out{
			0%{
				left:0px;
			}
			25%{
				left:-20px;
			}
			100%{
				left:178px;
			}
		}
		@-webkit-keyframes r_out{
			0%{
				left:0px;
			}
			25%{
				left:-20px;
			}
			100%{
				left:178px;
			}
		}
		//上边
		.t_div{
			position: absolute;
			left: calc(50% - 75px);
			top: 0;
		}
		.t_list-enter-active{
			top:0px;
		}
		.t_list-enter{
			top:-40px;
		}
		.t_list-leave-active{
			animation:t_out 1s;
			-webkit-animation:t_out 1s ;
		}
		@keyframes t_out{
			0%{
				top:0px;
			}
			25%{
				top:20px;
				opacity:0.7;
			}
			100%{
				top:25px;
				opacity:0.1;
			}
		}
		@-webkit-keyframes t_out{
			0%{
				top:0px;
			}
			25%{
				top:20px;
				opacity:0.7;
			}
			100%{
				top:25px;
				opacity:0.1;
			}
		}
		//下边
		.b_div{
			position: absolute;
			left: calc(50% - 75px);
			bottom: 0;
		}
		.b_list-enter-active{
			bottom:0px;
		}
		.b_list-enter{
			bottom:-40px
		}
		.b_list-leave-active{
			animation:b_out 1s;
			-webkit-animation:b_out 1s;
		}
		@keyframes b_out{
			from{
				transform:rotateZ( 0 ) scale( 1 );
				-webkit-transform:rotateZ( 0 ) scale( 1 );
			}
			to{
				transform:rotateZ( 360deg ) scale( 0 );
				-webkit-transform:rotateZ( 360deg ) scale( 0 );
			}
		}
		@-webkit-keyframes b_out{
			from{
				transform:rotateZ( 0 ) scale( 1 );
				-webkit-transform:rotateZ( 0 ) scale( 1 );
			}
			to{
				transform:rotateZ( 360deg ) scale( 0 );
				-webkit-transform:rotateZ( 360deg ) scale( 0 );
			}
		}
	}
</style>