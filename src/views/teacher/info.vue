<template>
	<section>

		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="教师ID">
					<el-input v-model="filters.teacherId" placeholder="教师ID"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="refreshData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 36px;">教师详情</span>
				<el-button style="float: right;" type="primary" @click.native="changeEditInfo">编辑资料</el-button>
			</div>
			<div>
				<div class="content" v-show="!ifEditInfo">
					<div class="itemList">
						<div class="item-content">
							<p>
								<span class="title">手机：</span>
								<span>{{data.Mobilephone}}</span>
							</p>
							<p>
								<span class="title">姓名：</span>
								<span>{{data.TrueName}}</span>
							</p>
							<p>
								<span class="title">性别：</span>
								<span>{{data.Sex}}</span>
							</p>
							<p>
								<span class="title">学科：</span>
								<span>{{data.Course}}</span>
							</p>
							<p>
								<span class="title">生日：</span>
								<span>{{data.Resume}}</span>
							</p>
							<p>
								<span class="title">身份证号：</span>
								<span>{{data.IDCard}}</span>
							</p>
							<p>
								<span class="title">民族：</span>
								<span>{{data.Volk}}</span>
							</p>
							<p>
								<span class="title">政治面貌：</span>
								<span>{{data.PoliticalStatus}}</span>
							</p>
							<p>
								<span class="title">教龄：</span>
								<span>{{data.SchoolAge}}</span>
							</p>
							<p>
								<span class="title">职称：</span>
								<span>{{data.Title}}</span>
							</p>
						</div>
					</div>
					<div class="itemList">
						<div class="header">
							<i class="iconfont">&#xe69b;</i>教学经历</div>
						<div class="item-content">
							<p v-for="(i,index) in data.TeachExperience" :key="index">
								<span class="name">{{i.SchoolName}}</span>
								<span class="time">{{i.StartTime}} - {{i.EndTime}}</span>
							</p>
						</div>
					</div>
					<div class="itemList">
						<div class="header">
							<i class="iconfont">&#xe63d;</i>个人荣誉</div>
						<div class="item-content">
							<li class="honorItem" v-for="(i,index) in data.PersonalHonor" :key="index">
								<img :src="i.ImgPath">
								<div class="info">{{i.Description}}</div>
							</li>
						</div>
					</div>
				</div>
				<el-form :model="data" label-width="80px" ref="editTeacherDom" v-show="ifEditInfo">
					<el-form-item label="教师Id" class="form2">
						<el-input v-model="data.Meid" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="手机" class="form2">
						<el-input v-model="data.Mobilephone" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="姓名" class="form3">
						<el-input v-model="data.TrueName" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="性别" class="form3">
						<el-input v-model="data.Sex" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="民族" class="form3">
						<el-input v-model="data.Volk" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="科目" class="form3">
						<el-input v-model="data.Course" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="教龄" class="form3">
						<el-input v-model="data.SchoolAge" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="职称" class="form3">
						<el-input v-model="data.Title" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="身份证">
						<el-input v-model="data.IDCard" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="个人荣誉" class="form3">
						<el-input v-model="data.PersonalHonor" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="政治面貌" class="form3">
						<el-input v-model="data.PoliticalStatus" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="原始学历专业" class="form3">
						<el-input v-model="data.Professional" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="简历">
						<el-input v-model="data.Resume" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input v-model="data.Remark" :disabled="ifEditInfo?false:true"></el-input>
					</el-form-item>
				</el-form>
				<el-col :span="24" class="toolbar" v-show="ifEditInfo" style="text-align:center;">
					<el-button type="primary" @click.native="handleEditTeacher()">提交修改</el-button>
				</el-col>
			</div>
		</el-card>

	</section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			data: { Classes: [], Meid: '', Mobilephone: '', TrueName: '', Sex: '', Volk: '', Course: '', SchoolAge: '', Title: '', IDCard: '', PersonalHonor: '', PoliticalStatus: '', Professional: '', Resume: '', Remark: '', },
			ifEditInfo: false,
			editHeadImg: false,
			imageUrl: '',
			filters: {
				teacherId: this.$route.query.teacherId,
			},
			courseList: [
				{
					CourseId: 1,
					name: '语文'
				},
				{
					CourseId: 2,
					name: '数学'
				},
				{
					CourseId: 3,
					name: '英语'
				},
				{
					CourseId: 4,
					name: '物理'
				},
				{
					CourseId: 5,
					name: '化学'
				},
				{
					CourseId: 6,
					name: '生物'
				},
				{
					CourseId: 7,
					name: '历史'
				},
				{
					CourseId: 8,
					name: '地理'
				},
				{
					CourseId: 9,
					name: '政治'
				},
			],
			addClassData: {
				cid: '',
				meid: '',
				course_name: ''
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
			if (this.$route.query.teacherId != this.filters.teacherId) {
				this.$router.push('/teacher/info?teacherId=' + this.filters.teacherId)
			}
		},
		getData() {
			let para = {
				Meid: this.$route.query.teacherId
			};
			this.$teacherAPI.getTeacherInfo(para).then(res => {
				this.data = res
			}).catch(err => {
				this.$message.error(err.msg);
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
		handleEditTeacher() {
			this.$teacherAPI.editTeacher(this.data).then(() => {
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
		addClass() {
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


.content {
	line-height: 2em;
	.itemList {
		padding: 30px 20px;
		position: relative;
		&:last-child {
			border: none;
		}
		.setBtn {
			position: absolute;
			right: 20px;
			top: 30px;
			padding: 1px 10px;
			border-radius: 4px;
			cursor: pointer;
			&:hover {
				color: #fff;
			}
		}
		.header {
			line-height: 28px;
			font-size: 16px;
			margin-bottom: 10px;
			.iconfont {
				margin-right: 8px;
			}
		}
		.item-content {
			// padding-top:30px;
			// text-align: center;
			margin-left: 40px;
			line-height: 2em;
			.name {
				width: 500px;
				display: inline-block;
			}
			.title {
				text-align: right;
				display: inline-block;
				width: 80px;
			}
			.img {
				display: inline-block;
				padding-right: 15px;
				img {
					width: 120px; // border-radius: 50%;
				}
			}
		}
	}
}

.honorItem {
	max-width: 120px;
	display: inline-block;
	text-align: center;
	padding: 20px;
	img {
		width: 100%;
	}
}
</style>
