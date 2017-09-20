function id(ID){
			return document.getElementById(ID);
		}
function tagName(name,father){
			father=father||document;
			return father.getElementsByTagName(name);
		}