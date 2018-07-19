<template>

  <el-form :model="formData" v-loading="loading" :rules="rules" ref="form" label-width="150px" class="form">
    <el-row>
      <el-col :span="12">
        <el-form-item label="推流地址" >
          <el-input v-model="formData.PushUrl" disabled=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12"> <el-form-item label="播放地址" >
      <el-input v-model="formData.PlayUrl" disabled=""></el-input>
    </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"> <el-form-item label="直播间标题" prop="Title">
      <el-input v-model="formData.Title" placeholder="请输入通知标题"></el-input>
    </el-form-item></el-col>
      <el-col :span="12">  <el-form-item label="微信分享描述" prop="WXShareContent">
      <el-input v-model="formData.WXShareContent" placeholder="请输入通知标题"></el-input>
    </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><el-form-item label="微信分享图片">
      <el-upload
        class="avatar-uploader"
        :action="$store.getters._APIurl+'/api/Upload/ImageUpload'"
        :show-file-list="false"
        :on-success="handleWxImg">
        <img v-if="formData.WXSharePic" :src="formData.WXSharePic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item></el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-form-item label="活动内容" prop="Introduction">
      <vue-editor v-model="formData.Introduction"  useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button type="primary" plain @click="resetForm('form')">重置</el-button>
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
      id: "",
      dialogImageUrl: "",
      dialogVisible: false,
      formData: {},
      loading: false,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        intro: [{ required: true, message: "请输入内容" }],
        content: [{ required: true, message: "请选择通知类型" }],
        ExtraID: [
          { required: true, message: "请选择班级/年级", trigger: "change" }
        ]
      }
    };
  },
  components: {
    VueEditor
  },
  computed: {},
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.$API.getOneLiveRoom({ id: this.id }).then(res => {
        this.formData = res;
      });
    } else {
      this.$router.push("/live/list");
    }
  },
  methods: {
    handleImageAdded: function(file, Editor, cursorLocation) {
      var formData = new FormData();
      formData.append("image", file);
      axios({
        url: this.$store.getters._APIurl + "/api/Upload/ImageUpload",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.Content[0];
          Editor.insertEmbed(cursorLocation, "image", url);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleWxImg(file, fileList) {
      if (file.Content) {
        this.formData.WXSharePic = file.Content[0];
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //提交验证
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateLiveRoom();
        } else {
          return false;
        }
      });
    },
    //提交
    updateLiveRoom() {
      this.$confirm("确定提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        let para = {
          Introduction: this.formData.Introduction,
          Title: this.formData.Title,
          WXShareContent: this.formData.WXShareContent,
          WXSharePic: this.formData.WXSharePic
        };
        this.$API.updateLiveRoom(this.formData).then(res => {
          this.loading = false;
          console.log(res);
          if (res.Status == 1) {
            this.$message({
              message: "发布成功",
              type: "success"
            });
            this.$router.back();
          } else {
            this.$message.error("发布失败，请重试");
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  margin-top: 30px;
  max-width: 1200px;
  min-width: 800px;
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
