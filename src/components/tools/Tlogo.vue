<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
      <!-- <img v-if="navTheme === 'dark'" src="~@/assets/logo-white.png" alt="logo">
      <img v-else src="~@/assets/logo.svg" alt="logo">-->
      <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
      
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()" style="font-size: 17px;">
          诚信评价系统
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a rel="noopener noreferrer" href="/report/ArchivesStatisticst" style="font-size: 17px;">招聘大厅管理系统</a>
          </a-menu-item>
          <!-- <a-menu-item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
          </a-menu-item> -->
          <!-- <a-menu-divider />
          <a-menu-item key="3" disabled>3rd menu item（disabled）</a-menu-item> -->
        </a-menu>
      </a-dropdown>
      <!-- <h1 v-if="showTitle">{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin.js'

export default {
  name: 'Logo',
  mixins: [mixin],
  props: {
    title: {
      type: String,
      default: 'Beta',
      required: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
}
</script>
<style lang="less" scoped>
/*缩小首页布 局顶部的高度*/
@height: 59px;

.sider {
  box-shadow: none !important;
  .logo {
    height: @height !important;
    line-height: @height !important;
    box-shadow: none !important;
    transition: background 300ms;

    a {
      color: white;
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &.light .logo {
    background-color: @primary-color;
  }
}
</style>