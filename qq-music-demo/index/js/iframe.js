var data = [
		{top:'001',name:'从前慢 (Live)',singer:'叶炫清'},
		{top:'002',name:'Time (Live)',singer:'小青龙 / 辉子'},
		{top:'003',name:'非酋',singer:'薛明媛 / 朱贺'},
		{top:'004',name:'Faded',singer:'Alan Walker'}
	];


function childOnload(target){//第一次初始化加载过来的数据
	var myfirmes = id('child').contentWindow;
	var ms = {
		data:data,
		flag:'show'
	};
	var message = JSON.stringify(ms);
	myfirmes.postMessage(message,'*');
}

function delsinger(key){//删除函数，在这里构建一个函数用来删除在这里创建的数组
	for(var i=0;i<data.length;i++){
		if(data[i].top==key){
			data.splice(i,1);
			return true;
		}
	}
	return false;
}

function addsingerMeg(singer){//增加函数,在这里构建一个函数用来在这里增加数据，放进数组里面
	data.push(singer);

}
function updateSing(song){
	for(var p in data){
		if(data[p].top==song.top){
			for(var i in song){
				data[p][i]=song[i];
			}
		}
	}
}


function sendWays(senMsg){

	var iframeWindow = id('child').contentWindow;//定义这个窗口的发送名称
	senMsg = JSON.stringify(senMsg);
	iframeWindow.postMessage(senMsg,'*');
}



window.onmessage = function(e){//接收发过来的消息,判断具体做什么操作


	var msg = JSON.parse(e.data);
	var senMsg ={};
	var result = null;
	console.log(msg);
	switch(msg.flag){
		case 'del':
			result =delsinger(msg.data);//判读是否已经删除
			if(result){
				senMsg ={flag:'delcomplete'};
				sendWays(senMsg);
			}
		break;
		case 'add':
			singer = addsingerMeg(msg.data);
			senMsg ={flag:'addcomplete'};
			sendWays(senMsg);
		break;
		case 'revise':
			singer = addsingerMeg(msg.data);
			senMsg ={flag:'revisecomplete'};
			sendWays(senMsg);
		break;
	}


};	



function iframeStar(){
	/*childOnload();*/
}