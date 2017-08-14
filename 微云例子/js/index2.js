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

  function renderFileNavTree(id){
          
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

          tools.removeClass(target,"file-checked");
        }
    });

    var prevId = 0;  //记录操作的树形菜单的id

    tools.addEvent(fileList,"click",function (ev){
        var target = ev.target;
        if( target = tools.parents(target,".file-item") ){

            var fileId = target.dataset.fileId;
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
    });

    //文件导航区域
    tools.addEvent(pathNav,"click",function (ev){
        var target = ev.target;
        if( target = tools.parents(target,"a") ){
            var fileId = target.dataset.fileId;
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
    });

    //树形菜单区域

    tools.addEvent(treeMenu,"click",function (ev){
        var target = ev.target;
        if( target = tools.parents(target,".tree-title") ){
            var fileId = target.dataset.fileId;
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
    })



    
}());