<style scoped lang="scss">
	.wrap{
		font-family: "微软雅黑";
		height: 100%;
		padding-left: 20px;
		min-width:1600px;
		.ulWrap{
			height: 60px;
			width: 100%;
			margin-top: 10px;
			>ul{
				height: 100%;
				background-color: #FFF;
				border-radius:6px;
				a{
					>li{
						float:left;
						width: 70px;
						height: 100%;
						margin-left: 50px;
						text-align: center;
						p:nth-of-type(1){
							height: 17px;
							line-height:17px;
							font-size: 14px;
							background-color: #ffafc9;
							box-sizing:border-box;
							margin:0 14px;
							margin-top: 12px;
							color:#fff;
							border-radius:4px;
						}
						p:nth-of-type(2){
							margin-top: 6px;
							font-size: 14px;
						}
						&:hover p:nth-of-type(2){
							color:#00a1d6;
						}
						.noBG{
							background-color: #fff!important;
						}
						.show{
							display:block;
						}
						ul{
							display:none;
							position: absolute;
							overflow:hidden;
							background-color: #FFF;
							width: 160px;
							text-align:left;
							margin-top: 10px;
							border-radius:6px;
							box-shadow:2px 2px 2px #ccc;
							li{
								&:hover{
									background-color: #E5E9EF;
									padding-left: 26px;
									b:nth-of-type(2){
										left: 0px;
									}
								}
								width: 100000px;
								transition:0.2s;
								-webkit-transition:0.2s;
								height: 30px;
								line-height:30px;
								padding-left: 20px;
								box-sizing:border-box;
								span{
									font-size: 12px;
								}
								b{
									color:#00a1d6;
								}
								b:nth-of-type(2){
									position: relative;
									left: 100px;
									transition:0.2s;
									-webkit-transition:0.2s;
								}
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="wrap">
		<div class="ulWrap">
			<ul>
				<a href="javascript:;">
					<li>
						<p class="noBG">
							<img src="../../assets/home.png" height="16" width="18" alt="home">
						</p>
						<p>首页</p>
					</li>
				</a>
				<a href="javascript:;">
					<li v-for="(item,index) in items" @mouseover="show(index)" @mouseout="hide">
						<p>{{item.num}}</p>
						<p>{{item.name}}</p>
						<ul :class="{show:ifOk === index}">
							<li v-for="list in item.list">
								<b>&gt;</b>
								<span>{{list}}</span>
								<b>&lt;</b>
							</li>
						</ul>
					</li>
				</a>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data:function() {
			return {
				ifOk:false,
				items:[{
					name:"动画",
					list:["MAD-AMV","MMD-3D","短片·手书·配音","综合"],
					num:108
				},{
					name:"番剧",
					list:["连载动画","完结动画","国产动画","资讯","官方延伸","新番时间表","番剧索引"],
					num:27
				},{
					name:"音乐",
					list:["原创音乐","翻唱","VOCALOID·UTAU","演奏","三次元音乐","OP/ED/OST","音乐选集"],
					num:197
				},{
					name:"舞蹈",
					list:["宅舞","三次元舞蹈","舞蹈教程"],
					num:15
				},{
					name:"游戏",
					list:["单机联机","网游·电竞","音游","Mugen","GMV"],
					num:691
				},{
					name:"科技",
					list:["纪录片","趣味科普人文","野生技术协会","演讲·公开课","星海","数码","机械"],
					num:195
				},{
					name:"生活",
					list:["搞笑","日常","美食圈","动物圈","手工","绘画","运动"],
					num:355
				},{
					name:"鬼畜",
					list:["鬼畜调教","音MAD","人力VOCALOID","教程演示"],
					num:12
				},{
					name:"时尚",
					list:["美妆","服饰","健身","资讯"],
					num:77
				},{
					name:"广告",
					list:[],
					num:6
				},{
					name:"娱乐",
					list:["综艺","明星","Korea相关"],
					num:311
				},{
					name:"影视",
					list:["电影","电视剧"],
					num:202
				}]
			};
		},
		methods:{
			show:function( index ) {
				this.ifOk = index;
			},
			hide:function() {
				this.ifOk = false;
			}
		}
	}
</script>