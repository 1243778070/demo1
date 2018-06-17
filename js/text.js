function EditorNav_text() {
    this.EditorObj = document.getElementById("EditorNav");
};
function EditorNav_textColorBox() {
    this.EditorObj = document.getElementById("EditorNav_texttextColor");
};

EditorNav_text.prototype = new Editor();/*设置：加粗，斜体，清除*/
EditorNav_textColorBox.prototype = new Editor();/*设置字体颜色盒子*/
EditorNav_textInto();


function EditorNav_textInto() {
    var nav__text = new EditorNav_text();
    var textArr =["strong","Italic","clear","textColor"];
    var textArrEXE =["bold","italic","selectAll","ForeColor"];  /*这里的参数是execCommmand中需要的参数*/
    for(var i = 0;i<textArr.length;i++){
        var EditorDom_name = "EditorDom_"+textArr[i];
        nav__text.EditorDom_name = document.createElement("button");
        nav__text.EditorDom_name.setAttribute("class", "EditorNav_Obj");
        nav__text.EditorDom_name.setAttribute("id", "EditorNav_text"+textArr[i]+"");
        nav__text.EditorDom_name.setAttribute("data-exe", textArrEXE[i]);
        if(!!window.ActiveXObject || "ActiveXObject" in window){
            nav__text.EditorObj.appendChild(nav__text.EditorDom_name);/*添加对象到nav中去*/
        }else{
            nav__text.EditorObj.append(nav__text.EditorDom_name);/*添加对象到nav中去*/
        }

        if(i == 0){
            nav__text.EditorDom_name.setAttribute("title", "加粗");
        }
        if(i == 1){
            nav__text.EditorDom_name.setAttribute("title", "斜体");
        }
        if(i == 2){
            nav__text.EditorDom_name.setAttribute("title", "清除文章");
        };
        if(i == 3){
            nav__text.EditorDom_name.setAttribute("title", "字体颜色");
            nav__text.EditorDom_name.addEventListener("click",function () {
                EditorNav_textInto.TextColoe(this);
            })
        };
        if(i != 3){
           nav__text.EditorDom_name.addEventListener("click",function () {
               EditorNav_textInto.TextStyle(this);
           })
        };

    };
    document.execCommand("RemoveFormat",false,null);

};

function EditorNav_textColorDlaog(){
    /*创建textColor中的弹出框！*/
    var nav__textColor = new EditorNav_textColorBox();
    console.log(nav__textColor.EditorObj);
    if(document.getElementById("dlaog")){
        document.getElementById("dlaog").remove();
    }
    nav__textColor.EditorDom = document.createElement("div");
    nav__textColor.EditorDom.setAttribute("id","dlaog");
    nav__textColor.EditorDom.setAttribute("switch","close");
    nav__textColor.Editor__Append(nav__textColor.EditorObj);
    nav__textColor.Editor__Setsize("120px","100px");

    var textColorObj = new Array();
    var  textColorName =["灰色","蓝色","红色","绿色","分红色","褐色","黄色"];
    var  textColorType =["#8c8c8c","#19ABE3","#D82008","#1BFA2A","#E8999B","#E16632","#F4EA2A"]
    for(var i = 0;i<textColorName.length; i++){
        textColorNameURL = "img/nav_text_color"+i+".png";
        var textColorArry = {"title":textColorName[i],"url":textColorNameURL,"id":"penpel"+i,"colorType":textColorType[i] };
        textColorObj.push(textColorArry);
    }

    for(var j = 0;j < textColorObj.length;j++){
        var textColorSpanObj = document.createElement("span");
        textColorSpanObj.setAttribute("title",textColorObj[j].title);
        textColorSpanObj.setAttribute("colorType",textColorObj[j].colorType);
        textColorSpanObj.setAttribute("id", textColorObj[j].id);
        textColorSpanObj.setAttribute("style",'background-image:url("'+textColorObj[j].url+'");');
        nav__textColor.EditorDom.append(textColorSpanObj);

        document.getElementById("penpel"+j).addEventListener("click",function(){
            var j = this.getAttribute("id").toString().replace(/[^0-9]/ig,"");
            var colorType = this.getAttribute("colorType");
            this.setAttribute("style","border:1px red solid");
            document.getElementById("EditorNav_texttextColor").setAttribute('style','background-image:url("img/nav_text_color'+j+'.png");');
            document.execCommand("ForeColor","false",colorType);
        });
    };



};

EditorNav_textInto.TextStyle = function (that) {
    /*字体的加粗，斜体，清楚文章的点击功能！*/
    console.log(that);
    console.log(that.classList.contains("hoverClass"));

    if(!that.classList.contains("hoverClass")){
        /*加粗,斜体*/
        that.classList.add("hoverClass");
    }
   else{
        /*取消加粗,取消斜体*/
        that.classList.remove("hoverClass");
   };
    var textstyle = that.getAttribute("data-exe");
    document.execCommand(textstyle,false,null);
    if(that.getAttribute("data-exe") == "selectAll"){
        document.getElementById("EditorText").focus();
        document.execCommand("RemoveFormat",false,null);
        document.execCommand("Delete",false,null);
        var EditorNav_Obj= document.getElementsByClassName("EditorNav_Obj");
        for(var i=0;i<EditorNav_Obj.length;i++){
            EditorNav_Obj[i].classList.remove("hoverClass");
        }
    }
};



EditorNav_textInto.TextColoe = function (that) {
    /*字体的颜色的点击功能！*/
    if(!that.classList.contains("hoverClass")){
        that.classList.add("hoverClass");

        EditorNav_textColorDlaog();

    } else{
        that.classList.remove("hoverClass");
        document.getElementById("dlaog").setAttribute("style","display:none");
        document.getElementById("dlaog").setAttribute("switch","open");
    };

    return;
    var textstyle = that.getAttribute("data-exe");
    document.execCommand(textstyle,false,null);
};



/*监听光标位置的变化*/
EditorTextOBJ.onclick =EditorTextOBJ.onkeyup= function () {
    var range = window.getSelection().getRangeAt(0);
    cursor_potion = range;
    console.log(cursor_potion.startContainer.parentElement.tagName.toLowerCase ());
    var DOM_Click_Name = cursor_potion.startContainer.parentElement.tagName.toLowerCase ();
    var EditorNav_textstrong = document.getElementById("EditorNav_textstrong");
    var EditorNav_textItalic = document.getElementById("EditorNav_textItalic");
    console.log(DOM_Click_Name)
    if(DOM_Click_Name == "b"){
        EditorNav_textstrong.classList.add("hoverClass");
    }
    if(!(DOM_Click_Name == "b")){
        EditorNav_textstrong.classList.remove("hoverClass");
    }
    if(DOM_Click_Name == "i"){
        EditorNav_textItalic.classList.add("hoverClass");
    }
    if(!(DOM_Click_Name == "i")){
        EditorNav_textItalic.classList.remove("hoverClass");
    }
}





