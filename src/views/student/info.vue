<template>
	<section>
	
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="学生ID">
					<el-input v-model="filters.studentId" placeholder="学生ID"></el-input>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" @click="refreshData">查询</el-button>
				</el-form-item>
	
			</el-form>
		</el-col>
	
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 36px;">学生详情</span>
				<el-button style="float: right;" type="primary" @click.native="changeEditInfo">编辑资料</el-button>
			</div>
			<el-form :model="user" label-width="80px" ref="editTeacherDom">
				<el-form-item label="学生Id">
					<el-input v-model="user.Meid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机" class="form2">
					<el-input v-model="user.Mobilephone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="家长手机" class="form2">
					<el-input v-model="user.ParentPhone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名" class="form2">
					<el-input v-model="user.TrueName" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="性别" class="form2">
					<el-input v-model="user.Sex" :disabled="ifEditInfo?false:true"></el-input>
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
				<el-form-item label="民族" class="form2">
					<el-input v-model="user.Nation" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="生日" class="form2">
					<el-input v-model="user.Birthday" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="user.Headimgurl" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
			</el-form>
			<el-col :span="24" class="toolbar" v-show="ifEditInfo" style="text-align:center;">
				<el-button type="primary" @click.native="handleEditStudent()">提交修改</el-button>
			</el-col>
		</el-card>
	
		</br>
	
		<el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">就学信息</span>
						<el-button style="float: right;" type="primary" @click.native="$router.push('/class/info?classId='+klass.ID)">查看班级</el-button>
					</div>
					<div class="item">
						<p>所在学校：{{school.Name}}</p>
						<p>所在班级：{{klass.Name}}</p>
					</div>
				</el-card>
			</el-col>
	
			<el-col :span="6" v-for="p in parent" :key="p.ParentMeid">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">{{p.ParentType}}</span>
						<el-button style="float: right;" type="primary" @click.native="$router.push('/parent/info?parentId='+p.ParentMeid)">查看家长资料</el-button>
					</div>
					<div class="item">
						<p>{{p.ParentTrueName}}</p>
						<p>{{p.ParentPhone}}</p>
						<img :src="p.ParentHeadimgurl">
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
			data: {},
			user: {},
			school: {},
			klass: [],
			parent: [],
			ifEditInfo: false,
			filters: {
				studentId: this.$route.query.studentId,
			},
		}
	},
	computed: {
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		refreshData(){
			if(this.$route.query.studentId!=this.filters.studentId){
				this.$router.push('/student/info?studentId='+this.filters.studentId)
			}
		},
		getData() {
			let para = {
				Meid: this.$route.query.studentId
			};
			this.$studentAPI.getStudentInfo(para).then(res => {
				this.data = res
				this.user = res.user
				this.school = res.School
				this.klass = res.Class
				this.parent = res.Parents
			})
		},
		changeEditInfo() {
			if (this.ifEditInfo) {
				this.ifEditInfo = false
			} else {
				this.ifEditInfo = true
			}
		},
		handleEditStudent() {
			this.user.Role = 1
			this.$studentAPI.editStudent(this.user).then(() => {
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
.box-card {
	.item {
		//    min-height:200px;
	}
}
</style>
