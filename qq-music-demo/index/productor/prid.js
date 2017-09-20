function id(ID){
	return document.getElementById(ID);
}
function tag(name,father){
	father = father||document;
	return father.getElementsByTagName(name);
}
//增加一行的函数
grid.createTr = function(obj){
	var tr=document.createElement('tr'),td;

	for(var p in obj){
		td = document.createElement('td');
		if(this.config.key==p){
			td.innerHTML = '<a href="javascript:;" onclick="grid.showdialog(this)" data-ways=true>'+obj[p]+'</a>';	
		}else{
			td.innerText = obj[p];
		}

		tr.appendChild(td);
	}
	if(typeof this.config.delfn == 'function'){

		td = document.createElement('td');
		td.innerHTML = '<a href="javascript:;" data-key="'+obj[this.config.key]+'" onclick="grid.del(this)">delete</a>';
		tr.appendChild(td);
	}
	return tr;
};
grid.createCaption = function(){
	var caption = document.createElement('caption');

	//加标题
	if(this.config.title){
		span = document.createElement('span');
		span.innerHTML = this.config.title
		caption.appendChild(span);
		if(typeof this.config.addfn=='function'){
			caption.innerHTML+= '<a href="#" onclick="grid.showdialog(this)" ways=false>Create</a>';	
		}
	}
	return caption;
};
grid.createThead = function(){

	var thead = document.createElement('thead'),tr,th;
	tr = document.createElement('tr');
	for(var p in this.config.data[0]){
		th = document.createElement('th');
		th.innerText = p;
		tr.appendChild(th);
	}
	

	if(typeof this.config.delfn=='function'){
		th=document.createElement('th');
		th.innerHTML='<a>operation</a>';
		tr.appendChild(th);

	}
	
	thead.appendChild(tr);	
	return thead;	
};
grid.createBody = function(){
	var tbody = document.createElement('tbody'),tr;

	for(var p in this.config.data){
		tr = this.createTr(this.config.data[p]);
		tbody.appendChild(tr);
	}
	return tbody;	
};
grid.createTable = function(){
	var table = document.createElement('table');
	table.appendChild(grid.createThead());
	table.appendChild(grid.createBody());
	table.appendChild(grid.createCaption());
	id(this.config.container).appendChild(table);
};
grid.addTable = function(){
	
	this.createTable();	
};
grid.initEditdialog = function(){
	var oOverflag = document.createElement('div');
	oOverflag.setAttribute('id','overlay');
	id(this.config.container).appendChild(oOverflag);
	var fields = this.config.fields;
	var Id = id('overlay');
	var contentHtml ='';
	contentHtml+=
		'<div id="content" >\
			<div  id="title">\
				<span id="titles">请进行操作</span><span id="cltitle" onclick="grid.closedialog()">×</span>\
			</div>\
			<ul  id="container">';
			//看需要增加什么类型的input，将表单建立好
		for(var i in fields){
			contentHtml+= '<li>';
			contentHtml+= '<label>'+fields[i].name+'</label>';
				
					
					switch(fields[i].type){

						case 'select':
							contentHtml+='<select  id="'+fields[i].name+'" >';

							for(var j in fields[i].option){

								contentHtml+='<option value="'+fields[i].option[j].name+'">'+fields[i].option[j].text+'</option>';	
							}
							
							contentHtml+='</select>';

							break;

						default:
							contentHtml+='<input type="'+fields[i].name+'" id="'+fields[i].name+'" />';	
							break;
					}
				
				contentHtml+='</li>';
		}

		contentHtml+='<div class="btns"><input type="button" value="save"  onclick="grid.save(this)" id="save"/><input type="button" value="concel" onclick="grid.closedialog()" id="concel" /></div>';

	contentHtml+=
			'</ul>\
		</div>';
		

	Id.innerHTML = contentHtml;
};//字符串要换行显示，需要增加\符
//删除数据

grid.resetdialog = function(obj){
	var fields=this.config.fields;
	var key = this.config.key;
	for(var p in fields){
		id(key).disabled =  obj?'disabled':'';
		id(fields[p].name).value = obj?obj[fields[p].name]:'';
	}//当是点击修改的时候将当前的值，放到一个对象中，然后通过用户传给我们的要修改的类型和对象的文本框类型来进行操作，如果传了值过来，就将这个对象的值放入对应的input框里面，如果没有，就不放就变成空了
};
grid.del = function(target){

	var on =confirm("真的要删除吗?");
	if(!on){
		return;
	}else{
		var tr = target.parentNode.parentNode;
		tr.parentNode.removeChild(tr);
		//删除表格中的数据
		var id=target.getAttribute('data-key');
		this.config.delfn(id);

	}
};
//保存数据、可以看是增加，还是修改
grid.save = function(target){
	var key = this.config.key;
	var data = this.config.data;
	var fields = this.config.fields;
	var obj = {};
	//将当前input里面的值放到一个对象中,然后使用用户自己定义的函数来操作这些数据，将这些数据放到，自己要放入的地方
	for(var i in fields){
		obj[fields[i].name] = id(fields[i].name).value;
	}
	if(target.getAttribute('data-ways')=='edit'){

		//将填入input的内容更新到数组、和表格中
		var td = tag('td',grid.curTr);
		for(var i in fields){
			if(fields[i].name!=key)
				td[i].innerText = obj[fields[i].name];
		}
		this.config.updatafn(obj);
		
		alert("修改成功!");
		grid.closedialog();
	}else{
		//如果有一项没有填写就会弹出错误
		for(var p in fields){
			if(obj[fields[p].name]==''){
				alert("请输入完整信息");
				return;
			}
		}

		tag('tbody')[0].appendChild(grid.createTr(obj));
		this.config.addfn(obj);
		alert("新增成功");
		grid.closedialog();
	}
};
//关闭窗口
grid.closedialog= function(){
	id('content').className = 'hide';
	setTimeout(function(){
		id('overlay').style.display = 'none';
		id('content').style.display = 'none';
	},800);
	
};
grid.showdialog = function(target){
	var data = this.config.data;
	var fields = this.config.fields;
	if(target.getAttribute('ways')){//创建
		this.resetdialog();
		
		id('save').setAttribute('data-ways','create');//给保存按钮存一个值判断是保存，还是修改
	}else{//修改内容
		//将当前行的内容放到input里面//给保存按钮存一个值判断是保存，还是修改
		grid.curTr = target.parentNode.parentNode;
		id('save').setAttribute('data-ways','edit');
		for(var i in data){
			for(var p in data[i]){
				if(data[i][this.config.key]==target.innerHTML){
					this.resetdialog(data[i]);
					break;
				}
			}
		}
	}
	id('overlay').style.display = 'block';
	id('content').style.display = 'block';
	id('content').className = 'show';
};

function grid(config){
	grid.config = config;
	console.log(grid.config.addfn);
	grid.addTable(config.addfn);

	if(typeof grid.config.addfn=='function'){
		grid.initEditdialog();

	}
}

grid.curTr = null;
window.onload = function(){
	     grid();
};