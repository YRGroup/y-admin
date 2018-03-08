<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleAddClass">新增班级</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="currentData" fixed highlight-current-row style="width: 100%;">
      <el-table-column prop="GradeID" label="年级ID" sortable>
        <template slot-scope="scope">
          {{scope.row.GradeID}}
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="班级名称">
      </el-table-column>
      <el-table-column prop="cid" label="班主任" align="center" sortable>
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.AdviserMeid" @click="$router.push('/teacher/info?teacherId='+scope.row.AdviserMeid)">{{scope.row.AdviserTrueName}}</el-button>
          <el-button v-else type="text" size="small">
            暂无
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="StudentCount" label="学生数量" align="center" sortable>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push('/student/list?classId='+scope.row.cid)">
            {{scope.row.StudentCount}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="家长数量" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push('/parent/list?classId='+scope.row.cid)">
            {{scope.row.ParentCount}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="TeacherCount" label="教师数量" align="center" sortable>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push('/teacher/list?classId='+scope.row.cid)">
            {{scope.row.TeacherCount}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="cid" label="班级动态" align="center" sortable>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push('/post/list?classId='+scope.row.cid)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="350" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push('/class/info?classId='+scope.row.cid+'')">班级详情</el-button>
          <el-button v-if="scope.row.AdviserMeid" type="warning" size="small" @click="$router.push('/teacher/list?classId=0&setm='+scope.row.cid+'&p=0&key=')">
            更换班主任</el-button>
          <el-button v-else type="success" size="small" @click="$router.push('/teacher/list?classId=0&setm='+scope.row.cid+'&p=0&key=')">
            添加班主任</el-button>
          <el-button type="danger" size="small" @click="handleDeleteClass(scope.row.cid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog title="编辑" :visible.sync="editClassVisible" :close-on-click-modal="false">
      <el-form :model="editClassData" label-width="80px" ref="editClassDom">
        <el-form-item label="班级Id" prop="cid">
          <el-input v-model="editClassData.cid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="班级名" prop="Name">
          <el-input v-model="editClassData.Name"></el-input>
        </el-form-item>
        <el-form-item label="班级logo" prop="HeadImgurl">
          <el-input v-model="editClassData.HeadImgurl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editClassVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editClassSubmit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加班级" :visible.sync="addClassVisible" :close-on-click-modal="false">
      <el-form :model="addClassData" label-width="80px" :rules="addClassRules" ref="addClassDom">
        <el-form-item l>
          <label style="fontsize:18">请选择要添加的班级所属的年级，比如选择初一，如果当前初一有2个班级，则新加一个班级名字为初一3班</label>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectedGrade" placeholder="请选择">
            <el-option v-for="i in gradeList" :key="i.ID" :label="i.GradeName" :value="i.ID">
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click.native="addClassSubmit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="指定班主任" :visible.sync="showSetClassAdminTeacher" :close-on-click-modal="false">
      <el-form :model="setClassAdminTeacherData" label-width="80px" ref="addClassDom">
        <el-form-item label="班级名字" prop="ClassID">
          <el-input v-model="setClassAdminTeacherData.Name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="班主任用户ID" prop="Meid">
          <el-input v-model="setClassAdminTeacherData.Meid"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showSetClassAdminTeacher = false">取消</el-button>
        <el-button type="primary" @click.native="setClassAdminTeacherSubmit">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      filters: {
        id: '',
      },
      editClassVisible: false,
      editClassData: {
        cid: '',
        Name: '',
        HeadImgurl: '',
      },
      addClassVisible: false,
      addClassRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      addClassData: {
        Name: '',
        HeadImgurl: '',
      },
      showSetClassAdminTeacher: false,
      setClassAdminTeacherData: {
        ClassID: '',
        Meid: ''
      },
      selectedGrade: '',

    }
  },
  computed: {
    data() {
      if (!this.$store.getters.classList.length) {
        return this.getData();
      }
      return this.$store.getters.classList;
    },
    total() {
      return this.$store.getters.classList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      if (!this.$store.getters.classList.length) {
        return this.getData();
      }
      return this.$store.getters.classList.slice(start, end)
    },
    gradeList() {
      return this.$store.getters.gradeList
    },
  },
  methods: {
    getData() {
      this.$store.dispatch('getClassList');
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    handleEditClass: function(row) {
      this.editClassVisible = true;
      this.editClassData = Object.assign({}, row);
    },
    handleAddClass: function() {
      this.addClassVisible = true;
      this.addClassData = {
        gid: '',
      };
    },
    handleDeleteClass: function(cid) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          cid: cid
        }
        this.$classAPI.deleteClass(para).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getData()
        }).catch((err) => {
          console.error('fff>>>>', err);
          this.$message({
            message: err.msg,
            type: 'error',
          })
        })
      })
    },
    editClassSubmit: function() {
      this.$refs.editClassDom.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //NProgress.start();
            editClassInfo(this.editClassData).then(() => {
              //NProgress.done();
              this.$refs['editClassDom'].resetFields();
              this.editClassVisible = false;
              this.getData()
            });
          }).catch((err) => {
            console.error('fff>>>>', err);
            this.$message({
              message: err.msg,
              type: 'error',
            })
          });
        }
      });
    },
    addClassSubmit() {
      this.$refs.addClassDom.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.$classAPI.addClass({ GradeID: this.selectedGrade }).then(() => {
              this.getData()
              this.$refs['addClassDom'].resetFields();
              this.addClassVisible = false;
            });
          }).catch((err) => {
            console.error('fff>>>>', err);
            this.$message({
              message: err.msg,
              type: 'error',
            })
          });
        }
      });
    },
    startSetClassAdminTeacher(val) {
      this.setClassAdminTeacherData = val
      this.showSetClassAdminTeacher = true
    },
    setClassAdminTeacherSubmit() {
      if (this.setClassAdminTeacherData.Meid === '') {
        this.$message.warning('数据不完整！')
      } else {
        this.$classAPI.setClassAdminTeacher(this.setClassAdminTeacherData).then(res => {
          this.$message.success('指定班主任成功！')
          this.setClassAdminTeacherData = {}
          this.showSetClassAdminTeacher = false
          this.getData()
        })
      }
    }
  },
  mounted() {
    if (!this.$store.getters.gradeList.length) {
      this.$store.dispatch('getGradeList')
    }
    this.getData();
  }
};

</script>

<style scoped>

</style>
