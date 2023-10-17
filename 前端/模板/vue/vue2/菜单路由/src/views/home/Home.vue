<template>
  <div class="home" id="app" v-loading="loading">
    <div class="left-menu">
      <div class="logo">
        <p class="title">活动评比</p>
      </div>
      <div class>
        <Menu router :default-active="defaultLeftMenu" class="menu">
          <div v-for="(item, index) in menuList" :key="`firstLevel${index}`">
            <elMenuItem v-if="!('children' in item)" :index="item.src">
              <template slot="title">
                <div class="container">
                  <span class="icon-container">
                    <i class="iconfont" :class="item.icon"></i>
                  </span>
                  <span>{{ item.title }}</span>
                </div>
              </template>
            </elMenuItem>
            <Submenu v-else :index="item.src">
              <template slot="title">
                <span class="icon-container">
                  <i class="iconfont" :class="item.icon"></i>
                </span>
                <span>{{ item.title }}</span>
              </template>
              <elMenuItem
                v-for="(row, key) in item.children"
                :key="`secondLevel${key} `"
                :index="`${item.src}${row.src}`"
              >
                <template slot="title">
                  <div class="container">
                    <span>{{ row.title }}</span>
                  </div>
                </template>
              </elMenuItem>
            </Submenu>
          </div>
        </Menu>
      </div>
    </div>
    <div class="right-content">
      <div class="top-bar clearfix">
        <span class="title" v-if="path == '/'">最新活动</span>
        <button type="button" class="back-button" @click="goBack" v-if="isShowBack">返回</button>
        <router-link
          to="/allActivity/list"
          class="home-more-active"
          v-if="defaultLeftMenu == '/'"
        >查看更多&nbsp;&gt;&gt;</router-link>
        <span class="message pull-right">
          <Popover width="300">
            <ul class="todo-message">
              <li
                v-for="(item, index) in messageList"
                :key="`message${index}`"
                class="clearfix"
                @click="$messageToDetail(item)"
              >
                <span class="red-hot" v-if="!item.isHandle"></span>
                <span class="title time">{{timeToString(item.date)}}</span>
                <span class="title">{{item.content}}</span>
              </li>
            </ul>
            <Badge class="badge" slot="reference" :is-dot="!!messageList.length">
              <i class="iconfont iconicon_news" title="消息"></i>
            </Badge>
          </Popover>
        </span>
      </div>
      <!-- <keep-alive>
        <router-view v-if="path !== '/'" :include="['message']"></router-view>
      </keep-alive>-->
      <router-view v-if="path !== '/'" :include="['message']"></router-view>
      <homeContent v-if="path === '/'"></homeContent>
    </div>
  </div>
