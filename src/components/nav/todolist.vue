<style scoped lang="scss">
	.wrap{
		height:100%;
		.todoText{
			width: 500px;
			margin:0 auto;
			margin-top: 50px;
			position: relative;
			.text{
				width: 100%;
				height: 40px;
				padding:9px 10px;
				font-size: 16px;
				box-sizing:border-box;
				border-radius:16px;
				outline:none;
				border:1px solid transparent;
				&:focus{
					border:1px solid blue;
				}
			}
			span{
				position: absolute;
				font-size: 20px;
				line-height: 40px;
				right:10px;
				top: -2px;
				cursor:pointer;
			}
		}
		.todoMain{
			width: 500px;
			margin:0 auto;
			margin-top: 50px;
			position: relative;
			.title{
				width: 100%;
				span{
					display:inline-block;
					width: 50%;
					font-size: 26px;
					text-align: center;
					height:30px;
					line-height:30px;
					color:#95A5A6;
					cursor:pointer;
					&:hover{
						color:#7F8C8D;
					}
				}
				.selected{
					color: blue!important;
				}
			}
			ul{
				margin-top: 50px;
				li{
					line-height:30px;
					cursor:pointer;
					div{
						margin-top: 10px;
						border-bottom:1px dashed #000;
						padding-bottom:10px;
						input{
							-webkit-appearance:none;
						}
						label{
							position: relative;
							top:6px;
							float:left;
							width: 20px;
							height: 20px;
							border:1px solid blue;
						}
						.label_complete{
							&:after{
								font-size: 20px;
								color:blue;
								content:"√";
								position: absolute;
								width: 100%;
								height: 100%;
								top: -5px;
								left: 3px;
							}
						}
						span{
							font-size: 20px;
							margin-left: 20px;
							color:blue;
						}
						.fr{
							float:right;
							display: none;
						}
						.text{
							display: inline-block;
							width: 380px;
							word-wrap:break-word;
						}
					}
				}
				.complete_already{
					*{
						color:gray;
						border-color:gray;
					}
					label{
						&:after{
							color:gray!important;
							font-size: 20px;
							content:"√";
							position: absolute;
							width: 100%;
							height: 100%;
							top: -5px;
							left: 3px;
						}
					}
					.text{
						text-decoration:line-through;
					}
				}
				.showSpan{
					display: block!important;
				}
				.clearComplete{
					display: inline-block;
					cursor:pointer;
					font-size: 20px;
					margin-bottom: 20px;
					&:hover{
						color:blue;
					}
				}
			}
			.wrap_animation-enter-active{
				opacity: 1;
				transform: scale(1,1);
				transition: all 0.2s;
			}
			.wrap_animation-leave-active{
				opacity: 0;
				transform: scale(0,0);
				transition: all 0.2s;
			}
			.wrap_animation-enter{
				opacity: 0;
				transform: scale(0,0);
			}
			.wrap_animation-leave{
				opacity: 0.8;
				transform: scale(1,1);
			}

			.transition_list-enter-active{
				opacity: 1;
				transform: translateY(0px);
				transition: all 0.2s;
			}
			.transition_list-leave-active{
				opacity: 0;
				transform: translateY(-20px);
				transition: all 0.2s;
			}
			.transition_list-enter{
				opacity: 0.8;
				transform: translateY(-20px);
			}
			.transition_list-leave{
				opacity: 0.8;
				transform: translateY(0px);
			}
		}
	}
</style>

<template>
	<div class="wrap">
		<div class="todoText">
			<input type="text" placeholder="接下来要做什么?" class="text" @keyup.enter="addList" ref="text">
			<span @click="clearText">x</span>
		</div>
		<div class="todoMain">
			<div class="title">
				<span v-for="(title,index) in titles" v-text="title" :class="{selected:titleName === index}" @click="changeClass(index)"></span>
			</div>
			<!-- transition是虚的，相当于template，用于整体来回切换，当里面的整体发生变化的时候进行动画，transition-group是实体，他是具体的html，用于单条，当里面的每条发生变化时，进行动画 -->
			<transition name="wrap_animation" mode="out-in">
				<ul  v-for="(item,index) in mainArr" v-if=" titleName === index ">
					<div class="clearComplete" v-if="index === 1" @click="clearComplete">清除已完成事件</div>
					<transition-group  name="transition_list" tag="li">
						<div 
						v-for="(d,i) in item.data" 
						@click="toComplete(index,i,$event)" 
						@mouseover="addClass(i,index)" 
						@mouseout="removeClass"
						:class="{complete_already:(index === 1)}"
						:key="d">
						<input type="checkbox" :id="['not_completeArr-' + i]">
						<label 
						:for="['not_completeArr-' + i]" 
						:class="{label_complete:(ifMover === i)}"></label>
						<span v-text="d" class="text"></span>
						<span class="fr" :class="{showSpan:(ifShow === i)}">{{item.img}}</span>
					</div>
				</transition-group>
			</ul>
		</transition>
	</div>
</div>
</template>

<script>
	export default{
		data:function() {
			return {
				titles:["待办","完成"],
				titleName:0,
				mainArr:[
				{
					data:["vue","vue-router","vueX","vue-resource","vue-volider"],
					img:"置顶",
					class:""
				},
				{
					data:["IFE前端任务","分页","vue基础",],
					img:"删除",
					class:"delete_item"
				}
				],
				ifMover:false,
				ifShow:false
			};
		},
		methods:{
			changeClass:function(index) {
				this.titleName = index;
			},
			addList:function(e) {
				if( this.titleName !== 0 ){
					this.titleName = 0;
				}
				this.mainArr[0].data.unshift(e.target.value);
				e.target.value = "";
			},
			toComplete:function(index,i,e) {
				if( e.target.classList.contains("fr") && index === 0 ){
					var toTopArr = this.mainArr[0].data.splice(i,1);
					this.mainArr[0].data.unshift(toTopArr.join(""));
				}else{
					if( index === 0 ){
						var arr = this.mainArr[0].data.splice(i,1);
						this.mainArr[1].data.unshift(arr.join(""));
					}else{
						this.mainArr[1].data.splice(i,1);
					}
				}
			},
			addClass:function(i,index) {
				if( index === 0 && i === 0){
					this.ifMover = i;
					return;
				}
				this.ifMover = i;
				this.ifShow = i;
			},
			removeClass:function() {
				this.ifMover = false;
				this.ifShow = false;
			},
			clearComplete:function() {
				if( !this.mainArr[1].data.length ){
					alert('空了');
				}
				this.mainArr[1].data = [];
			},
			clearText:function() {
				this.$refs.text.value = "";
				this.$refs.text.focus();
			}
		},
	}
</script>