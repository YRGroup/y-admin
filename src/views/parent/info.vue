<template>
	<section>
	
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="家长ID">
					<el-input v-model="filters.parentId" placeholder="家长ID"></el-input>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" @click="refreshData">查询</el-button>
				</el-form-item>
	
			</el-form>
		</el-col>
	
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 36px;">家长详情</span>
				<el-button style="float: right;" type="primary" @click.native="changeEditInfo">编辑资料</el-button>
			</div>
			<el-form :model="user" label-width="80px" ref="editTeacherDom">
				<el-form-item label="家长Id" class="form2">
					<el-input v-model="user.Meid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机" class="form2">
					<el-input v-model="user.Mobilephone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名" class="form3">
					<el-input v-model="user.TrueName" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="性别" class="form3">
					<el-input v-model="user.Sex" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="民族" class="form3">
					<el-input v-model="user.Nation" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="user.SelfDiscription" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-input v-model="user.RegisterTime" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="国家" class="form3">
					<el-input v-model="user.County" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="省" class="form3">
					<el-input v-model="user.Province" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="城市" class="form3">
					<el-input v-model="user.City" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="user.Address" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="生日">
					<el-input v-model="user.Birthday" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
			</el-form>
			<el-col :span="24" class="toolbar" v-show="ifEditInfo" style="text-align:center;">
				<el-button type="primary" @click.native="handleEditParent()">提交修改</el-button>
			</el-col>
		</el-card>
	
		</br>
	
		<el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">家长头像</span>
						<el-button style="float: right;" type="primary" @click.native="(editHeadImg === true)?editHeadImg = false:editHeadImg = true">修改</el-button>
					</div>
					<div class="item">
						<img v-show="!editHeadImg" class="avatar" :src="user.Headimgurl">
						<div v-show="editHeadImg">
							<el-upload class="avatar-uploader" :action="$store.state.server.APIurl+'/api/Upload/ImageUpload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</div>
					</div>
				</el-card>
			</el-col>
	
			<el-col :span="6">
				<el-card class="box-card" v-show="user.Students.length" v-for="c in user.Students" :key="c.Meid">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">学生信息</span>
						<el-button style="float: right;" type="primary" @click.native="$router.push('/student/info?studentId='+c.Meid)">详情</el-button>
					</div>
					<div>
						<p>姓名：{{c.TrueName}}</p>
						<p>性别：{{c.Sex}}</p>
						<p>学号：{{c.StudentID}}</p>
						<p>班级：{{c.ClassName}}</p>
					</div>
				</el-card>
			</el-col>
	
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						添加学生
					</div>
					<div class="item">
						<el-input v-model="addStudentData.meid" placeholder="请输入学生ID"></el-input>
						<div class="btn">
							<el-button type="primary" @click.native="addStudent">添加关联学生</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
	
		</el-row>
	
	</section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			user: {},
			school: {},
			klass: [],
			parent: [],
			ifEditInfo: false,
			editHeadImg: false,
			imageUrl: '',
			filters: {
				parentId: this.$route.query.parentId,
			},
			addStudentData: {
				cid: '',
				meid: '',
			}
		}
	},
	computed: {
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		refreshData() {
			if (this.$route.query.parentId != this.filters.parentId) {
				this.$router.push('/parent/info?parentId=' + this.filters.parentId)
			}
		},
		getData() {
			let para = {
				Meid: this.$route.query.parentId
			};
			this.$parentAPI.getParentInfo(para).then(res => {
				this.user = res.user
				this.school = res.School
				this.klass = res.Class
				this.parent = res.Parents
			})
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = res.Content[0]
			this.data.Headimgurl = this.imageUrl
			this.$teacherAPI.editTeacher(this.data).then(res => {
				this.getData()
			})
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		changeEditInfo() {
			if (this.ifEditInfo) {
				this.ifEditInfo = false
			} else {
				this.ifEditInfo = true
			}
		},
		handleEditParent() {
			this.user.Role = 1
			this.$parentAPI.editParent(this.user).then(() => {
				this.$message({
					message: '修改成功',
					type: 'success',
				})
				this.ifEditInfo = false
				this.getData()
			}
			).catch(() => {
				this.$message({
					message: '修改失败',
					type: 'error',
				})
			})
		},
		addStudent() {
			this.addClassData.meid = this.data.Meid
			this.$teacherAPI.addTeacherClass(this.addClassData).then(res => {
				this.$message({
					message: '添加所属班级成功',
					type: 'success',
				})
				this.getData()
			})
		}
	},
	mounted() {
		this.getData()
	},
	watch: {
		'$route': 'getData'
	}
};

</script>

<style lang="less" scoped>
.item {
	text-align: center;
	.avatar-uploader-icon {
		font-size: 100px;
		padding: 20px;
	}
	.avatar {
		width: 200px;
		height: 200px;
		border-radius: 50%;
	}
	.btn {
		padding: 10px;
	}
}
</style>
