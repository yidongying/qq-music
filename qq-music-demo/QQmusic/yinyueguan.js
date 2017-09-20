function show(){
	id('login').onclick=function(){
		id('login_dialog').style.display='block';
		id('overlay').style.display='block'
	}
}
function close(){
	id('close').onclick=function(){
		id('login_dialog').style.display='none';
		id('overlay').style.display='none'
	}
}
function changeMenu(index,target){
	var lis=id('Menu').getElementsByTagName('li');
	for(var i=0;i<lis.length;i++){
		lis[i].className='';
	}
	target.className='active';
}
window.onload=function(){
	close();
	changeMenu();
}