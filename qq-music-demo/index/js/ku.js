
function id(ID,father){
	father = father ||document;
	return father.getElementById(ID);
}
function tag(name,father){
	father = father || document;
	return father.getElementsByTagName(name);

}
function clas(name,father){
	father = father || document;
	return father.getElementsByClassName(name);
}

function addWheel(obj,fn){
    function wheel(ev){
        var oEvent=ev||event;
        var bDown=true;
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta<0){
                bDown=false;
            }else{
                bDown=true;
            }
        }else{
            if(oEvent.wheelDetail<0){
                bDown=true;
            }else{
                bDown=false;
            }
        }
        fn(bDown);
        return false;
        oEvent.preventDefault&&oEvent.preventDefault();
    }
    //判断是不是火狐
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){    
        obj.addEventListener('DOMMouseScroll',wheel,false);//'DOMMouseScroll'只兼容火狐,必须用时间绑定；
    }else{
        obj.onmousewheel=wheel;
    }
}
