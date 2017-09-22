<template>
  <div>
    <div class="panel">
      <div class="examinfo">
        <p class="title">{{data.Name}}</p>
        <p class="examtime">创建时间：{{data.CreateTExamIDime}}</p>
      </div>
    </div>

    <div class="list">
      <div class="item" v-for="(i,index) in data.CoursesSummary" :key="index">
        <div class="mainscore">
          <span class="score">{{i.AverageScore}}</span>
          <span> / {{i.FullScore}}</span>
        </div>
        <div class="name">{{i.CourseName}}</div>
      </div>
    </div>

    <div class="panel">
      <div id="chart1" style="width:100%; height:700px;"></div>

    </div>

  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
      data: {},
      chart1: null,
      chart1_yAxis_data: [],
      chart1_series: [],
      chart1_legend: [],
    }
  },
  computed: {
    currentClassInfo() {
      if (!this.$store.state.currentClassInfo) {
        return this.$store.dispatch('getCurrentClassInfo')
      } else {
        return this.$store.state.currentClassInfo
      }
    },
    courseList() {
      if (this.$store.state.courseList) {
        return this.$store.state.courseList
      } else {
        this.$store.dispatch('getCourseList').then(() => {
          return this.$store.state.courseList
        })
      }
    }
  },
  methods: {
    getData() {
      this.$API.getGradeExamInfo({ examid: this.$route.query.id }).then(res => {
        this.data = res
        this.chart1_legend = this.data[0].Courses.map(p => { return p.CourseName })
        this.chart1_legend.forEach(o => {
          this.chart1_series.push({
            name: o,
            type: 'bar',
            stack: '总分',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: this.data.map(u => { return u.Courses.find(y => { return y.CourseName === o }).AvgScore })
          })
        })
        this.data.forEach(o => {
          this.chart1_yAxis_data.push(o.ClassName)
        })
        this.setChart1()
      })
    },
    setChart1() {
      this.chart1.setOption({
        title: {
          text: '班级成绩排名',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.chart1_legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.chart1_yAxis_data
        },
        series: this.chart1_series
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
  },
  watch: {
    '$route': 'getData'
  }
}
</script>

<style lang="less" scoped>
@main: #00c06f;
@sub: #ff673e;
@bg: #f0f0f0;
@grey: #999;
@border: #f2f2f2;

.examinfo {
  text-align: center;
  .title {
    font-size: 24px;
    line-height: 36px;
  }
  .examtime {
    color: @grey;
  }
  .item {
    position: relative;
    cursor: pointer;
    &:hover {
      border-bottom: 1px dotted @main;
    }
    .index {
      position: absolute;
      left: 0;
      top: 10px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background: @main;
      color: #fff;
      text-align: center;
    }
    .name {
      padding-left: 30px;
      line-height: 30px;
      font-size: 20px;
    }
    .info {
      padding-left: 30px;
      color: @grey;
    }
    .type {
      position: absolute;
      right: 10px;
      top: 10px;
      background: @main;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
}

.footer {
  border-top: 1px solid @border;
  line-height: 40px;
  .btn {
    padding-right: 30px;
    text-align: right;
  }
}

.info {
  color: @grey;
  span {
    margin-right: 20px;
  }
  b {
    color: @sub;
  }
  .btn {
    float: right;
    margin-bottom: 5px;
  }
}

.inline {
  display: inline-block;
  width: 90px;
}

.el-tabs {
  margin: 10px 0;
  padding: 10px 20px;
  background: #f8f8f8;
  .el-tabs__nav-wrap {
    background: red;
  }
}

.list {
  padding: 0 50px;
  margin-top: 20px;
  .item {
    border: 1px solid @border;
    background: #f1faf6;
    display: inline-block;
    text-align: center;
    width: 100px;
    height: 80px;
    padding: 16px;
    margin: 10px;
    .mainscore {
      line-height: 40px;
      color: @grey;
      .score {
        color: @sub;
        font-size: 20px;
      }
    }
    .name {
      line-height: 40px;
      font-weight: 600;
    }
  }
}

.scorebox {
  position: relative;
  .toolBar {
    position: absolute;
    right: 100px;
    z-index: 100;
  }
}
</style>
