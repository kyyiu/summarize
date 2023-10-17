<template>
  <div class="home-content clearfix" v-loading="loading">
    <div class="pull-left left-content">
      <div v-for="(item, index) in activities" :key="`newActivity${index}`" class="pull-left new-activity-container">
        <div class="new-activity" @click="toDetail(item.id)">
          <customImg :src="item.cover"></customImg>
          <div class="title clearfix">
            <span class="pull-right activity-status" :class="{'end': item.status === '已结束'}">{{item.status}}</span>
            <Tooltip class="item"
                  effect="dark"
                  :content="item.title"
                  placement="bottom-start">
              <p>{{item.title}}</p>
            </Tooltip>
          </div>
          <p class="time"><span class="active-type">{{item.obj == 'student' ? '学生' : '教师'}}</span>投稿时间:{{timeToString(item.begin)}}~{{timeToString(item.collectEnd)}}</p>
          <p class="footer">
            <span class="total-day">
              <i class="iconfont iconicon_shijian"></i>
              <span>&nbsp;&nbsp;{{Math.ceil((item.collectEnd - item.begin) /86400)}}天</span>
            </span>
            <span class="pull-right">
              <span class="view">
                <i class="iconfont iconicon_liulanliang"></i>
                <span>&nbsp;&nbsp;{{item.hits}}</span>
              </span>
              <span class="work">
                <i class="iconfont iconicon_wenjian"></i>
                <span>&nbsp;&nbsp;{{item.worksCount}}</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="pull-left right-info">
      <div class="user">
        <div>
          <div class="clearfix">
            <div class="user-name-info">
              <p>
                <span class="name">{{userInfo.nickName}}</span>
                <span class="role">教师</span>
              </p>
              <p class="school-name">{{userInfo.departmentName}}</p>
            </div>
          </div>
          <div class="clearfix award-info">
            <div class="pull-left">
              <div class="award"  @click="toMyAward">
                <span class="iconfont iconicon_huojiang"></span>
                <span class="word-container">
                  <span class="amount">{{userInfo.prizeWorksCount}}</span>
                  <span>我的获奖</span>
                </span>
              </div>
            </div>
            <div class="pull-left">
              <div class="work"  @click="toMyWorks">
                <span class="iconfont iconicon_zuop"></span>
                <span class="word-container">
                  <span class="amount">{{userInfo.worksCount}}</span>
                  <span>我的作品</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="popular">
        <div class="header clearfix">
          <span class="title">人气作品</span>
          <router-link to="/excellent/list" class="more pull-right">查看更多 &gt;</router-link>
        </div>
        <div v-for="(item, index) in worksList" :key="`popularWork${index}`" class="work-container clearfix" @click="toExcellent(item.id)">
          <div class="info">
            <p class="title">{{item.worksName}}</p>
            <p class="from">作品来源：{{item.activityTitle}}</p>
            <p class="clearfix">
              <span class="pull-right views">
                <i class="iconfont iconicon_liulanliang"></i>
                <span>&nbsp;&nbsp;{{item.hits}}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tooltip } from "element-ui";