</template>
<script>
import getDefaultMenu from "@/views/home/menu.js";
import { Menu, MenuItem, Submenu, Badge, Popover} from "element-ui";
import homeContent from "./homeContent.vue";
export default {
  name: "Home",
  components: {
    Menu,
    elMenuItem: MenuItem,
    Submenu,
    homeContent,
    Badge,
    Popover
  },
  data() {
    return {
      userRole: [],
      menuList: [],
      defaultActiveMenu: "/",
      currentTitle: "",
      isShowBack: true,
      activities: [],
      userInfo: {},
      worksList: [],
      loading: false,
      messageList: []
    };
  },
  created() {

  },
  computed: {
    path() {
      return this.$route.path;
    },
    defaultLeftMenu() {
      return "/";
    },
    role() {
      return [];
    }
  },
  mounted() {
    this.menuList = this.getAllMenu();
  },
  beforeDestroy() {
  },
  methods: {

    localLogin() {

    },
    goBack() {
      if (history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.replace("/");
      }
    },
    setPageTitle(title) {
      this.currentTitle = title;
    },
    hideBackButton(value) {
      this.isShowBack = !value;
    },
    getAllMenu() {
      let menu = getDefaultMenu();
      let result = menu.filter((item) => {
        let result = this.getMenu(item);
        return result;
      });
      return result;
    },
    getMenu(menu) {
      if ("role" in menu) {
        let isHasRights = true
        if (isHasRights) {
          if ("children" in menu) {
            menu.children = menu.children.filter((item) => {
              let result = this.getMenu(item);
              return result;
            });
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
      return true;
    },
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;

  font-family: "PingFang SC", "Microsoft YaHei", arial, "Hiragino Sans GB",
    "Hiragino Sans";
  background-color: #f5f6fa;
  height: 100%;
  .left-menu {
    width: 200px;
    height: 100%;
    background-color: white;
    height: 100%;
    overflow: auto;
    .logo {
      text-align: center;
      margin: 24px 0px;
      .title {
        color: #383874;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 1.5px;
      }
    }
    .menu {
      border: none;
      .icon-container {
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        margin: 4px 6px;
        border-radius: 6px;
        i {
          color: #65657d;
        }
      }
      .el-menu-item {
        position: relative;
        min-width: 50px;
        overflow: hidden;
        height: 48px;
        line-height: 48px;
        &::after {
          content: "";
          width: 4px;
          height: 32px;
          position: absolute;
          right: 0px;
          top: 9px;
          border-radius: 2px;
        }
        .container {
          margin-right: 20px;
          position: relative;
          span {
            position: relative;
            z-index: 2;
          }
          .icon-container {
            transition: background-color 0.6s;
            i {
              transition: color 0.6s;
            }
          }
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #dfe0f2;
            opacity: 0;
            transform: scale3d(0.7, 1, 1);
            transition: transform 0.6s, opacity 0.6s;
            transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
          }
        }
        &:hover {
          color: #383874;
          .icon-container {
            background-color: #5a5ab5;
            i {
              color: #e8e9f6;
            }
          }
          .container {
            &::before {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
        }
        &.is-active {
          .container {
            background-color: #dfe0f2;
            color: #383874;
          }
          .icon-container {
            background-color: #5a5ab5;
            i {
              color: #e8e9f6;
            }
          }
          &::after {
            background: #5a5ab5;
          }
        }
      }
      .el-menu-item,
      .el-submenu {
        &:hover,
        &:focus {
          background: none;
        }
        padding-left: 40px !important;
      }
      .el-submenu .el-menu-item {
        padding-left: 5px !important;
      }
    }
  }
  .right-content {
    flex: 1;
    height: 100%;
    margin: 0 16px;
    overflow: hidden;
    .top-bar {
      height: 48px;
      line-height: 48px;
      overflow: hidden;
      position: relative;
      .home-more-active {
        position: absolute;
        right: 33%;
        margin-right: 32px;
        color: #5c627d;
        text-decoration: none;
      }
      .title {
        font-size: 18px;
        font-weight: bold;
        & + .back-button {
          margin-left: 16px;
        }
      }
      .logout,
      .message {
        font-size: 16px;
        height: 48px;
        .badge {
          line-height: 1;
        }
        i {
          font-size: 20px;
        }
      }
    }
  }
}
.user-info-container {
  width: 168px;
  height: 139px;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 32px;
  &:hover {
    img {
      transform: scale(1.1);
      transition-duration: 0.2s;
    }
  }
  .info {
    margin-top: -48px;
    padding-top: 4px;
    padding-left: 12px;
    position: relative;
    .icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      position: relative;
      margin-right: 8px;
      background-position: center;
      background-size: cover;
    }
    p {
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style scoped>
.el-submenu >>> .el-submenu__title {
  padding-left: 0px !important;
}
.el-submenu >>> .container {
  padding-left: 25px;
  margin-right: 0px !important;
}
.el-submenu >>> .el-submenu__title:hover {
  background: none;
}
.back-button {
  color: #383874;
  border-radius: 8px;
  width: 90px;
  height: 32px;
  outline: none;
  cursor: pointer;
  line-height: 32px;
  border-width: 0px;
  background-color: #dfe0f2;
}
.back-button:hover {
  background-color: #383874;
  color: white;
}
.todo-message {
  list-style: none;
  padding: 8px;
}
.todo-message img {
  border-radius: 50%;
  margin-right: 8px;
}
.todo-message li {
  margin-bottom: 8px;
  position: relative;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;
}
.todo-message li:hover {
  background-color: #f5f6fa;
}
.todo-message li .red-hot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  left: 29px;
  top: 8px;
  background-color: red;
}
.todo-message .title {
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
.todo-message .title.time {
  color: #a1a1bb;
}
</style>
