//TODO 设置主体的类函数
  function Editor(){
     /*对象，创建节点，添加节点，设置节点高度宽度，获取该节点的HTML*/
     this.EditorObj = null;
     this.EditorDom = null;
     this.Editor__Append  = function (obj) {
         obj.append(this.EditorDom);
     }
     this.Editor__Setsize =function(width,height){
         if(!height){
             height = "auto";
         }
         this.EditorDom.setAttribute("style","width:"+width+";height:"+height+";")
     };
     this.Editor__ObjHTML = function(){
         return(this.EditorDom.innerHTML);
     };
     this.Editor__ObjTEXT = function(){
         return(this.EditorDom.innerText);
     };

  };
//todo 初始化编辑器的数据:1编辑器中的DIV,2编辑器中的nav,3编辑器中的编辑器区域,4.初始化编辑器的插件（表情，字体，清空编辑的文子等！）；
  function EditorInoto(p_target , p_plugins){
      // alert(!!window.ActiveXObject || "ActiveXObject" in window);
      Editor.call(this);
      if(!p_target){
          alert("未指定编辑器对象");
          return;
      };
      this.EditorObj= EditorInoto.editor__findTarget(p_target);
      this.EditorDom = document.createElement("div");
      this.EditorDom.setAttribute("id","EditorBox");
      if(!!window.ActiveXObject || "ActiveXObject" in window){
          this.EditorObj.appendChild(this.EditorDom);
      }else{
          this.EditorObj.append(this.EditorDom);
      }
      this.Editor__Setsize("100%");

      var EditorNavOBJ= new EditorNav();

      if(!!window.ActiveXObject || "ActiveXObject" in window){
          this.EditorDom.appendChild( EditorNavOBJ.EditorDom);
      }else{
          this.EditorDom.append( EditorNavOBJ.EditorDom);
      }

      var EditorTextOBJ= new EditorText();

      if(!!window.ActiveXObject || "ActiveXObject" in window){
          this.EditorDom.appendChild( EditorTextOBJ.EditorDom);
      }else{
          this.EditorDom.append( EditorTextOBJ.EditorDom);
      }

      if(p_plugins){
         if(this.EditorObj){
             for(var i=0;i<p_plugins.length;i++){
                 var scriptName =EditorInoto.editor_script("js/"+p_plugins[i]+".js")
                 EditorInoto.editor_AddElementToHead(scriptName);
             }
         }else {
             console.log("指定的编辑器对象有误");
         }
      }else{
          EditorNavOBJ.EditorDom.setAttribute("style","display:none");
      }



  };


  //todo 编辑器中的nav
   function EditorNav() {
       Editor.call(this);
       this.EditorDom = document.createElement("div");
       this.EditorDom.setAttribute("id","EditorNav");
       this.Editor__Setsize("100%");
   }

   //todo 编辑器中的编辑器区域
   function EditorText() {
       Editor.call(this);
       this.EditorDom = document.createElement("div");
       this.EditorDom.setAttribute("id","EditorText");
       this.EditorDom.setAttribute("contenteditable",true);
       this.EditorDom.innerHTML="<p></br></p>";
       this.Editor__Setsize("100%","240px");
   }


EditorInoto.prototype = new Editor(); /*编辑器中的DIV类:中已经继承了Editor()函数的属性和方法*/
EditorInoto.prototype.editor_html=function () {
    var editor_html = document.getElementById("EditorText").innerHTML;
    alert(editor_html);
    return(editor_html);
};
EditorInoto.prototype.editor_txet=function () {
    var editor_txet = document.getElementById("EditorText").innerText;
    alert(editor_txet);
    return(editor_txet);
};
EditorInoto.prototype.editor_wrtie=function () {
    var textareaObj = document.getElementById("Editortextarea");
    var textareaHtml =textareaObj.value.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\"/g,"'").replace('#nbsp',"");

    if(textareaHtml){
        var EditorTextID =document.getElementById("EditorText");
        var editor_wrtieDiv = document.createElement("div");
        editor_wrtieDiv.innerHTML=textareaHtml;
        console.log(editor_wrtieDiv)
        EditorTextID.innerHTML="";
        EditorTextID.append(editor_wrtieDiv);
    }else {
        alert("请在textarea中编辑html！")
    }
};



EditorNav.prototype   = new Editor(); /*编辑器中的nav:类中已经继承了Editor()函数的属性和方法*/
EditorText.prototype  = new Editor(); /*编辑器中的编辑器区域：类中已经继承了Editor()函数的属性和方法*/


/*************工具类*************************************************************************************************************/
EditorInoto.editor__findTarget= function (data){
    /*查询找到插件对象的节点，并返回它*/
    if(!data || data == undefined){
        alert("指定的编辑器对象有误");
        return;
    }
    var documentOBJ = document.querySelector(data);
    if(documentOBJ == null ){
        alert("指定的编辑器对象有误");
        return;
    }else{
        return(documentOBJ);
    }
    
   /* var nameObj = data.toString().trim();
    var nameArr = nameObj.split(" ");
    var getTargetType= null;
    var getTarget= null;
    nameObj = nameArr[nameArr.length-1];
    if(nameObj.indexOf(".") != -1){
        if(document.getElementsByClassName( nameObj.split(".")[nameObj.split(".").length-1])[0]){
            return document.getElementsByClassName( nameObj.split(".")[nameObj.split(".").length-1])[0];
        }else{
            alert("指定的编辑器对象有误");
        }
     }
     else if(nameObj.indexOf("#") !=-1){
        if( document.getElementById(nameObj.split("#")[nameObj.split("#").length-1])){
            return document.getElementById(nameObj.split("#")[nameObj.split("#").length-1]);
        }else{
            alert("指定的编辑器对象有误");
        }
     }
     else{
        if( document.getElementsByTagName(nameObj)[0]){
            return document.getElementsByTagName(nameObj)[0];
        }else{
            alert("指定的编辑器对象有误");
        }
     }*/
};
EditorInoto.editor_script = function (src) {
    var scriptObj = document.createElement("script");
    scriptObj.setAttribute("type","text/javascript");
    scriptObj.setAttribute("src",src);
    return(scriptObj);
}
EditorInoto.editor_AddElementToHead = function (obj){
    if(!obj){
        alert("为指定添加的对象！");
        return;
    }
    var head =document.getElementsByTagName("head");
    document.head.appendChild(obj);
}






