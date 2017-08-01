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
			<el-form :model="data" label-width="80px" ref="editTeacherDom">
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
		</el-card>
	
		</br>
	
		<el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">教师头像</span>
						<el-button style="float: right;" type="primary" @click.native="(editHeadImg === true)?editHeadImg = false:editHeadImg = true">修改</el-button>
					</div>
					<div class="item">
						<img v-show="!editHeadImg" class="avatar" :src="data.Headimgurl">
						<div v-show="editHeadImg">
							<el-upload class="avatar-uploader" 
							:action="$store.state.server.APIurl+'/api/Upload/ImageUpload'" 
							:show-file-list="false" 
							:on-success="handleAvatarSuccess" 
							:before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" v-if="!data.Classes.length">
					<div slot="header" class="clearfix">
						<span>执教班级</span>
					</div>
					<div class="item">
						尚未添加
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" v-show="data.Classes.length" v-for="c in data.Classes" :key="c.ClassID">
					<div slot="header" class="clearfix">
						<span @click="$router.push('/class/main?classId='+c.ClassID)">{{c.ClassName}}</span>
					</div>
					<div class="item">
						<p>执教科目：{{c.CourseName}}</p>
						<p>执教时间：{{c.Start}}</p>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						添加班级
					</div>
					<div class="item">
						<el-select v-model="addClassData.cid" filterable placeholder="请选择">
							<el-option
							v-for="item in $store.getters.classList"
							:key="item.cid"
							:label="item.Name"
							:value="item.cid">
							</el-option>
						</el-select>
						<p>{{addClassData.cid}}</p>
						<div class="btn">
							<el-button type="primary" @click.native="addClass">添加所属班级</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
			<!--<el-col :span="6">
						<el-card class="box-card" v-if="!data.teaching_experience.length">
							<div slot="header" class="clearfix">
								<span >教学经历</span>
							</div>
							<div class="item">
								尚未添加
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="box-card" v-if="data.teaching_experience.length" v-for="e in data.teaching_experience">
							<div slot="header" class="clearfix">
								<span >教学经历</span>
							</div>
							<div class="item">
								{{e}}
							</div>
						</el-card>
					</el-col>-->
		</el-row>
	
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
			addClassData:{
				cid:'',
				meid:'',
			}
		}
	},
	computed: {
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		refreshData(){
			if(this.$route.query.teacherId!=this.filters.teacherId){
				this.$router.push('/teacher/info?teacherId='+this.filters.teacherId)
			}
		},
		getData() {
			let para = {
				Meid: this.$route.query.teacherId
			};
			this.$teacherAPI.getTeacherInfo(para).then(res => {
				this.data = res
			}).catch(err=>{
				this.$message.error(err.msg);
			})
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = res.Content[0]
			this.data.Headimgurl=this.imageUrl
			this.$teacherAPI.editTeacher(this.data).then(res=>{
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
		addClass(){
			this.addClassData.meid=this.data.Meid
			this.$teacherAPI.addTeacherClass(this.addClassData).then(res=>{
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
		padding:20px;
	}
	.avatar {
		width: 200px;
		height: 200px;
		border-radius: 50%;
	}
	.btn{
		padding:10px;
	}
}
</style>