export default {
  components: { Tooltip },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    activities() {
      return this.$parent.activities;
    },
    userInfo() {
      return this.$parent.userInfo;
    },
    worksList() {
      return this.$parent.worksList;
    }
  },
  created() {
    // this.$bus.$emit("changePageTitle", "最新活动");
  },
  methods: {
    toDetail(id) {
      this.$router.push("allActivity/detail/" + id);
    },
    toExcellent(id) {
      this.$router.push("excellent/detail/" + id);
    },
    toMyAward() {
      this.$router.push("/me/award/list");
    },
    toMyWorks() {
      this.$router.push("/me/myWorks");
    },
    showImg(value) {
      let extension = value.extension;
      let picArray = ["JPG", "JPEG", "PNG", "BMP"];
      let htmlArray = ["HTM", "HTML", "XHTML", "ASP", "ASPX", "PHP", "JSP"];
      let videoArray = ["GIF", "FLV", "SWF", "3GP", "MPG", "AVI", "MOV"];
      let docArray = ["DOC", "DOCX", "PPT", "PPTX"];
      if (picArray.indexOf(extension) !== -1) {
        return value.worksFile;
      }
      if (htmlArray.indexOf(extension) !== -1) {
        return "/activityImages/file-html.png";
      }
      if (videoArray.indexOf(extension) !== -1) {
        return "/activityImages/file-video.png";
      }
      if (docArray.indexOf(extension) !== -1) {
        return "/activityImages/file-doc.png";
      } else {
        return "/activityImages/file-zip.png";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home-content{
  color: #2A2A34;
  height: calc(100% - 48px);
  overflow: auto;
  .left-content{
    width: 66%;
    min-width: 560px;
    height: 100%;
    .new-activity-container{
      width: 50%;
      &:nth-child(2n+1){
        .new-activity{
          // margin-left: 0px;
        }
      }
      .new-activity{
        cursor: pointer;
        margin: 16px;
        border-radius: 8px;
        overflow: hidden;
        background-color: white;
        &:hover{
          box-shadow: 0 2px 12px 0 rgba(119, 119, 119, 0.5);
        }
        .title{
          padding-left: 16px;
          color: #2A2A34;
          font-size: 16px;
          line-height: 1;
          margin-top: 16px;
          font-weight: bold;
          p{
            margin-right: 95px;
            white-space: nowrap;
            overflow: hidden;
            line-height: 20px;
            text-overflow: ellipsis;
          }
          .activity-status{
            display: inline-block;
            background-color: #F15D73;
            font-size: 12px;
            font-weight: normal;
            color: white;
            line-height: 1;
            height: 20px;
            line-height: 20px;
            position: relative;
            width: 88px;
            text-align: center;
            &::before{
              content: "";
              display: inline-block;
              border-width: 10px 0 10px 10px;
              border-color: white;
              border-style: solid;
              border-color: transparent transparent transparent white;
              vertical-align: middle;
              position: absolute;
              height: 0px;
              left: -10px;
              background-color: #F15D73;
            }
            &.end{
              background-color: #C0BFCF;
              color: #FFFFFF;
              &::before{
                background-color: #C0BFCF;
              }
            }
          }
        }
        .time{
          color: #83899C;
          padding-left: 16px;
          margin: 8px 0;
          .active-type{
            display: inline-block;
            padding: 0px 8px;
            background-color: red;
            border-radius: 12px;
            background-color: #e8e9f6;
            color: #5a5ab5;
            margin-right: 8px;
          }
        }
        .footer{
          border-top: 1px solid #F2F2F2;
          padding: 16px;
          color: #ACACBA;
          padding: 8px 16px;
          .view{
            padding-right: 16px;
          }
        }
      }
      .image-container{
        background-position: center;
        background-size: cover;
        // padding-top: 48%;
        padding-top: 176px;
        border-radius: 8px 8px 0px 0px;
      }
    }
  }
  .right-info{
    width: 33%;
    margin-top: 16px;
    .user{
      background-color: white;
      padding: 16px;
      border-radius: 8px;
      .user-icon{
        width: 150px;
        height: 87px;
        background-size: contain;
        .icon{
          width: 80px;
          height: 78px;
          margin: 0 auto;
          margin-top: 5px;
          border-radius: 50%;
        }
      }
      .user-name-info{
        margin-left: 168px;
        margin-top: 16px;
        .name{
          font-size: 16px;
          font-weight: bold;
          color: #2A2A34;
        }
        .role{
          background:rgba(245,246,251,1);
          border-radius:15px;
          text-align: center;
          display: inline-block;
          line-height: 2;
          width: 80px;
          margin-left: 16px;
          color: #344A5E;
        }
        .school-name{
          color: #83899C;
          // margin-left: 6px;
        }
      }
      .award-info{
        background-color: #F5F6FB;
        border-radius: 8px;
        margin-top: 16px;
        .pull-left{
          position: relative;
          &:first-child{
            &::after{
              content: "";
              display: inline-block;
              width: 1px;
              height: 52px;
              position: absolute;
              right: 0px;
              top: 8px;
              background-color: #ECECF4;
            }
          }
          width: 50%;
          .iconfont{
            font-size: 48px;
            border-radius: 50%;
            color: white;
          }
          .word-container{
            display: inline-block;
            text-align: center;
            margin-left: 16px;
          }
          .amount{
            font-size: 16px;
            font-weight: bold;
            display: block;
          }
          .award{
            text-align: center;
            cursor: pointer;
            .iconfont{
              background-image: radial-gradient(#FFC108 0%, #FFC108 50%, white 51%, white 100%);
            }
          }
          .work{
            cursor: pointer;
            text-align: center;
            .iconfont{
              background-image: radial-gradient(#48E7E0 0%, #48E7E0 50%, white 51%, white 100%);
            }
          }
          .award, .work{
            &:hover{
              background-color: #E8E9F6;
            }
          }
        }
      }
    }
    .popular{
      background-color: white;
      border-radius: 8px;
      margin-top: 16px;
      padding: 16px;
      .header{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 16px;
        .more{
          font-size: 12px;
          color: #5C627D;
          line-height: 22px;
          text-decoration: none;
        }
      }
      .work-container{
        margin-bottom: 13px;
        padding: 8px 0;
        cursor: pointer;
        &:last-child{
          margin-bottom: 0px;
        }
        .image-container{
          width: 100px;
          height: 62px;
          background-position: center;
          background-size: contain;
          border-radius: 4px;
          margin-right: 16px;
        }
        .info{
          margin-left: 36%;
          .title, .from{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
          }
          .from{
            line-height: 2;
            font-size: 12px;
          }
          .from,.views{
            color: #83899C;
          }
          .author{
            color: #83899C;
            .user-icon {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              display: inline-block;
              vertical-align: bottom;
              background-size: contain;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>

