<style scoped lang="scss">
	.wrap{
		position: relative;
		.flower_mouse{
			user-select:none;
			-webkit-user-select:none;
			position: absolute;
			z-index: 999;
			height: 20px;
			width: 20px;
			background-image: url("../../assets/pen.png");
			background-size: 100% 100%;
			cursor:none;
		}
		#canvas:hover,.flower_mouse:hover{
			cursor:none;
		}
		#canvas{
			cursor:default;
			user-select:none;
			-webkit-user-select:none;
			position: relative;
			margin-left: 20px;
			margin-top: 14px;
			background-color: #FFF;
			border-radius:2px;
			border:1px solid #cccccc;
			box-shadow:1px 1px 5px #ccc,
			3px 3px 5px #ccc,
			5px 5px 5px #ccc,
			7px 7px 5px #ccc,
			9px 9px 5px #ccc,
			11px 11px 5px #ccc,
			13px 13px 5px #ccc,
			15px 15px 5px #ccc,
			17px 17px 5px #ccc,
			19px 19px 5px #ccc,
			21px 21px 5px #ccc,
			23px 23px 5px #ccc,
			23px 23px 20px #000;
		}
		.fieldset{
			*{
				font-size: 20px;
				font-family: "微软雅黑";
			}
			user-select:none;
			-webkit-user-select:none;
			margin-top: 35px;
			margin-left: 20px;
			width: 1600px;
			border:3px solid #000;
			padding:5px;
			padding-left: 20px;
			.download,.replayFn,.canChoose,.color,.lineWidth,.goBack,.returnlast,.reset{
				margin-left: 20px;
			}
			label{
				margin-left: 10px;
			}
		}
	}
</style>

<template>
	<div class="wrap">
		<div class="flower_mouse" v-show="ifinCv" ref="block"></div>
		<canvas
		id="canvas"
		ref="cv"
		width="1600"
		height="650"
		@mousedown="mousedown"
		@mousemove="showBlock"
		@mouseout="hideBlock">
		萨比，你这什么JB浏览器
	</canvas>
	<fieldset ref="fieldset" class="fieldset">
		<legend>杂项</legend>
		<label for="color" class="color">画笔颜色：</label>
		<input type="color" id="color" @change="color_event">
		<label for="lineWidth" class="lineWidth">线条宽度：</label>
		<label for="">1</label>
		<input type="range" id="lineWidth" @change="rangd_event" min="1" max="20" value="1">
		<label for="">20</label>
		<input type="button" value="重置画布" @click="reset" class="reset">
		<input type="button" value="ctrl + z" @click="returnLast" class="returnlast">
		<input type="button" value="ctrl + y" @click="goBack" class="goBack">
		<label for="" class="canChoose">可选：</label>
		<label for="pen">画笔</label>
		<input type="radio" value="画笔" name="shape" id="pen" @change="toPen" checked>
		<label for="circular">圆</label>
		<input type="radio" value="圆" name="shape" id="circular" @change="toCircular">
		<label for="square">正方形</label>
		<input type="radio" value="正" name="shape" id="square" @change="toSquare">
		<label for="triangle">三角形</label>
		<input type="radio" value="角" name="shape" id="triangle" @change="toTriangle">
		<input type="button"	 value="回放" @click="replayFn" class="replayFn">
		<input type="button" value="下载" @click="download" class="download">
	</fieldset>
</div>
</template>

