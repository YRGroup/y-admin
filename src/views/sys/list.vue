<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="身份">
          <el-radio-group v-model="filters.role" @change="getData">
            <el-radio-button :label="1">学生</el-radio-button>
            <el-radio-button :label="2">家长</el-radio-button>
            <el-radio-button :label="12">老师</el-radio-button>
            <el-radio-button :label="4">任课教师</el-radio-button>
            <el-radio-button :label="8">班主任</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="warning" @click="showAddAccount = true">添加账号</el-button>
        </el-form-item>
        <el-form-item class="seach">
          <el-input clearable type="primary"  placeholder="搜索手机号或姓名" v-model="seachText" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="getData" >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="User.Meid" label="ID">
        </el-table-column>
        <el-table-column prop="User.Mobilephone" label="手机">
        </el-table-column>
        <el-table-column prop="User.TrueName" label="名字">
        </el-table-column>
        <el-table-column prop="CurrentClass.Role" label="身份">
          <template slot-scope="scope">
            {{scope.row.CurrentClass.Role | formatType}}
          </template>
        </el-table-column>
        <el-table-column prop="User.isActive" label="激活状态">
          <template slot-scope="scope">
            <span :class="[scope.row.User.IsActive?'success':'waring']">{{scope.row.User.IsActive | formatActive }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="User.isAuth" label="订阅状态">
          <template slot-scope="scope">
            <span :class="[scope.row.User.IsSubscribe?'success':'waring']">{{scope.row.User.IsSubscribe | formatSub}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="User.Headimgurl" align="center" label="头像">
          <template slot-scope="scope">
            <img class="userImg" :src="scope.row.User?scope.row.User.Headimgurl:null">
            <!-- <el-popover ref="popover2" placement="bottom" title="图片预览" width="200" trigger="click">
                      <img :src="scope.row.Headimgurl">
                    </el-popover>
                    <el-button size="small" v-popover:popover2>头像</el-button> -->
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="openUserinfo(scope.row.CurrentClass)">
              详情
            </el-button>
            <el-button type="success" size="small" @click="handleRefreshPw(scope.row.CurrentClass)">
              重置密码
            </el-button>
            <!-- <el-button type="danger" size="small" @click.native="handleDeleteuser(scope.row.Meid)">
              删除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next"
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :page-sizes="pageSizes"
        :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog  width="70%" title="添加账号" v-model="showAddAccount" :close-on-click-modal="false">
      <el-form label-width="80px">
        <el-form-item label="身份">
          <el-radio-group v-model="addAccountData_role">
            <el-radio-button :label="1" disabled>学生</el-radio-button>
            <el-radio-button :label="2" disabled>家长</el-radio-button>
            <el-radio-button :label="4">任课老师</el-radio-button>
            <el-radio-button :label="8">班主任</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form class="addItem" label-width="60px" :inline="true" v-for="(i,index) in addAccountData" :key="index">
        <el-form-item label="手机号">
          <el-input v-model="i.MobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="i.truename" style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="i.ClassID" placeholder="请选择班级" style="width:120px;">
            <el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="i.CourseID" placeholder="请选择学科" style="width:120px;">
            <el-option v-for="i in courseList" :key="i.CourseID" :label="i.CourseName" :value="i.CourseID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" round @click.native="addAccountData.splice(index,1)">移除</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="80px">
        <el-form-item>
          <el-button class="addCol" type="primary" @click.native="addAccountData.push({MobilePhone: '',truename: '',ClassID :'',CourseID:''})">添加一行</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showAddAccount = false">取消</el-button>
        <el-button type="primary" @click.native="addAccountSubmit">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'userList',
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      seachText:'',
      filters: {
        role: 1,
      },
      courseList:[],
      showAddAccount: false,
      addAccountData_role: 4,
      addAccountData: [{ MobilePhone: '', truename: '', ClassID: '', CourseID: '' }]
    }
  },
  filters: {
    formatType(val) {
      switch (val) {
        case 1:
          return '学生'
          break
        case 2:
          return '家长'
          break
        case 12:
          return '教师'
          break
        case 4:
          return '任课教师'
          break
        case 8:
          return '班主任'
          break
      }
    },
    formatActive(val){
      if(val){
        return '已激活'
      }else{
        return '未激活'
      }
    },
    formatSub(val){
      if(val){
        return '已关注'
      }else{
        return '未关注'
      }
    }
  },
  computed: {
    classList() {
      return this.$store.getters.classList;
    },
    total() {
      if (!this.$store.getters.total) {
        this. open();
      }
      return this.$store.getters.total;
    },
    currentData() {
      return this.$store.getters.allUserList;
    },
    ...mapGetters({
    }),
  },
  methods: {
    getData() {
    let para={
        key:this.seachText,
        role: this.filters.role,
        currentPage:this.page,
        pageSize:this.pageSize
      }
      this.$store.dispatch('getAllUserList', para);
    },
    openUserinfo(val) {
      console.log(val.Role)
      switch (val.Role) {
        case 4:case 8:case 12:
          this.$router.push('/teacher/info?teacherId=' + val.Meid)
          break
      
        case 2:
          this.$router.push('/parent/info?parentId=' + val.Meid)
          break
        case 1:
          this.$router.push('/student/info?studentId=' + val.Meid)
          break
      }
    },
    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
      console.log(this.page)
      this.getData();
    },
    open() {
      this.$message({
          message:'提示：没有查询到数据，请检查输入是否有误',
          // type:'waring'
        });
    },
    handleRefreshPw(val) {
      this.$confirm('确认重置密码吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          Meid: val.Meid
        }
        this.$sysAPI.resetPassword(para).then(() => {
          this.$message({
            message: '重置密码成功，新密码是 123456',
            type: 'success',
          })
        }).catch((err) => {
          console.error('fff>>>>', err);
          this.$message({
            message: '重置密码失败了哦!',
            type: 'error',
          })
        })
      })
    },
    getcourseList() {
      this.$API.getCourseList().then((res) => {
        res.forEach((element) => {
          element.CourseID = element.ID
        })
          this.courseList =  res
      })
    },
    // handleDeleteuser: function(Meid) {
    //   this.$confirm('确认删除该记录吗?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     let para = {
    //       Meid: Meid
    //     }
    //     this.$teacherAPI.deleteTeacher(para).then(() => {
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success',
    //       })
    //       this.getData()
    //     }).catch((err) => {
    //       console.error('fff>>>>', err);
    //       this.$message({
    //         message: '删除失败了哦!',
    //         type: 'error',
    //       })
    //     })
    //   })
    // },
    addAccountSubmit() {
      if (this.addAccountData_role === 0) {
        this.$message.error('请选择身份类别')
      } else if (this.addAccountData.length < 1) {
        this.$message.error('至少添加一行')
      } else {
        this.addAccountData.forEach(o => {
          o.role = this.addAccountData_role===4?8:4
          if (o.MobilePhone == '' || o.truename == '') {
            this.$message.error('资料不完整')
            return
          }
        })
        this.$sysAPI.addTeacherAccount(this.addAccountData).then(res => {
          this.$message.success('添加成功')
          this.showAddAccount = false
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    }
  },
  created() {
    this.getcourseList();
    this.getData();
  },
  mounted() {
  },
  watch: {
    "$route": "getData"
  },
};

</script>

<style lang="less" scoped>

.userImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.seach{
  margin-left: 10%;
}
.waring{
  color:#F56C6C;
}
.success{
  color:#67C23A;
} 
.addItem{
  border-left: 5px solid #67C23A;
  height: 35px;
  padding-left: 20px;
  margin: 20px 0;
}
.addCol{
  display: inline-block;
  margin-top: 30px;
}
</style>
