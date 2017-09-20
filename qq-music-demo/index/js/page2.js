function initLunbo2(){
	var oPicList = document.getElementById('picList');
	var aLi = oPicList.getElementsByTagName('li');
	var oCss = document.getElementById('css');
	var aBtns = document.getElementById('btns').getElementsByTagName('li');
	var timer =null;
	var iLiw = 25;
	var iLength = oPicList.clientWidth/iLiw;
	var aCss = '';
	var Sli ='';
	var oActive = 0;
	var on = true;
	var nowIndex = 0;


			for(var i=0;i<iLength;i++){
				
				var iZindex = i>iLength/2?iLength-i:i;

				Sli +='<li style="z-index:'+iZindex +'"><a href="javscript:;"></a><a href="javscript:;"></a><a href="javscript:;"></a><a href="javscript:;"></a><span></span><span></span></li>';

				aCss += '#picList li:nth-child('+(i+1)+') a{background-position:-'+(i*iLiw)+'px 0}';

			} 

		oPicList.innerHTML = Sli;
		oCss.innerHTML +=aCss;
		autoStar();
		changMove();
		
		function starMove(a){
			for(var i=0;i<aLi.length;i++){
				addEnd(aLi[aLi.length-1],end);
				aLi[i].style.transition = '0.5s '+ 30*i +'ms';
				aLi[i].style.WebkitTransform = 'rotateX('+a*90+'deg)';	
			}
		}
		function initClass(){
			for(var i=0;i<aBtns.length;i++){
					aBtns[i].className = '';
				}
		}
		function changMove(){
			for(var i=0;i<aBtns.length;i++){
				aBtns[i].index = i;
				(function(a){
					aBtns[a].onclick = function(){
						
						if(on){
							clearInterval(timer);
							on = false;//关闭开关
							initClass();
							this.className ='active';
							starMove(this.index);
							autoStar();
						}		
					}
				})(i);
			}
		}
		function autoStar(){

			timer = setInterval(function(){
				on = false;
				nowIndex++;
				oActive=nowIndex-1;
				if(nowIndex>=4)
					nowIndex=0;
				if(nowIndex==1) 
					oActive=0;
				// aBtns[oActive].className = '';
				initClass();
				aBtns[nowIndex].className ='active';
				starMove(nowIndex);
			},3000);	
		}


		function end(){
			on = true;
		}
		function addEnd(obj,fn){
			obj.addEventListener('WebkitTransitionEnd',fn,false);
			obj.addEventListener('transitionend',fn,false);
		}

		function removeEnd(obj,fn){
			obj.removeEventListener('WebkitTransitionEnd',fn,false);
			obj.removeEventListener('transitionend',fn,false);
		}	
}
function star2(){
	initLunbo2();
}
