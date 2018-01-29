<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item label="年级">
          <el-select v-model="filter.grade" placeholder="请选择">
            <el-option v-for="item in gradeList" :key="item.ID" :label="item.GradeName" :value="item.ID"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-input clearable type="primary"  placeholder="输入关键字" v-model="seachText" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="getData()" >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
 
    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="SMS.TemplateName" label="短信主题" align="center" width="200">
        </el-table-column>
        <el-table-column prop="TrueName" label="发送人" align="center" width="100">
        </el-table-column>
        <el-table-column prop="ClassName" label="班级" align="center" width="150">
        </el-table-column>
        <el-table-column prop="SMS.TemplateExample" label="短信内容" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <el-table-column prop="SMS.Phones" label="接收人数" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="warm" size="small" @click.native="checkNodeInfo(scope.row.SMS.Phones)">
              {{JSON.parse(scope.row.SMS.Phones).length}}
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="warm" size="small" @click.native="handleInfoVideo(scope.row)">
              详情
            </el-button>
            <el-button type="danger" size="small" @click.native="handleDeleteVideo(scope.row.AliyunCateID)">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </template>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'userList',
  data() {
    return {
      page: 1,
      pageSize: 12,
      pageSizes: [10, 20, 30, 50],
      seachText:'',
      filter: {
        key: '',
        cateid: '',
        grade: ''
      },
      gradeList:[],
      noteList:[]
    }
  },
  computed: {
    total() {
      return this.noteList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize
      let end = this.page * this.pageSize
      return this.noteList.slice(start, end)
    }
  },
  methods: {
    checkNodeInfo(val){
        this.$router.push({
        path:`/note/info`,
        query:{
          info:val
        }
      })
    },
    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
    },
      //年级列表
    getGradeList() {
      this.$API.getGradeList().then(res => {
        this.gradeList = res
      });
    },
    getData(){
      this.$API.getNoteList().then(res => {
        this.noteList = res
      });
    }
  },
  created() {
    this.getGradeList()
    this.getData()
  },
  mounted() {

  }
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
  padding-left: 20px;
  padding-top: 20px;
  margin: 20px 0;
}
.addCol{
  display: inline-block;
  margin-top: 30px;
}
</style>
