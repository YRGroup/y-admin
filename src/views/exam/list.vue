<template>
  <div>

    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">

        <el-form-item label="班级">
          <el-select v-model="filters.cid" placeholder="请选择">
            <el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button type="success" @click="$router.push('/exam/add')">添加考试</el-button>
        </el-form-item>

      </el-form>
    </el-col>
    <el-col>
      <div class="examlist">
        <li class="item" v-for="(i,index) in data" :key="index">
          <div class="examtitle">{{i.ExamName}}</div>
          <div class="examinfo">
            <span>
              <i class="iconfont">&#xe621;</i>考试时间：{{i.ExamTime|FormatDate}}</span>
            <span>
              <i class="iconfont">&#xe6b4;</i>考试类型： {{i.Type | formatExamType}}
            </span>
          </div>
          <div class="exambtn">
            <el-button class="delbtn" :plain="true" type="text" @click="delExam(i.ID,i.ExamName)" size="small">
              <i class="iconfont">&#xe630;</i> 删除</el-button>
            <el-button :type="!i.IsSendMsg?'info':null" @click="sendExamNotice(i.ID)" :disabled="i.IsSendMsg">发通知</el-button>
            <el-button type="success" class="type" @click="$router.push('/exam/info?id='+i.ID)">录入成绩</el-button>
            <el-button type="success" class="type" @click="publishExam(i.ID)" :disabled="i.IsPublished">发布考试</el-button>
          </div>
        </li>
      </div>

    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      filters: {
        cid: ''
      },
    }
  },
  computed: {
    classList() {
      if (!this.$store.getters.classList.length) {
        this.$store.dispatch('getClassList')
      }
      return this.$store.getters.classList
    },
    total() {
      return this.$store.getters.postList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      if (!this.$store.getters.postList.length) {
        return this.getData();
      }
      return this.$store.getters.postList.slice(start, end)
    }
  },
  filters: {
    formatExamType(val) {
      switch (val) {
        case 0:
          return '自定'
        case 1:
          return '期中考试'
        case 2:
          return '期末考试'
        case 3:
          return '周考'
        case 4:
          return '月考'
      }
    },
    FormatDate(val) {
      let data = new Date(val)
      return data.getFullYear() + " 年 " + (data.getMonth() + 1) + " 月 " + data.getDate() + " 日"
    }
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.filters.cid = this.$route.query.id
      } else {
        this.filters.cid = this.classList[0].cid
      }
      this.$API.getClassExamList(this.filters.cid).then(res => {
        this.data = res
        if (this.data.length == 0) {
          this.nodataImg = true
        }
        let data = this.data
        for (var i = 0; i < data.length; i++) {
          let time = new Date(data[i].CreateTime)
          data[i].CreateTime = time.Format('MM-dd hh:mm')
        }
      })
    },
    sendExamNotice(id) {
      this.$confirm('请确认考试成绩录入完整', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          classid: this.filters.cid,
          examid: id
        }
        this.$API.sendExamSms(para).then(res => {
          this.$message.success('发送成功')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      })
    },
    publishExam(id) {
      this.$confirm('请确认考试成绩录入完整', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          classid: this.filters.cid,
          examid: id
        }
        this.$API.publishExam(para).then(res => {
          this.$message.success('发送成功')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      })
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@main: #00c06f;
@sub: #ff673e;
@bg: #f0f0f0;
@grey: #999;
@border: #f2f2f2;

.examlist {
  padding: 20px 0;
  li {
    list-style: none;
  }
  .item {
    &:first-child {
      border-top: 1px solid @border;
    }
    border-bottom: 1px solid @border;
    padding: 20px 30px;
    position: relative;
    &:hover {
      background: @border;
    }
    &:hover .exambtn .delbtn {
      display: inline-block;
    }
    .examtitle {
      line-height: 30px;
      font-size: 18px;
    }
    .examinfo {
      line-height: 30px;
      color: #888;
      span {
        margin-right: 20px;
      }
      .iconfont {
        margin-right: 5px;
        color: @main;
        font-size: 16px;
      }
    }
    .time {
      padding-left: 10px;
      color: @grey;
    }
    .exambtn {
      position: absolute;
      right: 30px;
      top: 24px;
      .delbtn {
        display: none;
      }
    }
  }
}
</style>
