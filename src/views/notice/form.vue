<template>
  <el-form :model="formData" v-loading="loading" :rules="rules" ref="form" label-width="100px" class="form">
    <el-form-item label="通知标题" prop="Title">
      <el-input v-model="formData.Title" placeholder="请输入通知标题"></el-input>
    </el-form-item>
    <el-form-item label="通知类型" prop="Type">
      <el-select v-model="formData.Type" placeholder="请选择活动区域">
        <el-option v-for="(item,index) in noticeType" :key='index' :label="item.type" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年级" prop="ExtraID" v-if="showGradeList">
      <el-select v-model="formData.ExtraID" placeholder="请选择年级">
        <el-option v-for="(item,index) in gradeList" :key="index" :label="item.GradeName" :value="item.ID"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="通知内容" prop="Content">
      <el-input v-model="formData.Content" placeholder="请输入通知内容"></el-input>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button type="primary" plain @click="resetForm('form')">重置</el-button>
      <el-button type="warning" plain @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        Type: 1,
        ExtraID: "",
        Title: "",
        Content: ""
      },
      loading:false,
      rules:{
        Title: [
          { required: true, message: '请输入标题',trigger: 'blur' }
        ],
        Content: [
          { required: true, message: '请输入内容'},
        ],
        Type: [
          { required: true, message: '请选择通知类型'},
        ],
        ExtraID: [
          { required: true, message: '请选择班级/年级',trigger: 'change'},
        ],
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
      return this.formData.Type == 2 ? true : false;
    },
    showClassList() {
      return this.formData.Type == 3 ? true : false;
    }
  },
  created() {
    this.getGradeList();
    this.getClassList();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //resetExtraID
    resetExtraID(){
      this.form.ExtraID=''
    },
    //提交验证
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.makeNotice();
        } else {
          return false;
        }
      });
    },
    //提交
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
    max-width: 500px;
 }
</style>
