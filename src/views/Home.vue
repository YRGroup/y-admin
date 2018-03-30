<template>
  <el-container class="container">
    <el-header class="header">
      <el-col :span="4" class="logo" :class="collapsed ? 'logo-collapse-width':'logo-width'">
      {{sysName}}
      </el-col>
      <el-col :span="3" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-lick userinfo-inner">
            <img :src="this.sysUserAvatar" /> {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown"> 
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="2" style="float:right">
        <el-select @change="setSchoolYear()" v-model="schoolYear"  placeholder="选择学年">
            <el-option
            v-for="item in schoolYearList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
      </el-col>
    </el-header>
    <el-container>
      <el-aside :width="asideWidth" style="position:relative;overflow:hidden">
        <!--导航菜单-->
        <el-menu
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          background-color="#324157"
          :default-active="$route.path" 
          class="el-menu-vertical-demo" 
          @open="handleopen" 
          @close="handleclose" 
          @select="handleselect" 
          :collapse="collapsed"
          unique-opened router>
          <el-menu-item index="/">
            <i class="fa fa-home"></i>
            <span slot="title">主页</span>
            </el-menu-item>
          <el-submenu index="global"  v-if="cardRole">
            <template slot="title">
              <i class="fa fa-id-card-o"></i>
              <span slot="title">全局内容</span>
            </template>
            <el-menu-item index="/news/newsList" v-if="roleList.includes('news')">新闻</el-menu-item>
            <el-menu-item index="/news/swiperList" v-if="roleList.includes('banner')">轮播图</el-menu-item>
          </el-submenu>
          <el-submenu index="user"  v-if="cardRole">
            <template slot="title">
              <i class="fa fa-users"></i> <span slot="title">用户管理</span></template>
            <el-menu-item index="/alluser">所有用户</el-menu-item>
            <el-menu-item index="/adminList" v-if="roleList.includes('super')">管理员</el-menu-item>
          </el-submenu>
          <el-submenu index="exam" v-if="cardRole">
            <template slot="title">
              <i class="fa fa-id-card-o"></i> <span slot="title">班级管理</span></template>
            <el-menu-item index="/class/list" v-if="roleList.includes('class')"> 班级列表</el-menu-item>
            <el-menu-item index="/post/list">班级动态</el-menu-item>
            <el-menu-item index="/post/homework">作业</el-menu-item> 
            <el-menu-item index="/exam/list">考试列表</el-menu-item>
            <el-menu-item index="/exam/add">添加考试</el-menu-item>
          </el-submenu>
          <el-submenu index="video"  v-if="cardRole">
            <template slot="title">
              <i class="iconfont">&#xe705;</i> <span slot="title">视频课程</span></template>
            <el-menu-item index="/video/list">视频列表</el-menu-item>
          </el-submenu>
          <el-submenu index="note" v-if="cardRole">
            <template slot="title">
              <i class="iconfont">&#xe61b;</i> <span slot="title">短信通知</span></template>
            <el-menu-item index="/note/list">短信列表</el-menu-item>
            <el-menu-item index="/notice/list">校园通知</el-menu-item>
          </el-submenu>
          <el-menu-item index="/schoolCard">
            <i class="fa fa-home"></i>
            <span slot="title">一卡通</span>
            </el-menu-item>
        </el-menu>
        <el-button class="colBtn" size="mini" @click="collapse()">
          <span v-show="!collapsed"><i class="iconfont">&#xe933;</i></span>
          <span  v-show="collapsed"><i class="iconfont">&#xe934;</i></span>
        </el-button>
      </el-aside>
      <el-main>
        <div>
          <el-col class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <!-- 路由记录生成面包屑 -->
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.name">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import { mapGetters } from "vuex";

export default {
  data() {
    return {
      schoolYearList: [{
        value: 2017,
        label: '2017学年'
        }, {
          value: 2018,
          label: '2018学年'
      }],
      schoolYear:2018,
      debug: [
        "this",
        "router",
        "vuex",
        "cookie",
        "localStorage",
        "sessionStorage"
      ],
      sysName: "智慧校园管理后台",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
    };
  },
  computed: {
    cardRole() {
      let phone = this.$store.state.user.Mobilephone
      return (phone == 13100001001) ? false : true
    },
    asideWidth(){
        return this.collapsed?'60px':'230px'
    },
    roleList(){
      return this.$store.getters.roleList
    },
    // ...mapGetters({
    //   roleList: "roleList"
    // })
  },
  created(){
    this.$store.commit('setSchoolYear',this.schoolYear)
    console.log(this.$store.getters.schoolYear)
  },
  methods: {
    setSchoolYear(){
      this.$store.commit('setSchoolYear',this.schoolYear)
     this.$store.commit('setClassList',[])
      this.$router.push('/')
    },
    showInfo(val) {
      if (val === "this") {
        console.log(val);
        console.log(this);
      } else if (val === "router") {
        console.log(val);
        console.log(this.$route.params);
      } else if (val === "vuex") {
        console.log(val);
        console.log(this.$store.state);
      } else if (val === "cookie") {
        console.log(val);
        console.log(document.cookie);
      } else if (val === "localStorage") {
        console.log(val);
        console.log(localStorage);
      } else if (val === "sessionStorage") {
        console.log(val);
        console.log(sessionStorage);
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    // 退出登录
    logout() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },

    // 折叠导航栏
    collapse() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    // console.log("user",user);
    if (user) {
      user = JSON.parse(user);
      this.$store.commit("setUser", user);
      this.sysUserName = user.TrueName || "";
      this.sysUserAvatar = user.Headimgurl || "";
    }
  },
};
</script>
<style scoped lang="scss">
@import "~scss_vars";
.el-aside {
  background-color: #324157;
  transition: width .5s ease;
}
.container {
  height: 100%;
  .header {
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
 .el-menu-vertical-demo{
    border-right: none;
  }
  .breadcrumb-container {
    //margin-bottom: 15px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: right;
    }
  }
  .colBtn{
    position: absolute;
    right:0;
    bottom: 0;
    padding: 5px;
    .iconfont{
      margin: 0;
    }
  }

}
</style>
