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
    
        <el-form-item label="分类">
          <el-select v-model="filter.cateid" placeholder="请选择">
            <el-option v-for="item in categoryList " :key="item.CateID" :label="item.CateName" :value="item.CateID"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input clearable type="primary"  placeholder="输入关键字" v-model="seachText" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="getData()" >搜索</el-button>
        </el-form-item>
        <el-form-item >
          <el-button type="warning"  @click="$router.push('/notice/form');" >发布通知</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="CreateTime" label="上传时间" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.CreateTime.replace('T','  ')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="TypeName" label="通知类型" align="center">
        </el-table-column>
        <el-table-column prop="Content" label="通知内容" align="center">
        </el-table-column>
        <el-table-column prop="ExtraID" label="班级/年级" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.ExtraID" type="success">
              {{scope.row.ExtraID}}
            </el-tag>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <!-- <el-button type="warm" size="small" @click.native="handleInfoVideo(scope.row.ID)">
              详情
            </el-button> -->
            <el-button type="danger" size="small" @click.native="deleNotice(scope.row.ID)">
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

  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'userList',
  data() {
    return {
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      currentPage:1,
      seachText:'',
      filter: {
        key: '',
        cateid: '',
        grade: ''
      },
      categoryList: [],
      gradeList:[],
      tableData:[]
    }
  },
  computed: {
    classList() {
      return this.$store.getters.classList;
    },
    total() {
      return this.tableData.length
    },
    currentData() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = this.currentPage * this.pageSize
      return this.tableData.slice(start, end)
    }
  },
  methods: {
    //视频分类列表
    getCategoryList() {
      this.$API.getCategeryList().then(res => {
        this.categoryList=res
        this.categoryList.unshift({ CateName: "全部", CateID: -1 })
      });
    },
    //年级列表
    getGradeList() {
      this.$API.getGradeList().then(res => {
        this.gradeList = res
        this.gradeList.unshift({ GradeName: "全部", ID: -1 })
      });
    },
    //数据列表
    getData() {
      let para = {
        currentPage:this.currentPage,
        pagesize:this.pageSize
      }
      this.$API.getNotice(para).then(res => {
        console.log(res)
        this.tableData=res
      })
    },
    //删除通知
    deleNotice(id){
      this.$API.deleNotice(id).then(res=>{
        console.log (res)
        if(res.Status==1){
          this.$message.success({
            message:'删除成功'
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:'删除失败'
        })
      })
      this.getData()
    },
    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    }
  },
  created() {
    this.getCategoryList()
    this.getGradeList()
    this.getData()
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
  padding-left: 20px;
  padding-top: 20px;
  margin: 20px 0;
}
.addCol{
  display: inline-block;
  margin-top: 30px;
}
</style>
