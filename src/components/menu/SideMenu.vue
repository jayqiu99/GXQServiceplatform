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
          this.subModuleList.push({moduleLabel: '????????????????????????', moduleValue: 1})
          // this.zhaopinMenus.push(item);
          if (item.children) {
            item.children.forEach(it => {
              console.log('zhaopin: ' + JSON.stringify(it));
              this.zhaopinMenus.push(it);
            });
          }
        } 
        // else if (item.name === 'shuju') {
        //   this.subModuleList.push({moduleLabel: '?????????????????????', moduleValue: 2})
        //   // this.shujuMenus.push(item);
        //   if (item.children) {
        //     item.children.forEach(it => {
        //       this.shujuMenus.push(it);
        //     });
        //   }
        // } else if (item.name === 'chengxin') {
        //   this.subModuleList.push({moduleLabel: '?????????????????????', moduleValue: 3})
        //   // this.chengxinMenus.push(item);
        //   if (item.children) {
        //     item.children.forEach(it => {
        //       this.chengxinMenus.push(it);
        //     });
        //   }
        // } else if (item.name === 'zhineng') {
        //   this.subModuleList.push({moduleLabel: '?????????????????????', moduleValue: 4})
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
      this.subModuleList.push({moduleLabel: '????????????', moduleValue: 0});
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

  /* update_begin author:sunjianlei date:20190509 for: ??????????????????????????????????????? */
  .sider {
    @scrollBarSize: 10px;

    ul.ant-menu {

      /* ?????????????????????????????? ??????????????????????????????????????????*/

      &::-webkit-scrollbar {
        width: @scrollBarSize;
        height: @scrollBarSize;
        background-color: transparent;
        display: none;
      }

      & .-o-scrollbar {
        display: none;
      }

      /* ??????IE */
      -ms-overflow-style: none;
      -ms-scroll-chaining: chained;
      -ms-content-zooming: zoom;
      -ms-scroll-rails: none;
      -ms-content-zoom-limit-min: 100%;
      -ms-content-zoom-limit-max: 500%;
      -ms-scroll-snap-type: proximity;
      -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);

      /* ????????????????????? */

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      /* ???????????? */

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

    /** ???????????????????????? */

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

  /* update_end author:sunjianlei date:20190509 for: ??????????????????????????????????????? */

</style>

<!-- update_begin author:sunjianlei date:20190530 for: ?????????????????????????????????????????? -->
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
<!-- update_end author:sunjianlei date:20190530 for: ?????????????????????????????????????????? -->