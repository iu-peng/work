<template>
  <div class="project">
    <div class="add-project-box">
      <i class='fa fa-plus-square'></i>
      <span>创建项目</span>
    </div>
    
    <div class="block-content">
      这是工作台页面
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'Project',
    //组件内的钩子，调用之前声明
    /*beforeRouteEnter(to,from,next){
      //next(false)
    }*/
  }
</script>
<style>

</style>
