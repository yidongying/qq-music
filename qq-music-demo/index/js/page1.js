function initScreenW(){
	var oWdith = window.outerWidth;
	var oHeight = window.outerHeight;
	id('header').style.width = oWdith+'px'; 
	id('content').style.width = oWdith+'px'; 
}
function scrollScreen(nowScreen){
	
}
function changePart(){
	var aSpan = tag('span',id('chance'));
	var oScroll = clas('scroll',id('content'));
	var oPartH = clas('remen',id(content))[0].offsetHeight+id('header').offsetHeight;
	var nowScreen = 0;
	var timer = null;
	var oLd =0;
	var on = true;
	/*每一个内容部分的高度*/
	initScreenW();
	// alert(oPartH);
	
	for(var i=0;i<aSpan.length;i++){
		aSpan[i].index = i;
		(function(i){

			aSpan[i].onclick = function(){
				aSpan[oLd].style.backgroundColor = 'rgba(57,17,210,0.5)';
				this.style.backgroundColor = 'rgba(57,17,210,1)';
				oLd = this.index;
				if(i!=0){
					id('header').style.height = '0%';
					id('content').style.height ='100%';
				}else{
					id('header').style.height = '5%';
					id('content').style.height ='95%';
				}

				oScroll[0].style.top = (-oPartH)*i+'px';	
			};
		})(i);
	}

}
function showHeader(){
	var oHeader = id('header');
	var on = true;
	oHeader.onmouseover = function(){
			oHeader.style.height = '15%';
			clas('content')[0].style.height = '85%';
	}
	oHeader.onmouseout = function(){
			oHeader.style.height = '5%';
			clas('content')[0].style.height = '95%';
	}
}
function initLunbo(){

	var aSpan = tag('img',id('lunbo'));

	for(var i = 0;i<aSpan.length;i++){
		aSpan[i].src = 'img/lunbo1/'+(i+1)+'.jpg';
	}
	
}
function lunbo1(){
	var oImg = tag('div',id('lunbo'))[0];
	var akuai = tag('div',oImg);
	var oLeft = clas('lunboleft',id('lunbo'))[0];
	var oRight = clas('lunboright',id('lunbo'))[0];
	var oLd = 0;
	oLeft.onclick = function(){
		akuai[oLd].className = 'hide';
		oLd++;
		if(oLd>=3)
			oLd =0;
		akuai[oLd].className = 'show';
	}
	oRight.onclick = function(){
		akuai[oLd].className = 'Rhide';
		oLd--;
		if(oLd<=-1)
			oLd =2;
		akuai[oLd].className = 'Rshow';
	}
}

function lunbo1initC(){
	var aUl = tag('ul',id('lunbo'));
	var sSpan = tag('span',id('lunbo'));
	var aLi =null;
	// console.log(aSpan.length);
	for(var i=0;i<sSpan[i].length;i++){
		sSpan[i].innerHTML += '<b>哦问hi啥地方说的</b>';
	}
	for(var i=0;i<aUl.length;i++){
		aLi = tag('li',aUl[i]);		
		aLi[0].innerHTML = 'Tired (Kygo Remix)'+'<a>H</a>';
		aLi[1].innerHTML = 'Alan Walker (艾伦·沃克)';	
	}
}

function star(){
	changePart();
	showHeader();
}
function initContent(){

	initLunbo();
	lunbo1();
	lunbo1initC();
	initScreenW();

}
window.onload = function(){

	star();
	star2();
	initContent();

	iframeStar();//iframe块执行的函数
	

};