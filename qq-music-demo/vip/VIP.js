// function showList(){
// 	var oMain = document.getElementById('main');
// 	var mLi = oMain.getElementByTagName('li');
// 	var arr = ['img/banner_thumb_1.jpg','img/banner_thumb_2.jpg']
// 	for(var i=0;i<mLi.length;i++){
// 		mLi[i].style.display='block';
// 		mLi[i].style.background = 'url(i%arr[i])';
// 	}
// }
function id(ID){
	return document.getElementById(ID);
}
// 显示二级菜单
function subMenu(){
	var oHeader = document.getElementById('header');
	var lis = oHeader.getElementsByTagName('li');
	var subMenu = document.getElementById('subMenu');
	lis[1].onmouseover = function(){
		subMenu.style.display = 'block';
	}
	lis[1].onmouseout = function(){
		subMenu.style.display = 'none';
	}
	subMenu.onmouseover = function(){
		subMenu.style.display = 'block';
	}
	subMenu.onmouseout = function(){
		subMenu.style.display = 'none';
	}
}

function subList(index){
	var Inx = document.getElementById('index');
	var aLi = Inx.getElementsByTagName('li');
	var aDiv =Inx.getElementsByTagName('div');
	var index=null;

	for(var i = 0;i<aLi.length;i++){
		aLi[i].setAttribute('index',i);

		aLi[i].onmouseover = function(){

			aDiv[this.getAttribute('index')].style.display = 'block';
			// aDiv[index].style.display='block'
		}

		aLi[i].onmouseout = function(){

			aDiv[this.getAttribute('index')].style.display = 'none';
			// aDiv[index].style.display='block'
		}
	}
}


window.onload = function(){
	subMenu();
	subList();
	sub();
};