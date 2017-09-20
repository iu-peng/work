<template>
  <div>
    <div class="doc">
      <div class="doc-nav">
        <ul class="main-menu">
          <li>
            <router-link :to="{path:'#base'}">基础</router-link>
            <ul class="nav-dropdown">
              <li>
                <router-link :to="{path:'#start'}">开始</router-link>
              </li>
              <li>
                <router-link :to="{path:'#dongtai'}">动态路由</router-link>
              </li>
              <li>
                <router-link :to="{path:'#qiantaoluyou'}">嵌套路由</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link :to="{path:'#jinjie'}">进阶</router-link>
            <ul class="nav-dropdown">
              <li>
                <router-link :to="{path:'#jinjie1'}">导航钩子</router-link>
              </li>
              <li>
                <router-link :to="{path:'#jinjie2'}">路由元信息</router-link>
              </li>
              <li>
                <router-link :to="{path:'#jinjie3'}">过渡动效</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="doc-view">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>
<style>

</style>
