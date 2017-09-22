<template>
  <div>

    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">

        <el-form-item label="年级">
          <el-select v-model="filters.gradeid" placeholder="请选择">
            <el-option v-for="i in gradeList" :key="i.ID" :label="i.GradeName" :value="i.ID">
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
        <li class="item" v-for="(i,index) in data" :key="index"  @click="showChildExam===i.ID?showChildExam=0:showChildExam=i.ID">
          <div class="examtitle">{{i.ExamName}}</div>
          <div class="examinfo">
            <span>
              <i class="iconfont">&#xe621;</i>考试时间：{{i.ExamTime|FormatDate}}</span>
            <span>
              <i class="iconfont">&#xe6b4;</i>考试类型： {{i.Type | formatExamType}}
            </span>
          </div>
          <div class="exambtn">
            <el-button class="delbtn" :plain="true" type="text" @click="delExam(i.ID)" size="small">
              <i class="iconfont">&#xe630;</i> 删除</el-button>
            <el-button type="warning" class="type" @click="$router.push(`/exam/chart?id=${i.ID}`)">班级成绩排名</el-button>
          </div>
          <div class="childExam">
            <li class="childExamItem" v-for="j in i.ChildExam" :key="j.ID" v-show="showChildExam===i.ID">
              <div class="className">{{j.ClassName}}</div>
              <div class="exambtn">
                <el-button :type="!j.IsSendMsg?'info':null" @click="sendExamNotice(j.ID,j.ClassID)" :disabled="j.IsSendMsg">发通知</el-button>
                <el-button type="success" class="type" @click="$router.push('/exam/info?id='+j.ID)">录入成绩</el-button>
                <el-button type="success" class="type" @click="publishExam(j.ID,j.ClassID)" :disabled="j.IsPublished">发布考试</el-button>
              </div>
            </li>
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
        gradeid: ''
      },
      showChildExam: 0
    }
  },
  computed: {
    gradeList() {
      return this.$store.getters.gradeList
    },
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
        this.filters.gradeid = this.$route.query.id
      } else if (this.gradeList.length) {
        this.filters.gradeid = this.gradeList[0].ID
      } else {
        this.filters.gradeid = 1
      }
      this.$API.getGradeExamList({ gradeid: this.filters.gradeid }).then(res => {
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
    sendExamNotice(id, classid) {
      this.$confirm('请确认考试成绩录入完整', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          classid: classid,
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
    publishExam(id, classid) {
      this.$confirm('请确认考试成绩录入完整', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          classid: classid,
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
    delExam(id) {
      this.$confirm('确定要删除考试吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          ExamID: id
        }
        this.$API.delGradeExam(para).then(res => {
          this.$message.success('删除成功')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      })
    }
  },
  created() {
    if (!this.$store.getters.gradeList.length) {
      this.$store.dispatch('getGradeList')
    }
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
      border: 1px solid @border;
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

.childExam {
  .childExamItem {
    position: relative;
    line-height: 40px;
    border-bottom: 1px dotted @grey;
    margin: 10px 0 10px 2em;
    padding: 1em;
    .exambtn {
      top: 12px;
    }
  }
}
</style>
