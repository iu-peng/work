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

    tools.addEvent(fileList,"click",function (ev){
        var target = ev.target;

        // 找某个祖先为file-item 还要找某个元素为checkbox

        if(  tools.parents(target,".checkbox")  ){

            target = tools.parents(target,".checkbox");

            tools.toggleClass(target,"checked");

        }else if(target = tools.parents(target,".file-item")){
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

    })



    //新建文件夹
    var create = tools.$(".create")[0];

    tools.addEvent(create,"click",function (){
            
    })



    
}());