<script>
	export default{
		data:function() {
			return{
				ifOk:false,//是不是down
				ctx:"",
				ifinCv:false,//是不是在 canvas中
				historyDataArr:[],//历史记录总
				deleteDataArr:[],//历史记录回撤掉的，为了前进
				shapeValue:"",//形状的值
				downCoor:"",//点击的时候的坐标
				replay:[],//回放总
				deleteReplay:[],//回放删掉的
				replay_templateArr:[],//回放用到的临时数组

			};
		},
		methods:{
			mousedown:function(e) {
				this.$refs.block.style.left = (e.clientX - 248) + "px";
				this.$refs.block.style.top = (e.clientY - 122) + "px";
				this.ifOk = true;
				this.ctx.beginPath();
				this.downCoor = [e.clientX - 270,e.clientY - 120];
				this.ctx.moveTo(e.clientX - 270,e.clientY - 120);
			},
			color_event:function(e) {
				this.ctx.strokeStyle = e.target.value;
			},
			rangd_event:function(e) {
				this.ctx.lineWidth = e.target.value;
			},
			showBlock:function(e) {
				try{
					this.ifinCv = true;
					this.$refs.block.style.left = (e.clientX - 248) + "px";
					this.$refs.block.style.top = (e.clientY - 122) + "px";
				}catch(e){

				}
			},
			hideBlock:function(e) {
				try{
					this.ifinCv = false;
					this.$refs.block.style.left = (e.clientX - 248) + "px";
					this.$refs.block.style.top = (e.clientY - 122) + "px";
				}catch(e){

				}
			},
			reset:function() {
				this.ctx.clearRect(0,0,this.$refs.cv.width,this.$refs.cv.height);
				this.historyDataArr = [];
				this.deleteDataArr = [];
			},
			returnLast:function() {
				if( this.historyDataArr.length > 0){
					this.ctx.clearRect(0,0,this.$refs.cv.width,this.$refs.cv.height);
					this.deleteDataArr.push( this.historyDataArr.pop() );
					this.deleteReplay.push(this.replay.pop());
					if( this.historyDataArr.length === 0 ){
						this.ctx.clearRect(0,0,this.$refs.cv.width,this.$refs.cv.height);
					}else{
						this.ctx.putImageData(this.historyDataArr[this.historyDataArr.length - 1],0,0);
					}
				}
			},
			goBack:function() {
				if( this.deleteDataArr.length > 0 ){
					this.ctx.clearRect(0,0,this.$refs.cv.width,this.$refs.cv.height);
					this.historyDataArr.push( this.deleteDataArr.pop() );
					this.ctx.putImageData(this.historyDataArr[this.historyDataArr.length - 1],0,0);
				}
				if( this.deleteReplay.length > 0 ){
					this.replay.push(this.deleteReplay.pop());
				}
			},
			toPen:function() {
				this.shapeValue = "";
			},
			toSquare:function() {
				this.shapeValue = "square";
			},
			toCircular:function() {
				this.shapeValue = "circular";
			},
			toTriangle:function() {
				this.shapeValue = "triangle";
			},
			replayFn:function() {
				this.ctx.clearRect(0,0,this.$refs.cv.width,this.$refs.cv.height);
				var len = this.replay.length,
				_this = this,
				num = 0,
				i = 0,
				j = 0,
				arr = [],
				innerLen,timer;
				for( ; i < len; i++){
					innerLen =   this.replay[i].length;
					for( ; j < innerLen; j++ ){
						arr.push(this.replay[i][j]);
					}
				}
				function ffff() {
					if( num < arr.length ){
						_this.ctx.putImageData(arr[num],0,0);
						num++;
						requestAnimationFrame(ffff);
					}
				}
				setTimeout(function() {
					ffff();
				}, 0);
			},
			download:function() {
				var type = 'png',
				imgData = this.$refs.cv.toDataURL(type);
				function _fixType(type) {  
					type = type.toLowerCase().replace(/jpg/i, 'jpeg');  
					var r = type.match(/png|jpeg|bmp|gif/)[0];  
					return 'image/' + r;  
				};
				imgData = imgData.replace(_fixType(type),'image/octet-stream');
				function saveFile (data, filename){  
					var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');  
					save_link.href = data;  
					save_link.download = filename;  
					var event = document.createEvent('MouseEvents');  
					event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
					save_link.dispatchEvent(event);  
				};  
				var filename = 'waterMelon' + (new Date()).toLocaleString() + '.' + type;  
				saveFile(imgData,filename); 
			}
		},
		mounted:function() {
			var _this = this,
			canvas = this.$refs.cv;
			_this.ctx = canvas.getContext("2d");
			document.body.onmousemove = function(e) {
				if( _this.ifOk ){
					if( _this.shapeValue === "" ){
						_this.ctx.lineTo(e.clientX - 270,e.clientY - 120);
						_this.ctx.stroke();
					}else if( _this.shapeValue === "square" ){
						if( _this.historyDataArr[_this.historyDataArr.length - 1] ){
							_this.ctx.clearRect(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
							_this.ctx.putImageData(_this.historyDataArr[_this.historyDataArr.length - 1],0,0);
						}else{
							_this.ctx.clearRect(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
						}
						_this.ctx.strokeRect(_this.downCoor[0],_this.downCoor[1],e.clientX - 270 - _this.downCoor[0],e.clientY - 120 - _this.downCoor[1]);
					}else if( _this.shapeValue === "circular" ){
						if( _this.historyDataArr[_this.historyDataArr.length - 1] ){
							_this.ctx.clearRect(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
							_this.ctx.putImageData(_this.historyDataArr[_this.historyDataArr.length - 1],0,0);
						}else{
							_this.ctx.clearRect(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
						}
						_this.ctx.beginPath();
						_this.ctx.arc(_this.downCoor[0],_this.downCoor[1],Math.sqrt(Math.pow(e.clientX - 270 - _this.downCoor[0],2) + Math.pow(e.clientY - 120 - _this.downCoor[1],2)),0,360*Math.PI/180);
						_this.ctx.stroke();
						_this.ctx.closePath();
					}else if( _this.shapeValue === "triangle" ){
						if( _this.historyDataArr[_this.historyDataArr.length - 1] ){
							_this.ctx.clearRect(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
							_this.ctx.putImageData(_this.historyDataArr[_this.historyDataArr.length - 1],0,0);
						}else{
							_this.ctx.clearRect(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
						}
						_this.ctx.beginPath();
						_this.ctx.moveTo(_this.downCoor[0] + (e.clientX - 270 - _this.downCoor[0]) / 2,_this.downCoor[1]);
						_this.ctx.lineTo(_this.downCoor[0],e.clientY - 120);
						_this.ctx.lineTo(e.clientX - 270,e.clientY - 120);
						_this.ctx.closePath();
						_this.ctx.stroke();
					}
					//内存不足，是因为这句话
					// _this.replay_templateArr.push(_this.ctx.getImageData(0,0,_this.$refs.cv.width,_this.$refs.cv.height));
				}
			}
			document.body.onmouseup = function(e) {
				if( _this.ifOk ){
					_this.replay.push(_this.replay_templateArr);
					_this.replay_templateArr = [];
					var lastData = _this.ctx.getImageData(0,0,_this.$refs.cv.width,_this.$refs.cv.height);
					_this.historyDataArr.push(lastData);
					_this.ifOk = false;
				}
			}
		},
		beforeDestroy:function() {
			document.body.onmouseup = null;
		}
	}
</script>