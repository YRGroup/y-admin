<template>
	<section>

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
				<el-form-item label="科目" class="form3">
					<el-input v-model="data.Course" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="data.SelfDiscription" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="data.Headimgurl" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
			</el-form>
			<el-col :span="24" class="toolbar" v-show="ifEditInfo"  style="text-align:center;">
				<el-button type="primary" @click.native="handleEditTeacher()">提交修改</el-button>
			</el-col>
		</el-card>

		</br>

		<el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card" v-if="!data.Classes.length">
					<div slot="header" class="clearfix">
						<span >执教班级</span>
					</div>
					<div class="item">
						尚未添加
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" v-if="data.Classes.length" v-for="c in data.Classes" :key="c.CourseName">
					<div slot="header" class="clearfix">
						<span @click="$router.push('/class/main?classId='+c.ClassID)">{{c.ClassName}}</span>
					</div>
					<div class="item">
						<p>执教科目：{{c.CourseName}}</p>
						<p>执教时间：{{c.Start}}</p>
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
				data:{},
				ifEditInfo:false,
			}
		},
		computed: {
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			getData() {
				let para = {
					Meid: this.$route.query.teacherId||'0ddavcge'
				};
				this.$teacherAPI.getTeacherInfo(para).then(res=>{
					this.data = res
				})
			},
			changeEditInfo(){
				if(this.ifEditInfo){
					this.ifEditInfo=false
				}else{
					this.ifEditInfo=true
				}
			},
			handleEditTeacher(){
				this.$teacherAPI.editTeacher(this.data).then(()=>{
						this.$message({
							message: '修改成功',
							type: 'success',
						})
						this.ifEditInfo=false
						this.getData()
					}
				).catch(()=>{
					this.$message({
						message: '修改失败',
						type: 'error',
					})
				})
			},
		},
		mounted(){
			this.getData()
		}
	};

</script>

<style lang="less" scoped>
.box-card {
   	.item{
		//    min-height:200px;
	   }
  }
</style>
