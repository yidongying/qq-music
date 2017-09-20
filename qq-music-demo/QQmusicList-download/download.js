function changTitle(){
	var title=tagName('a',id('small-title'));
	for(var i=0;i<title.length;i++){
			(function(i){
			title[i].onclick=function(){
				for(var j=0;j<title.length;j++){
					title[j].className='';
				}
				title[i].className='active';
			};
		})(i);
	}
}
function changeImg(){
	var lis=tagName('li',id('version'));
 	var bgImgs=tagName('img',id('bannerbg'));
	
	for(var i=0;i<lis.length;i++){
		(function(i){
			lis[i].onclick=function(){
			lis[i].setAttribute('index',i);
			for(var j=0;j<bgImgs.length;j++){
				lis[j].className='';
				bgImgs[j].className='';	
				}
			bgImgs[this.getAttribute('index')].className='showBg';
			lis[this.getAttribute('index')].className='active';
			};
		})(i);	
	}
}
window.onload=function(){
	changeImg();
	changTitle();
}
