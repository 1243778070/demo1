/*上传图片到编辑器中js*/
EditorNav_PhotoInto();
function EditorNav_Photo() {
    this.EditorObj = document.getElementById("EditorNav");
}
EditorNav_Photo.prototype =new Editor();

function EditorNav_PhotoInto () {
    var Nav_Photo =new EditorNav_Photo();
    Nav_Photo.EditorDom = document.createElement("button");
    Nav_Photo.EditorDom.setAttribute("class","EditorNav_Obj");
    Nav_Photo.EditorDom.setAttribute("id","EditorNav_Photo");
    Nav_Photo.EditorDom.setAttribute("title","添加图片");

    if(!!window.ActiveXObject || "ActiveXObject" in window){
        Nav_Photo.EditorObj.appendChild(Nav_Photo.EditorDom);
    }else{
        Nav_Photo.EditorObj.append(Nav_Photo.EditorDom);
    }
    /*增加上传按钮*/
    Nav_Photo.EditorDom_file = document.createElement("input");
    Nav_Photo.EditorDom_file.setAttribute("id","EditorNav_file");
    Nav_Photo.EditorDom_file.setAttribute("type","file");

    if(!!window.ActiveXObject || "ActiveXObject" in window){
        Nav_Photo.EditorObj.appendChild(Nav_Photo.EditorDom_file);
    }else{
        Nav_Photo.EditorObj.append(Nav_Photo.EditorDom_file);
    }
    Nav_Photo.EditorDom.onclick=function () {
        Nav_Photo.EditorDom_file.click();
    };
    Nav_Photo.EditorDom_file.addEventListener("change",function () {
        var imgurl = window.URL.createObjectURL(document.getElementById("EditorNav_file").files[0])
        EditorNav_PhotoInto.upload_photo(imgurl);
    })
}



/*上传图像的功能*/
EditorNav_PhotoInto.upload_photo=function (imgurl) {
    document.getElementById("EditorText").focus();
    document.execCommand("insertimage", false, imgurl);
}
