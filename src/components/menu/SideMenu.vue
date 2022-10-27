<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="200px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <logo/>

    <a-select style="width: 100%"
      @change="handleChange" v-model="subModule">
      <a-select-option v-for="item in subModuleList"
                       :key="parseInt(item.moduleValue)"
                       :value="parseInt(item.moduleValue)">{{item.moduleLabel}}
      </a-select-option>

    </a-select>

    <s-menu
      :collapsed="collapsed"
      :menu="newMenus"
      :theme="theme"
      @select="onSelect"
      :mode="mode"
      :style="smenuStyle">
    </s-menu>
  </a-layout-sider>

</template>

<script>
  import ALayoutSider from "ant-design-vue/es/layout/Sider"
  import Logo from '../tools/Logo'
  import SMenu from './index'
  import {mixin, mixinDevice} from '@/utils/mixin.js'

  export default {
    name: "SideMenu",
    components: {ALayoutSider, Logo, SMenu},
    mixins: [mixin, mixinDevice],
    props: {
      mode: {
        type: String,
        required: false,
        default: 'inline'
      },
      theme: {
        type: String,
        required: false,
        default: 'dark'
      },
      collapsible: {
        type: Boolean,
        required: false,
        default: false
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false
      },
      menus: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        newMenus: [],
        defaultMenus: [],
        zhaopinMenus: [],
        shujuMenus: [],
        chengxinMenus: [],
        zhinengMenus: [],
        subModuleList: [],
        subModule: 0,
      };
    },
    computed: {
      smenuStyle() {
        let style = {'padding': '0'}
        if (this.fixSiderbar) {
          style['height'] = 'calc(100% - 59px)'
          style['overflow'] = 'auto'
          style['overflow-x'] = 'hidden'
        }
        return style
      }
    },
    mounted: function () {
      // console.log('menus: ' + JSON.stringify(this.menus))
      let has = false;
      this.menus.forEach((item, index) => {
        console.log(index + ', ' + JSON.stringify(item))
        if (item.name === 'dashboard-analysis') {
          this.defaultMenus.push(item);
          this.zhaopinMenus.push(item);
          this.shujuMenus.push(item);
          this.chengxinMenus.push(item);
          this.zhinengMenus.push(item);
        } else if (item.name === 'zhaopin') {
          has = true;
          this.subModuleList.push({moduleLabel: '招聘大厅管理系统', moduleValue: 1})
          // this.zhaopinMenus.push(item);
          if (item.children) {
            item.children.forEach(it => {
              console.log('zhaopin: ' + JSON.stringify(it));
              this.zhaopinMenus.push(it);
            });
          }
        } 
        // else if (item.name === 'shuju') {
        //   this.subModuleList.push({moduleLabel: '数据管理子系统', moduleValue: 2})
        //   // this.shujuMenus.push(item);
        //   if (item.children) {
        //     item.children.forEach(it => {
        //       this.shujuMenus.push(it);
        //     });
        //   }
        // } else if (item.name === 'chengxin') {
        //   this.subModuleList.push({moduleLabel: '诚信评价子系统', moduleValue: 3})
        //   // this.chengxinMenus.push(item);
        //   if (item.children) {
        //     item.children.forEach(it => {
        //       this.chengxinMenus.push(it);
        //     });
        //   }
        // } else if (item.name === 'zhineng') {
        //   this.subModuleList.push({moduleLabel: '智能发布子系统', moduleValue: 4})
        //   // this.zhinengMenus.push(item);
        //   if (item.children) {
        //     item.children.forEach(it => {
        //       this.zhinengMenus.push(it);
        //     });
        //   }
        // } 
        else {
          this.defaultMenus.push(item);
        }
      });
      this.subModuleList.push({moduleLabel: '系统管理', moduleValue: 0});
      if (has) {
        this.subModule = 1;
        this.newMenus = this.zhaopinMenus;
      } else {
        this.subModule = 0;
        this.newMenus = this.defaultMenus;
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
        switch (value) {
          case 1: {
            this.newMenus = this.zhaopinMenus;
            break;
          }
          case 2: {
            this.newMenus = this.shujuMenus;
            break;
          }
          case 3: {
            this.newMenus = this.chengxinMenus;
            break;
          }
          case 4: {
            this.newMenus = this.zhinengMenus;
            break;
          }
          default : {
            this.newMenus = this.defaultMenus;
          }
        }
      },
      onSelect(obj) {
        this.$emit('menuSelect', obj)
      }
    }
  }
</script>
<style lang="less" scoped>

  /* update_begin author:sunjianlei date:20190509 for: 修改侧边导航栏滚动条的样式 */
  .sider {
    @scrollBarSize: 10px;

    ul.ant-menu {

      /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

      &::-webkit-scrollbar {
        width: @scrollBarSize;
        height: @scrollBarSize;
        background-color: transparent;
        display: none;
      }

      & .-o-scrollbar {
        display: none;
      }

      /* 兼容IE */
      -ms-overflow-style: none;
      -ms-scroll-chaining: chained;
      -ms-content-zooming: zoom;
      -ms-scroll-rails: none;
      -ms-content-zoom-limit-min: 100%;
      -ms-content-zoom-limit-max: 500%;
      -ms-scroll-snap-type: proximity;
      -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);

      /* 定义滚动条轨道 */

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      /* 定义滑块 */

      &::-webkit-scrollbar-thumb {
        border-radius: @scrollBarSize;
        background-color: #eee;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

        &:hover {
          background-color: #dddddd;
        }

        &:active {
          background-color: #bbbbbb;
        }
      }
    }

    /** 暗色系滚动条样式 */

    &.dark ul.ant-menu {
      &::-webkit-scrollbar-thumb {
        background-color: #666666;

        &:hover {
          background-color: #808080;
        }

        &:active {
          background-color: #999999;
        }
      }
    }

  }

  /* update_end author:sunjianlei date:20190509 for: 修改侧边导航栏滚动条的样式 */

</style>

<!-- update_begin author:sunjianlei date:20190530 for: 选中首页的时候不显示背景颜色 -->
<style lang="less">
  .ant-menu.ant-menu-root {
    & > .ant-menu-item:first-child {
      background-color: transparent;

      & > a, & > a:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &.ant-menu-item-selected {
        & > a, & > a:hover {
          color: @primary-color;
        }
      }
    }

    &.ant-menu-dark > .ant-menu-item:first-child {
      & > a, & > a:hover {
        color: rgba(255, 255, 255, 0.65);
      }

      &.ant-menu-item-selected {
        & > a, & > a:hover {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
<!-- update_end author:sunjianlei date:20190530 for: 选中首页的时候不显示背景颜色 -->