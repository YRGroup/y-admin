<template>
        <el-form :model="addCardData" label-width="100px" class="cardNum">
            <div>
              <el-form-item label="班级：">
                <el-select v-model="ClassID" placeholder="请选择班级" style="width:160px;" @change="getStudentList">
                  <el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学生：" v-if="showStudent">
                <el-select v-model="addCardData.student_meid" placeholder="请选择学生" style="width:160px;">
                  <el-option v-for="i in studentList" :key="i.Meid" :label="i.TrueName" :value="i.Meid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卡号：">
                <el-input v-model="addCardData.CardID" placeholder="请输入校园卡号" size="large" style="width:260px;"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <el-button type="success" @click="addCardID" size="large">绑定</el-button>
              </el-form-item>
            </div>
          </el-form>
</template>

<script>
export default {
  data() {
    return {
        addCardData:{},
        showStudent:false,
        studentList:[],
        ClassID:'',
        addCardData:{
            CardID:"",
            student_meid:""
        }
    };
  },
  computed: {
    classList() {
      return this.$store.getters.classList;
    },
  },
  methods: {
    getStudentList() {
      this.showStudent = true
      let params = {}
      params.cid = this.ClassID
      this.$studentAPI.getStudentList(params).then(res => {
        this.studentList = res
      });
    },
    addCardID() {
      this.$API.addSchoolcard(this.addCardData).then(res => {
        this.$store.dispatch('getCurrentUser')
        this.$message.success('绑定卡号成功')
        this.addCardData = {
            CardID:"",
            student_meid:""
        }
        this.ClassID = ""
        this.showStudent = false
      }).catch((err) => {
        this.$message.error(err.msg)
      })
    },
  },
  created() {},
  mounted() {},
  created() {
      //获取班级列表
    if (!this.$store.getters.classList.length) {
      this.$store.dispatch('getClassList');
    }
  }
};
</script>
<style>
.cardNum{
    margin:100px;
}
</style>