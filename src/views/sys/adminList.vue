<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="warning" @click="showAddAdmin">添加管理员账号</el-button>
        </el-form-item>

      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="Meid" label="ID" sortable>
        </el-table-column>
        <el-table-column prop="Mobilephone" label="手机" sortable>
        </el-table-column>
        <el-table-column prop="TrueName" label="名字" sortable>
        </el-table-column>
        <el-table-column prop="UserType" label="身份" sortable>
        </el-table-column>
        <el-table-column prop="Grades" label="年级" sortable>
          <template scope="scope">
            <el-tooltip effect="dark" :content="scope.row.Grades|formatGrade(gradeList)">
              <el-button size="small">{{scope.row.Grades.length}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="Permissions" label="权限" sortable>
          <template scope="scope">
            <el-tooltip effect="dark" :content="scope.row.Permissions|formatRole(permissionList)">
              <el-button size="small">{{scope.row.Permissions.length}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230" align="center">
          <template scope="scope">
            <el-button type="success" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="success" size="small" @click="handleRefreshPw(scope.row)">
              重置密码
            </el-button>
            <el-button type="danger" size="small" @click.native="handleDeleteAdmin(scope.row.Meid)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog :title="isEdit?'编辑账号':'添加账号'" v-model="showAddAccount" :close-on-click-modal="false">
      <el-form label-width="60px">
        <el-form-item label="Meid" v-show="isEdit">
          <el-input v-model="newAdminData.Meid" :disabled="true" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="newAdminData.Mobilephone" :disabled="isEdit" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-show="!isEdit">
          <el-input v-model="newAdminData.Pwd" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="newAdminData.TrueName" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-checkbox-group v-model="newAdminData.Grades" class="checkbox">
            <el-checkbox :label="i.ID" v-for="i in gradeList" :key="i.ID" class="item">
              {{i.GradeName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="newAdminData.Permissions" class="checkbox">
            <el-checkbox :label="i.Role" v-for="i in permissionList" :key="i.ID" class="item">
              {{i.RoleName}}
            </el-checkbox>
          </el-checkbox-group>
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
      showAddAccount: false,
      addAccountData_role: 4,
      isEdit: false,
      newAdminData: { Mobilephone: '', Pwd: '', TrueName: '', Grades: [], Permissions: [] }
    }
  },
  filters: {
    formatGrade(val, gradeList) {
      let result = ''
      val.forEach(o => {
        if (o != '' && o != 0) {
          result += gradeList.find(b => { return b.ID == o }).GradeName + '\n'
        }
      })
      return result
    },
    formatRole(val, permissionList) {
      let result = ''
      val.forEach(o => {
        if (o != '' && o != 0) {
          result += permissionList.find(b => { return b.Role == o }).RoleName + '\n'
        }
      })
      return result
    }
  },
  computed: {
    gradeList() {
      return this.$store.getters.gradeList
    },
    permissionList() {
      return this.$store.getters.permissionList
    },
    total() {
      return this.$store.getters.adminList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      if (!this.$store.getters.adminList.length) {
        return this.getData();
      }
      return this.$store.getters.adminList.slice(start, end)
    },
    ...mapGetters({
    })
  },
  methods: {
    getData() {
      this.$store.dispatch('getAdminList');
      this.$store.dispatch('getPermissionList');
      this.$store.dispatch('getGradeList');
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
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
    handleDeleteAdmin: function(Meid) {
      this.$confirm('确认删除该管理员吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          Meid: Meid
        }
        this.$API.deleteAdminUser(para).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getData()
        }).catch((err) => {
          console.error('fff>>>>', err);
          this.$message({
            message: '删除失败了哦!',
            type: 'error',
          })
        })
      })
    },
    addAccountSubmit() {
      if (this.newAdminData.Mobilephone === '') {
        this.$message.error('请输入手机号')
      } else if (this.newAdminData.Pwd === '') {
        this.$message.error('请输入密码')
      } else if (this.newAdminData.TrueName === '') {
        this.$message.error('请输入姓名')
      } else {
        this.$API.updateAdminUser(this.newAdminData).then(res => {
          this.$message.success('添加成功')
          this.showAddAccount = false
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    handleEdit(val) {
      this.newAdminData = val
      this.isEdit = true
      this.showAddAccount = true
    },
    showAddAdmin() {
      this.newAdminData = { Mobilephone: '', Pwd: '', TrueName: '', Grades: [], Permissions: [] }
      this.isEdit = false
      this.showAddAccount = true
    }
  },
  mounted() {
  },
  watch: {
    "$route": "getData"
  },
};

</script>

<style scoped>
.userImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
