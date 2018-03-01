<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">

        <el-form-item label="班级">
          <el-select @change="changeClass" v-model="filters.cid" placeholder="请选择">
            <el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button type="success" @click="handleAddPost" :disabled="true">添加作业</el-button>
        </el-form-item>

      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="data" highlight-current-row style="width: 100%;">
      <el-table-column fixed="left" type="index" width="60">
      </el-table-column>
      <el-table-column prop="HID" label="ID" sortable>
      </el-table-column>
      <el-table-column prop="AutherName" label="作者" sortable>
      </el-table-column>
      <el-table-column prop="CourseName" label="科目" sortable>
      </el-table-column>
      <el-table-column prop="Title" label="标题" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="Content" label="内容" min-width="200" :show-overflow-tooltip="true" sortable>
      </el-table-column>
      <el-table-column prop="Albums" label="配图">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.Albums.length" @click="handleAlbums(scope.row.Albums)">
            配图 {{scope.row.Albums.length}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="CreateTime" label="时间" min-width="100" sortable>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click.native="handleLook(scope.row)">查看</el-button>
          <!-- <el-button type="primary" size="small" @click.native="handleEdit(scope.row)">编辑</el-button> -->
          <el-button type="danger" size="small" @click="handleDeleteHomework(scope.row.HID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes,  prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog title="查看作业" v-model="perviewHomeworkVisible" :close-on-click-modal="false">
      <div class="homeworkContainer" v-if="perviewHomeworkData!=={}">
        <div class="course">
          {{perviewHomeworkData.CourseName}}
        </div>
        <div class="tasktitle">{{perviewHomeworkData.Title}}</div>
        <div class="taskbox">
          <div class="taskcon">{{perviewHomeworkData.Content}}</div>
          <div class="albums">
            <li v-for="(p,index) in perviewHomeworkData.Albums" :key="index">
              <img :src="p" @click="openImgBig(p)">
            </li>
          </div>
          <div class="taskbottom">
            <span class="time">{{perviewHomeworkData.CreateTime}}</span>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="新增动态" v-model="addPostVisible" :close-on-click-modal="false">
      <el-form :model="addPostData" label-width="80px" :rules="addPostRules" ref="addPostDom">
        <el-form-item label="作者" prop="auther">
          <el-input v-model="addPostData.auther"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select v-model="addPostData.type">
            <el-option label="动态" value="1"></el-option>
            <el-option label="新闻" value="2"></el-option>
            <el-option label="通知" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="addPostData.content" type="textarea" :autosize="{ minRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addPostVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addPostSubmit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看配图" v-model="albumsVisible" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in albums" :key="i">
          <div class="pic">
            <img style="max-width:100%" :src="i">
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="查看评论" v-model="commentVisible" :close-on-click-modal="false">
      <el-table :data="comment" highlight-current-row>
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="TrueName" label="作者" sortable>
        </el-table-column>
        <el-table-column prop="content" label="内容" sortable>
        </el-table-column>
        <el-table-column prop="addTime" label="时间" sortable>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDeleteComment(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'postList',
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      filters: {
        cid: 0,
        type: 1
      },
      perviewHomeworkData: {},
      perviewHomeworkVisible: false,
      addPostVisible: false,
      addPostRules: {
        auther: [
          { required: true, message: '请输入作者ID', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
      },
      addPostData: {},
      albumsVisible: false,
      albums: [],
      commentVisible: false,
      comment: [],
      data:[],
    }
  },
  computed: {
    
    classList() {
       if (!this.$store.getters.classList.length) {
        this.$store.dispatch('getClassList')
      }
      else
      {
        if(this.$store.getters.classList[0].cid!=0)
          this.$store.getters.classList.unshift({cid:0,Name:'全部'})
        return this.$store.getters.classList
      }
    },
    total() {
      if(this.data.length==this.pageSize)//可能有下一页
        return this.data.length*this.page+this.pageSize
      return this.data.length+((this.page-1)*this.pageSize);
    },
  },
  methods: {
    show(val) {
      console.log(val)
    },
    changeClass(cid) {
        this.getData(cid) 
    },
    getData(cid) {
      if(cid){
        this.filters.cid=cid;
      }
      else{
         if (this.$route.query.id) {
          this.filters.cid = this.$route.query.id
        } else {
          this.filters.cid = 0
        }
      }
      let para = {
        cid: this.filters.cid,
        pagesize: this.pageSize,
        currentPage: this.page,
      };
      this.$API.getHomeworkList(para).then((res) => {
        //console.log(res)
          this.data=res
        }).catch((err) => {
          this.$message({
            message: '加载数据失败!',
            type: 'error',
          })
        })
    },
    handleLook(val) {
      this.perviewHomeworkData = val
      this.perviewHomeworkVisible = true
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData(this.filters.cid)
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData(this.filters.cid)
    },
    handleAlbums(val) {
      this.albumsVisible = true
      this.albums = val
    },
    handleComment(val) {
      this.commentVisible = true
      this.comment = val
    },
    handleDeleteComment(cid) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          cid: cid
        }
        this.$postAPI.deleteNewsComment(para).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.commentVisible = false
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
    handleDeleteHomework(hid) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          hid: hid
        }
        this.$API.deleteHomework(para).then(() => {
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
    handleAddPost() {
      this.addPostVisible = true;
      this.addPostData = {
        auther: '',
        type: '1',
        content: '',
      };
    },
    addPostSubmit: function() {
      this.$refs.addPostDom.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //NProgress.start();
            this.addPostData.cid = this.filters.cid
            this.$postAPI.addPost(this.addPostData).then(() => {
              //NProgress.done();
              this.$refs['addPostDom'].resetFields();
              this.addPostVisible = false;
              this.getData()
            });
          });
        }
      });
    },
  },
  mounted() {
   this. getData(0);
  },
  watch: {
    "$route": "getData"
  },
};

</script>

<style lang="less" scoped>
.homeworkContainer {
  margin-bottom: 15px;
  position: relative;
  .course {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 24px 0 30px;
    display: inline-block;
    color: #fff;
    line-height: 36px;
    opacity: 0.6;
    &:before {
      position: absolute;
      content: '';
      left: 0;
      width: 0;
      height: 0;
      border: 18px solid transparent;
      border-left-color: #fff;
    }
  }
  .tasktitle {
    line-height: 36px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .taskbox {
    color: #666;
    cursor: pointer;
    .taskcon {
      margin: 0 auto;
      img {
        text-align: center;
        max-height: 100px;
      }
    }
    .albums {
      overflow: hidden;
      li {
        float: left;
        width: 120px;
        height: 120px;
        line-height: 120px;
        margin: 10px 10px 0 0;
      }
      img {
        max-width: 120px;
      }
    }
    .taskbottom {
      margin-top: 10px;
      .time {
        padding-top: 20px;
        font-size: 12px;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}
</style>
