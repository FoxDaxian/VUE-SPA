<template>
	<div class="head">
		<h1>This is my first demo for vue!</h1>
		<div class="rabbit"></div>
	</div>
</template>

<script>
	
</script>

<style>
	.head{
		height: 50px;
		background-color: #82C247;
		padding-top:5px;
		box-sizing: border-box;
	}
	@keyframes typing{
		from{
			width:0;
		}
	}
	@-webkit-keyframes typing{
		from{
			width:0;
		}
	}
	@keyframes border{
		50%{
			border-right-color:transparent;
		}
	}
	@-webkit-keyframes border{
		50%{
			border-right-color:transparent;
		}
	}
	.head h1{
		font: bold 2em Consolas;
		white-space: nowrap;
		width: 30ch;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
		border-right: .1em solid  #000;
		padding-left: 760px;
		color:#fff;
		animation:typing 20s steps(30,end),
		border 0.5s step-end infinite alternate;
	}
	.rabbit{
		position: absolute;
		top: 2.5px;
		left:700px;
		height:35px;
		width:32px;
		-webkit-animation:test 400ms steps(4) infinite;
		animation:test 400ms steps(4) infinite;
		background:url(http://www.web-tinker.com/share/兔斯基揉脸.png);
	}
	@-webkit-keyframes test {
		0% {background-position:0px -0%;}
		100% {background-position:0px -400%;}
	}
	@keyframes test {
		0% {background-position:0px -0%;}
		100% {background-position:0px -400%;}
	}
</style>