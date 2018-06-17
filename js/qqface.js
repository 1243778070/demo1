EditorNav_faceInto();
var cursor_potion  /*记录时刻光标的位置*/
var EditorTextOBJ =document.getElementById("EditorText");
//todo 创建表情对象（包括图标，div等信息）
function EditorNav_face() {
    this.EditorObj = document.getElementById("EditorNav");
    this.EditorDom = document.createElement("div");
    this.EditorDom.setAttribute("class", "EditorNav_Obj");
    this.EditorDom.setAttribute("id", "EditorNav_face");
};
//todo 创建显示表情的div
function EditorNav_faceBox(){
    this.EditorObj = document.getElementById("EditorNav");
    this.EditorDom = document.createElement("div");
    this.EditorDom.setAttribute("id", "EditorNav_faceBox");
    this.EditorDom.setAttribute("switch", "close");
    this.EditorDom.setAttribute("style", "width:320px;height:170px");
}


EditorNav_face.prototype = new Editor();
EditorNav_faceBox.prototype = new Editor();
function EditorNav_faceInto(){
    var nav__face = new EditorNav_face();

    if(!!window.ActiveXObject || "ActiveXObject" in window){
        nav__face.EditorObj.appendChild(nav__face.EditorDom);/*添加对象到nav中去*/
    }else{
        nav__face.EditorObj.append(nav__face.EditorDom);/*添加对象到nav中去*/
    }

    nav__face.EditorDom.setAttribute("title", "表情");
    nav__face.EditorDom.addEventListener("click",function () {
       if(!document.getElementById("EditorNav_faceBox")){
           nav__face.EditorDom.classList.add("hoverClass");
           var faceObj = new EditorNav_faceBox();

           if(!!window.ActiveXObject || "ActiveXObject" in window){
               faceObj.EditorObj.appendChild(faceObj.EditorDom);
           }else{
               faceObj.EditorObj.append(faceObj.EditorDom);
           }

           EditorNav_faceBox.EditorFaceAdd();
       }else{
           nav__face.EditorDom.classList.remove("hoverClass");
           var parent=document.getElementById("EditorNav");
           var child=document.getElementById("EditorNav_faceBox");
           parent.removeChild(child);
       }
    });

};




/*增加qqface*/
EditorNav_faceBox.EditorFaceAdd = function () {
    /*向div.EditorNav_faceBox中增加表情*/
    var windowWidth = window.innerWidth;
    var j;
    if(windowWidth > 750){
        j = 14;
        document.getElementById("EditorNav_faceBox").setAttribute("style","width:300px;")
    }else{
        j = 8;
        document.getElementById("EditorNav_faceBox").setAttribute("style","width:210px;")
    }
    var targetFaceName =[
        "微笑", "撇嘴", "色", "发呆", "得意", "流泪","闭嘴" ,
        "睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过",
        "冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢",
        "饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂",
        "疑问","嘘嘘嘘","晕","折磨","衰","敲打","再见",
        "擦汗","抠鼻","糗大了","坏笑","左哼哼","右哼哼",
        "哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜",
        "拥抱", "月亮","太阳","炸弹","骷髅","菜刀","猪头","西瓜","咖啡","米饭",
        "爱心", "强","弱","合作","胜利","佩服","勾引","好的","不要","玫瑰",
        "坏玫瑰", "亲亲","爱情","飞吻"];

    var targetFace =new Array();
    for(var i =1; i < 76;i++){
         var faceTitle = targetFaceName[i-1];
         var faceObj   = "[face_"+i+"]";
         var facUrl    ="img/"+i+".gif";
         var facegroup ={"faceTitle":faceTitle,"faceObj":faceObj,"facUrl":facUrl};
        targetFace.push(facegroup);
    };

    for(var i= 1;i<targetFace.length;i++){
        var EditorFace = document.createElement("span");
        EditorFace.setAttribute("class", "faceObj");
        EditorFace.setAttribute("id", "faceObj"+i);
        EditorFace.setAttribute("style",'background-image:url("'+targetFace[i].facUrl+'");');
        EditorFace.setAttribute("title",targetFace[i].faceTitle);
        EditorFace.setAttribute("contenteditable",false);
        EditorFace.setAttribute("faceObj",targetFace[i].faceObj);

        if(!!window.ActiveXObject || "ActiveXObject" in window){
            document.getElementById("EditorNav_faceBox").appendChild(EditorFace);
        }else{
            document.getElementById("EditorNav_faceBox").append(EditorFace);
        }

        document.getElementById("faceObj"+[i]).addEventListener("click",function(){
            EditorNav_faceBox.EditorFaceWrite(this);
        });
    };
}


//点击表情赋值给文本 todo 在文字中插入qq表情：未写！
EditorNav_faceBox.EditorFaceWrite =function(that){
    console.log(cursor_potion);
    // cursor_potion.insertNode(that);
    if(cursor_potion != undefined){
        cursor_potion.insertNode(that);
    }else{
        var faceWriteObj = that.outerHTML.toString();
        document.getElementById("EditorText").insertAdjacentHTML("beforeEnd",faceWriteObj);
    }
    document.getElementById("EditorNav_face").click();
};

/*监听光标位置的变化*/
EditorTextOBJ.onclick =EditorTextOBJ.onkeyup= function () {
    var range = window.getSelection().getRangeAt(0);
    cursor_potion = range;
    // console.log(cursor_potion);
    // console.log(cursor_potion.startContainer.parentElement);
}









