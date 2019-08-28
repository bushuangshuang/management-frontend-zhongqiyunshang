<template>
  <Layout style="height:100%" class="main">
    <Header class="header-con" style="background-color:#f45416;color:#fff">
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
        <user :message-unread-count="messageUnreadCount" :user-avator="userPhoto"/>
        <div class="status">{{userName}}</div>
        <div class="line-status">|</div>
        <div class="status">状态：启用</div>
      </header-bar>
    </Header>
    <Layout>
      <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
        <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <!--<div class="logo-con">
            <img v-show="!collapsed" :src="logoText" key="logo-text" />
            <img v-show="collapsed" :src="minLogo" key="min-logo" />
          </div>-->
        </side-menu>
      </Sider>
      <Content><!--class="main-content-con"-->
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <div class="bg-fff">
            <keep-alive >
              <router-view v-if="$route.meta.keepAlive"/>
            </keep-alive>
              <router-view v-if="!$route.meta.keepAlive">
              </router-view>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Footer class="footer">
      平台运营：中企云商科技股份有限公司
      联系电话：0000000000000000
      地址：某某市
      备案号
    </Footer>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual, getMenuByRouter } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import logoText from '@/assets/images/logo.jpg'
import { storage } from '@/libs/common.js'
import './main.less'
import { imgFileUrl } from '@/api/common'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    ErrorStore,
    User
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      logoText,
      isFullscreen: false,
      userName: '',
      userPhoto: ''
    }
  },
  computed: {
    ...mapGetters([
      'errorCount',
      'messageUnreadCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    cacheList () {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
    menuList () {
      // return this.$store.getters.menuList
      return getMenuByRouter(storage.getItem('accessList'), storage.getItem('userRole'))
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      if (route === 'logisticsSystemPage') {
        let logisticsUser = storage.getItem('logisticsUser')
        let item_name = logisticsUser.item_name
        let user_name = logisticsUser.user_name
        let user_pass = logisticsUser.user_pass
        // let item_name = localStorage.getItem('item_name')
        // let user_name = localStorage.getItem('user_name')
        // let user_pass = localStorage.getItem('user_pass')
        window.open('http://7210.zqys.ltd/user/getUserLogin_Wl.asp?item_name=' + item_name + '&user_name=' + user_name + '&user_pass=' + user_pass, '_blank')
        return
      }
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type === 'all') {
        this.turnToPage(this.$config.homeName)
      } else if (routeEqual(this.$route, route)) {
        if (type !== 'others') {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)

    if (localStorage.getItem('userInfo')) {
      // setAvator
      let userInfoStr = localStorage.getItem('userInfo')
      let userInfoObj = JSON.parse(userInfoStr)
      this.userName = userInfoObj.username
      this.userPhoto = imgFileUrl + userInfoObj.photo
    }
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>
<style lang='less'>
  .ivu-layout{
    display: -webkit-box!important;
  }
 .main{
  .left-sider{
    background-color: #ffffff;
  }
 }
  .logo-con{
    display: flex;
    flex-direction: row;
  }
 .tag-nav-wrapper{
   padding: 0;
   height:40px;
   background:#F0F0F0;
 }
 .ivu-tag-primary, .ivu-tag-primary.ivu-tag-dot .ivu-tag-dot-inner{
   background: #f45416!important;
 }
 .footer{text-align:center;color: #999999!important;}
 .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover{
   background: rgba(244, 84, 22, 0.2)!important;
 }
 .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
   color: #f45416!important;
 }
 .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
   background:  #f45416!important;
 }
 .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
   color: #f45416!important;
 }
 .ivu-menu-vertical.ivu-menu-light:after {
   content: '';
   display: block;
   width: 0px;
   height: 100%;
   background: #fff!important;
   position: absolute;
   top: 0;
   bottom: 0;
   right: 0;
   z-index: 1;
 }
</style>
