<template>
  <el-form  v-loading="loading" :rules="rules" class="form" :model="form" ref="form" label-width="80px">
    <el-form-item label="通知标题" prop="title" placeholder="请输入通知标题">
      <el-input v-model="form.Title"></el-input>
    </el-form-item>
    <el-form-item label="通知类型">
      <el-select v-model="form.Type" prop="type"  placeholder="请选择通知类型" @change="resetExtraID">
        <el-option v-for="(item,index) in noticeType" :key='index' :label="item.type" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="showGradeList" prop="grade" label="年级">
      <el-select v-model="form.ExtraID" placeholder="请选择年级">
        <el-option v-for="item in gradeList" :key="item.ID" :label="item.GradeName" :value="item.ID"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="showClassList" prop="class" label="班级">
      <el-select  v-model="form.ExtraID" placeholder="请选择班级">
        <el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="通知内容">
      <el-input type="textarea" prop="content" v-model="form.Content" placeholder="请输入通知内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">发布通知</el-button>
      <el-button type="warning" @click="resetForm()">重置</el-button>
      <el-button type="" @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Type: 1,
        ExtraID: "",
        Title: "",
        Content: ""
      },
      loading:false,
      rules:{
        // title: [
        //   { required: true, message: '请输入标题',trigger: 'blur' },
        // ],
        // content: [
        //   { required: true, message: '请输入内容'},
        // ],
        // grade: [
        //   { required: true, message: '请选择年级',trigger: 'change'},
        // ],
        // class: [
        //   { required: true, message: '请选择班级'},
        // ],
      },
      gradeList: [],
      classList: [],
      noticeType: [
        { type: "全校通知", value: 1 },
        { type: "年级通知", value: 2 },
        { type: "班级通知", value: 3 },
        { type: "全部教师通知", value: 4 },
        { type: "全部班主任通知", value: 5 },
        { type: "全部任课教师通知", value: 6 },
        { type: "全部家长通知", value: 7 },
        { type: "全部学生通知", value: 8 }
      ]
    };
  },
  computed: {
    showGradeList() {
      return this.form.Type == 2 ? true : false;
    },
    showClassList() {
      return this.form.Type == 3 ? true : false;
    }
  },
  created() {
    this.getGradeList();
    this.getClassList();
  },
  methods: {
    //resetExtraID
    resetExtraID(){
      this.form.ExtraID=''
    },
    //验证
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.makeNotice();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //发布通知
    makeNotice() {
      this.$confirm('确定发布通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading=true;
        this.$API.makeNotice(this.form).then(res => {
          this.loading=false;
          if(res.data.Status==1){
            this.$message({
              message:'发布成功',
              type: 'success'
            })
            this.resetForm();
          }else{
            this.$message.error('发布失败，请重试');
          }
        });
      })
    },
    resetForm() {
      this.form={
        Type: 1,
        ExtraID: "",
        Title: "",
        Content: ""
      }
    },
    //年级列表
    getGradeList() {
      this.$API.getGradeList().then(res => {
        this.gradeList = res;
      });
    },
    //班级列表
    getClassList() { 
      this.$API.getClassList().then(res => {
        this.classList = res;
      });
    }
  }
};
</script>

<style scoped>
 .form{
    margin-top: 30px;
 }
</style>
