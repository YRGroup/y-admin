<template>

  <el-form  v-loading="loading"  ref="form" label-width="150px" class="form">
    <el-form-item label="活动内容" prop="Introduction">
      <vue-editor v-model="Introduction"  useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="updateLiveRoom()">立即创建</el-button>
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
      loading: false,
      Introduction: ""
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
        this.Introduction = res.Introduction;
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
          Introduction: this.Introduction,
          ID: this.id
        };
        this.$API.updateLiveRoom(para).then(res => {
          this.loading = false;
          this.$message({
            message: "发布成功",
            type: "success"
          });
          this.$router.back();
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
