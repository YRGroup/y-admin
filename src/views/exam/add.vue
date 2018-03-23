<template>
  <div class="addExam">

    <el-form :model="newExamData" label-width="120px">
      <div>
        <el-form-item label="所属年级">
          <el-select v-model="newExamData.gradeid" placeholder="请选择年级">
            <el-option :label="i.GradeName" :value="i.ID" v-for="i in gradeList" :key="i.ID"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="考试名称" :rules="[{ required: true}]">
          <el-input v-model="newExamData.ExamName" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="考试时间" :rules="[{ required: true}]">
          <el-date-picker v-model="newExamData.ExamTime" type="date" placeholder="选择日期" format="yyyy 年 M 月 d 日">
          </el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="考试类型" :rules="[{ required: true}]">
          <el-radio-group v-model="newExamData.Type" @change="changeExamType" size="small">
            <el-radio class="radio" label="1">期中考试</el-radio>
            <el-radio class="radio" label="2">期末考试</el-radio>
            <el-radio class="radio" label="4">月考</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="学科">
          <el-checkbox-group v-model="newExamData.courses" class="checkbox">
            <el-checkbox :label="i.ID" v-for="i in courseList" :key="i.ID" class="item">
              {{i.CourseName}}
              <span style="font-size:12px">（总分
                <el-input v-model="i.FullScore" size="mini" style="width:55px;" placeholder="总分"></el-input>）
              </span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="">
          <el-button type="success" @click.native="addExam">确 定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newExamData: {
        Name: '',
        Remark: '',
        gradeid: '',
        Type: '4',
        ExamTime: '',
        ExamCourses: [],
        courses: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
    }
  },
  computed: {
    gradeList() {
      return this.$store.getters.gradeList
    },
    courseList() {
      return this.$store.getters.courseList
    }
  },
  methods: {
    addExam() {
      this.newExamData.courses.forEach(o => {
        let a = this.courseList.find(b => {
          return b.ID == o
        })
        a.CourseId = a.ID
        this.newExamData.ExamCourses.push(a)
      })
      console.log(this.newExamData)
      if (!this.newExamData.gradeid) {
        this.$message.error('请选择年级')
      } else if (!this.newExamData.ExamName) {
        this.$message.error('请填写考试名称')
      } else if (!this.newExamData.ExamTime) {
        this.$message.error('请添加考试时间')
      } else if (!this.newExamData.ExamCourses.length) {
        this.$message.error('请选择学科')
      } else {
        this.$API.addGradeExam(this.newExamData).then(res => {
          this.$message.success('添加考试成功')
          this.$router.push('/exam/list')
        }).catch(err => {
          this.$message.error(err.msg)
          this.newExamData = {
            Name: '',
            Remark: '',
            ClassID: '',
            Type: '',
            ExamCourses: [],
            courses: [1, 2, 3, 4, 5, 6, 7, 8, 9]
          }
        })
      }
    },
    changeExamType(val) {

    },
  },
  created() {
    if (!this.$store.getters.gradeList.length) {
      this.$store.dispatch('getGradeList').then(

      )
    }
    if (!this.$store.getters.courseList.length) {
      this.$store.dispatch('getCourseList').then(

      )
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>

</style>
