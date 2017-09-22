<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">

        <el-form-item label="班级">
          <el-select v-model="filters.cid" placeholder="请选择">
            <el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button type="success" @click="handleAddPost">新增动态</el-button>
        </el-form-item>

      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="auther" label="作者" sortable>
        </el-table-column>
        <!-- <el-table-column prop="category" label="类别" sortable>
          </el-table-column> -->
        <el-table-column prop="date" label="时间" min-width="100" sortable>
        </el-table-column>
        <el-table-column prop="content" label="内容" min-width="200" :show-overflow-tooltip="true" sortable>
        </el-table-column>
        <el-table-column prop="albums" label="配图">
          <template scope="scope">
            <el-button type="primary" size="small" v-if="scope.row.albums" @click="handleAlbums(scope.row.albums)">
              配图 {{scope.row.albums.length || 0}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="like" label="点赞" sortable>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template scope="scope">
            <el-button type="success" size="small" @click.native="handleLook(scope.row)">查看</el-button>
            <el-button type="primary" size="small" @click.native="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDeletePost(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog title="查看动态" v-model="perviewPostVisible" :close-on-click-modal="false">
      <div class="postContainer" v-if="perviewPostData!=={}">
        <div class="userFace" @click="openUserPage(i)">
          <img :src="perviewPostData.userImg">
        </div>
        <div class="header">{{perviewPostData.auther}}</div>
        <div class="content">{{perviewPostData.content}}</div>
        <div class="albums">
          <li v-for="(p,index) in perviewPostData.albums" :key="index">
            <img :src="p" @click="openImgBig(p)">
          </li>
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
          <template scope="scope">

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
        cid: ''
      },
      perviewPostData: {},
      perviewPostVisible: false,
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
    }
  },
  computed: {
    data() {
      if (!this.$store.getters.postList.length) {
        return this.getData();
      }
      return this.$store.getters.postList;
    },
    classList() {
      if (!this.$store.getters.classList.length) {
        this.$store.dispatch('getClassList')
      }
      return this.$store.getters.classList
    },
    total() {
      return this.$store.getters.postList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      if (!this.$store.getters.postList.length) {
        return this.getData();
      }
      return this.$store.getters.postList.slice(start, end)
    }
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.filters.cid = this.$route.query.id
      } else {
        this.filters.cid = this.classList[0].cid
      }
      let para = {
        cid: this.filters.cid,
        pagesize: this.pageSize,
        currentPage: this.page
      };
      this.$store.dispatch('getPostList', para);
    },
    handleLook(val) {
      this.perviewPostData = val
      this.perviewPostVisible = true
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    handleAlbums(val) {
      this.albums = val
      this.albumsVisible = true
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
    handleDeletePost(did) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          did: did
        }
        this.$postAPI.deletePost(para).then(() => {
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
    this.getData()
  },
  watch: {
    "$route": "getData"
  },
};

</script>

<style lang="less" scoped>
.postContainer {
  margin: 15px 0;
  position: relative;
  background: #fff;
  padding-left: 80px;
  .userFace {
    position: absolute;
    left: 20px;
    top: 20px;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }
  .header {
    display: inline-block;
    font-size: 16px;
    line-height: 42px;
  }
  .content {
    line-height: 24px;
    word-break: break-all;
    cursor: pointer;
    color: #666;
  }
  .albums {
    margin: 10px 0;
    li {
      display: inline-block;
      img {
        max-height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
