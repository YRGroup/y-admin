<template>
  <div class="addExam">

    <el-form :model="newExamData" label-width="120px">
      <div>
        <el-form-item label="所属班级">
          <el-select v-model="newExamData.ClassID" placeholder="请选择班级" :disabled="true">
            <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
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
          <el-radio-group v-model="newExamData.Type" @change="examType" size="small">
            <el-radio class="radio" label="0">自订</el-radio>
            <el-radio class="radio" label="1">期中考试</el-radio>
            <el-radio class="radio" label="2">期末考试</el-radio>
            <el-radio class="radio" label="3">周考</el-radio>
            <el-radio class="radio" label="4">月考</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="学科">
          <el-checkbox-group v-model="newExamData.courses" class="checkbox">
            <el-checkbox :label="i.CourseId" v-for="i in courseList" :key="i.CourseId" class="item" :disabled="newExamData.Type!=0">
              {{i.name}}
              <span style="font-size:12px">（总分
                <el-input v-model="i.FullScore" size="mini" style="width:50px;" placeholder="总分"></el-input>）
              </span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="">
          <el-button type="success" @click.native="addNewExam">确 定</el-button>
          <el-button @click="showAddExam = false" :plain="true" type="success">取 消</el-button>
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
        ClassID: '',
        Type: '4',
        ExamTime: '',
        ExamCourses: [],
        courses: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
    }
  },
  methods: {

  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>

</style>
