<template>

  <el-form  v-loading="loading"  ref="form" label-width="150px" class="form">
    <el-form-item label="开启节目投票">
      <el-switch v-model="IsVote"></el-switch>
    </el-form-item>

    <transition name="el-fade-in" >
      <el-form-item v-if="IsVote" label="投票节目列表：">
        <div v-for="(item,index) in programList" :key="index" class="flexBox">
          <el-input placeholder="节目名称" v-model="item.ProgramName"></el-input>
          <el-input placeholder="表演者" v-model="item.Actor"></el-input>
          <el-button type="text" size="mini"  icon="el-icon-close" @click.native="delProgram(item.ID,index)"></el-button>
        </div>
        <div>
          <el-button plain  type="primary" icon="el-icon-plus" @click.native="addProgram"></el-button>
        </div>
      </el-form-item>
    </transition>
    <el-form-item  v-if="IsVote">
      <el-button type="primary" @click.native="UProgramList()">提交</el-button>
      <el-button type="warning" plain @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  data() {
    return {
      IsVote: false,
      programList: [],
      loading: false
    };
  },
  components: {
    VueEditor
  },
  computed: {},
  created() {
    this.id = this.$route.params.id;
    this.IsVote = this.$route.query.IsVote;
    if (this.id) {
      this.$API.getProgramList({ lid: this.id }).then(res => {
        if (res.Content.length) {
          this.programList = res.Content;
        } else {
          this.programList.push({
            ID: 0,
            LiveID: this.id,
            ProgramName: "",
            Actor: "",
            VoteCount: 0
          });
        }
      });
    } else {
      this.$router.push("/live/list");
    }
  },
  methods: {
    getProgramList() {},
    addProgram() {
      let program = {
        ID: 0,
        LiveId: this.id,
        ProgramName: "",
        Actor: "",
        VoteCount: 0
      };
      this.programList.push(program);
    },
    delProgram(pid, index) {
      let para = {
        lid: this.id,
        pid: pid
      };
      this.$API
        .delProgram(para)
        .then(res => {
          console.log(res);
          this.removeProgram(index);
        })
        .catch(err => {
          this.$message({
            message: err.msg,
            type: "error"
          });
        });
    },
    removeProgram(index) {
      this.programList.splice(index, 1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //提交验证
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.UProgramList();
        } else {
          return false;
        }
      });
    },
    //提交节目列表
    UProgramList() {
      this.loading = true;
      let para = this.programList;
      this.$API
        .updateProgramList(para)
        .then(res => {
          console.log(res);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //开启、关闭投票功能
    setIsVote(isVote) {
      let para = {
        ID: this.id,
        IsVote: isVote
      };
      this.$API.updateLiveRoom(para).then(res => {});
    }
  },
  watch: {
    IsVote(newVal) {
      this.setIsVote(newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  margin-top: 30px;
  max-width: 800px;
  .flexBox {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 10px 0;
    .el-input {
      width: 45%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ddd;
}
.avatar {
  width: 350px;
  height: 178px;
  display: block;
}
</style>
