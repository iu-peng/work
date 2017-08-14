;(function (){

  //处理一下自适应高度问题

  //让下面这一块自适应屏幕的高度
  var weiyunContent = tools.$(".weiyun-content")[0];
  var header = tools.$(".header")[0];
  changeHeight();
  function changeHeight(){
    var clinetH = tools.view().H;  //可视区的高
    weiyunContent.style.height = clinetH - header.offsetHeight + "px";  
  }
  //绑定一个resize
  tools.addEvent(window,"resize",changeHeight);

  //准备数据

  var datas = data.files;

  //先渲染文件区域

    function createFilesHtml(datas,id){
        var childs = dataAction.getChildsById(datas,id);
        var str = '';
        for( var i = 0; i < childs.length; i++ ){
          str += view.createFileConstruct(childs[i]);
        }
        return str;
    }
  
  //文件区域的容器
  var fileList = tools.$(".file-list")[0];

  fileList.innerHTML = createFilesHtml(datas,0);

  //文件导航区域

  var pathNav = tools.$(".path-nav")[0];

  pathNav.innerHTML = view.createPathNavConstruct(datas,0);

  //菜单区域的容器
  var treeMenu = tools.$(".tree-menu")[0];

  treeMenu.innerHTML = view.createTreeHtml(datas,-1);

  //--------------------渲染文件和导航和树形区域--------------------

function renderFileNavTree(fileId){
    //渲染文件区域
    fileList.innerHTML = createFilesHtml(datas,fileId);
    //导航区
    pathNav.innerHTML = view.createPathNavConstruct(datas,fileId);

    //定位到属性导航区中某一个菜单上

    var prev = tools.getTreeById("tree-title",prevId);
    var tree = tools.getTreeById("tree-title",fileId);
    tools.removeClass(prev,"tree-nav");
    tools.addClass(tree,"tree-nav");
    prevId = fileId;

    //重新生成了文件区域的文件结构，所以需要重新把checkbox绑定事件处理程序
    checkboxAddEvent();
}

//找到那些被选中的file-item

    function whoSelect(){
        var arr = [];
        for( var i = 0; i < checkboxs.length; i++ ){
            if( tools.hasClass(checkboxs[i],"checked") ){
                arr.push(tools.parents(checkboxs[i],"file-item"));
            }
        }
        return arr;

    }

    //提示框的封装
    var fullTipBox = tools.$(".full-tip-box")[0];
    var fullText = tools.$(".text",fullTipBox)[0];

    //标记一下，明天用Mtween改写这一块？？？？？？？

    function fullTip(classNames,message){

        //先瞬间拉回到-32，在运动到0
        fullTipBox.style.transition = "none";
        fullTipBox.style.top = "-32px";
        
        setTimeout(function (){
           tools.addClass(fullTipBox,classNames);
            fullTipBox.style.transition = ".3s";
            fullTipBox.style.top = 0;     
        },0);

        fullText.innerHTML = message;
        clearTimeout(fullTipBox.timer);
        fullTipBox.timer = setTimeout(function (){
            fullTipBox.style.top = "-32px";   
        },2000);
    }



  //功能
  //-----------------文件区域的功能--------------------

    tools.addEvent(fileList,"mouseover",function (ev){
        var target = ev.target;

        if( target = tools.parents(target,".file-item") ){
         
          //target = tools.parents(target,".file-item");

          tools.addClass(target,"file-checked");
        }
    });
    tools.addEvent(fileList,"mouseout",function (ev){
        var target = ev.target;

        if( target = tools.parents(target,".file-item") ){
         
            //target = tools.parents(target,".file-item");

           

            //找到这个元素中的checkbox
            var checkbox = tools.$(".checkbox",target)[0];

            if( !tools.hasClass(checkbox,"checked") ){
                 tools.removeClass(target,"file-checked");
            }


        }
    });

    var prevId = 0;  //记录操作的树形菜单的id
    //找到第一个tree，添加上class
    tools.addClass(tools.getTreeById("tree-title",prevId),"tree-nav");

    tools.addEvent(fileList,"click",function (ev){
        var target = ev.target;

        // 找某个祖先为file-item 还要找某个元素为checkbox

        if(target = tools.parents(target,".file-item")){

            var fileId = target.dataset.fileId;
            renderFileNavTree(fileId);
        }
    });

    //文件导航区域
    tools.addEvent(pathNav,"click",function (ev){
        var target = ev.target;
        if( target = tools.parents(target,"a") ){
            var fileId = target.dataset.fileId;
            renderFileNavTree(fileId);
        }  
    });

    //树形菜单区域

    tools.addEvent(treeMenu,"click",function (ev){
        var target = ev.target;
        if( target = tools.parents(target,".tree-title") ){
            var fileId = target.dataset.fileId;
            renderFileNavTree(fileId);
            
        }    
    });

    /*
        tools.addEvent(create,"click",function (){
            
        })
    */

    //全选单选

    //全选按钮
    var checkedAll = tools.$(".checked-all")[0];

    //找到所有的文件
    var fileItems = tools.$(".file-item",fileList);
    //找到所有的checkbox
     var checkboxs = tools.$(".checkbox",fileList);

    tools.addEvent(checkedAll,"click",function (){
        var isAddClass = tools.toggleClass(this,"checked");

        if( isAddClass ){ //已添加上对应的class

            for( var i = 0; i < fileItems.length; i++ ){
                tools.addClass(fileItems[i],"file-checked");
                tools.addClass(checkboxs[i],"checked");
            }

        }else{
            for( var i = 0; i < fileItems.length; i++ ){
                tools.removeClass(fileItems[i],"file-checked");
                tools.removeClass(checkboxs[i],"checked");

            }
        }

    });

    //给每一个checkbox添加点击处理程序
    checkboxAddEvent();
    function checkboxAddEvent(){
        for( var i = 0; i < checkboxs.length; i++ ){
            tools.addEvent(checkboxs[i],"click",function (ev){
                var isAddClass = tools.toggleClass(this,"checked");
                if( isAddClass ){
                    if( whoSelect().length === checkboxs.length  ){
                        tools.addClass(checkedAll,"checked");
                    }

                }else{
                    tools.removeClass(checkedAll,"checked");
                }


                ev.stopPropagation();
            })
        } 

    }


    //新建文件夹
    var create = tools.$(".create")[0];

    tools.addEvent(create,"click",function (ev){

        if( this.isCreateFile ){
            return;
        }

        this.isCreateFile  = true;

        //在fileList之前要出现一个文件

        var html = view.createFileConstruct({});

        fileList.innerHTML = html + fileList.innerHTML;

        var first = fileList.firstElementChild;

        var fileTitle = tools.$(".file-title",first)[0];
        var fileEdtor = tools.$(".file-edtor",first)[0];

        fileTitle.style.display = "none";
        fileEdtor.style.display = "block";

        var edtor = tools.$(".edtor",first)[0];

        edtor.focus();

        tools.addEvent(edtor,"click",function (ev){
            ev.stopPropagation();    
        });
        tools.addEvent(edtor,"mousedown",function (ev){
            ev.stopPropagation();    
        });

        //每点击一次新建按钮，就会绑定一次click事件处理程序
        /*tools.addEvent(document,"click",function (){
             console.log( 123 );   
        })*/

    });

    //点击document，判断是否新建
    tools.addEvent(document,"mousedown",function (){
        if( create.isCreateFile ){
            var first = fileList.firstElementChild;
            var fileTitle = tools.$(".file-title",first)[0];
            var fileEdtor = tools.$(".file-edtor",first)[0];
            var edtor = tools.$(".edtor",first)[0];

            var edtorVal = edtor.value.trim();

            //导航中最后一个元素
            var pathNavLast = tools.$("span",pathNav)[0];
            var pid = pathNavLast.dataset.fileId;

            if( edtorVal === "" ){  //新建不成功
                fileList.removeChild(first);

            }else if(dataAction.reName(datas,pid,edtorVal)){
                fileList.removeChild(first);



            }else{ //新建成功

                fileTitle.innerHTML = edtorVal;

                fileTitle.style.display = "block";
                fileEdtor.style.display = "none";

                //向数据中添加一条新的文件信息

                var newFile = {
                    id: tools.uuid(),
                    pid:pid,
                    title:edtorVal,
                    type:"file"
                };

                datas.unshift(newFile);

                //提醒
                fullTip("ok","新建文件夹成功");

                //要找到当前这个新建的文件的父级对应的左侧树形菜单，
                //找到下一级 > ul

                var tree = tools.getTreeById("tree-title",pid);
                var nextUl = tree.nextElementSibling;

                nextUl.innerHTML += view.createTreeLi(datas,newFile);

                tools.removeClass(checkedAll,"checked");
            }

            create.isCreateFile = false;
        }
    });

    //框选

    var newDiv = null;
    var disX = disY = 0;
    tools.addEvent(document,"mousedown",function (ev){
        var target = ev.target;
        ev.preventDefault(); 
        if( tools.parents(target,".handleFile") || 
            tools.parents(target,".tree-menu")  ||
            tools.parents(target,".lay-aside")
          ){
            return;
        }

        newDiv = null;
        disX = ev.clientX;
        disY = ev.clientY;
        tools.addEvent(document,"mousemove",moveFn);
        tools.addEvent(document,"mouseup",upFn);

        for( var i = 0; i < fileItems.length; i++ ){
            tools.removeClass(fileItems[i],"file-checked");
            tools.removeClass(checkboxs[i],"checked");
        }
        tools.removeClass(checkedAll,"checked");


       
    })

    function moveFn(ev){ 
        if( Math.abs(ev.clientX - disX) > 20 ||  Math.abs(ev.clientY - disY) > 20 ){

            if( !newDiv ){

                newDiv = document.createElement("div");
                newDiv.className = "selectTab";
                newDiv.style.left = disX + "px";
                newDiv.style.top = disX + "px";

                document.body.appendChild(newDiv);
            }


            newDiv.style.width = Math.abs(ev.clientX - disX) + "px";
            newDiv.style.height = Math.abs(ev.clientY - disY) + "px";

            newDiv.style.left = Math.min(ev.clientX , disX)+1 + "px";
            newDiv.style.top = Math.min(ev.clientY , disY)+1 + "px";

            //拖拽的过程中，newDiv和哪一个box碰上了
            /*
                碰上了 box为蓝色的背景
                没碰上 box为红色的背景
            */

            for( var i = 0; i < fileItems.length; i++ ){
                if( tools.duang(newDiv,fileItems[i]) ){
                   tools.addClass(fileItems[i],"file-checked");
                   tools.addClass(checkboxs[i],"checked");
                }else{
                   tools.removeClass(fileItems[i],"file-checked");
                   tools.removeClass(checkboxs[i],"checked");
                }
            }
        }  
    }
    function upFn(){
        tools.removeEvent(document,"mousemove",moveFn);
        tools.removeEvent(document,"mouseup",upFn);
        if( newDiv ) document.body.removeChild(newDiv);

        if( whoSelect().length === checkboxs.length ){
            tools.addClass(checkedAll,"checked");
        }
    }



}());