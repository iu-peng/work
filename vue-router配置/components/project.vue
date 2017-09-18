<template>
  <div class="project">
    <header-nav></header-nav>
    <div class="add-project-box">
      <i class='fa fa-plus-square'></i>
      <span>创建项目</span>
    </div>
    <div class="block-content">
      这是工作台页面
    </div>
  </div>
</template>

<script>
  import HeaderNav from '@/components/header'

  export default {
    name: 'Project',
    components: {
      HeaderNav
    }
  }
</script>
<style>

</style>
