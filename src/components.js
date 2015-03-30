var Component = function(el) {
	//add extended functions
	el.data={
		element:el,
		get:function(name,def){
			if(name in this){
				return this[name];
			}
			if((typeof def == "undefined")||(def==null)){
				return false;
			}
			return def;
		},
		set:function(name,value){
			this[name]=value;
		}
	};
	el.on=function(ev,handler){
		ev=ev.split("|");
		for(var i=0;i<ev.length;i++){
			if(this.addEventListener){
				this.addEventListener(ev[i],handler);
			}else{this.attachEvent("on"+ev[i],handler);}
		}
	}
	el.css=function(styles){
		if(typeof styles == "object"){
			for(var i in styles){
				this.style[i]=styles[i];
			}
		}else{return this.style;}
	}
	el.remove=function(){
		this.parentNode.removeChild(this);
	}
	return el;
};
Component.RegisterFn=function(ref,name,fn){
	for(var i in ref) {
		if(ref[i] instanceof HTMLElement){
			ref[i][name]=fn;
		}else{Component.RegisterFn(ref[i],name,fn);}
	}
}
Component.Extend=function(name,fn){
	Component.RegisterFn(Components,name,fn);
}
var Components = {};
(function() {
	var Core = {
		Load:function() {
			var els = document.querySelectorAll('[data-component]');
			for(var i=0;i<els.length;i++) {
				var tmp_object=false;
				var name=((els[i].dataset) ? els[i].dataset.component : els[i].getAttribute("data-component")).split(".");
				//create namespacing
				for(var j=0;j<name.length-1;j++){
					if(j==0){
						if(!Components[name[j]]) {
							Components[name[j]]={};
						} else if(!(name[j] in Components)) {Components[name[j]]={};}
						tmp_object=Components[name[j]];
					} else {
						if(!tmp_object[name[j]]) {
							tmp_object[name[j]]={};
						} else if(!(name[j] in tmp_object)) {tmp_object[name[j]]={};}
						tmp_object=tmp_object[name[j]];
					}
				}
				//add actual object
				if(tmp_object!==false){
					tmp_object[name[name.length-1]]=new Component(els[i]);
				}else{Components[name[name.length-1]]=new Component(els[i]);}
				//remove attribute
				els[i].removeAttribute("data-component");
			}
		}
	};
	Core.Load();
})();