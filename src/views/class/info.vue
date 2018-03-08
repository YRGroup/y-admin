<template>
	<section>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 36px;">学生详情</span>
				<el-button style="float: right;" type="primary" @click.native="changeEditInfo">编辑资料</el-button>
			</div>
			<el-form :model="user" label-width="80px" ref="editTeacherDom">
				<el-form-item label="学生Id">
					<el-input v-model="user.Meid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="user.Mobilephone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="家长手机">
					<el-input v-model="user.ParentPhone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="user.TrueName" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="user.Sex" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="user.SelfDiscription" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-input v-model="user.RegisterTime" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="国家">
					<el-input v-model="user.County" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="省">
					<el-input v-model="user.Province" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="城市">
					<el-input v-model="user.City" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="user.Address" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="民族">
					<el-input v-model="user.Nation" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="生日">
					<el-input v-model="user.Birthday" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="user.Headimgurl" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
			</el-form>
			<el-col :span="24" class="toolbar" v-show="ifEditInfo"  style="text-align:center;">
				<el-button type="primary" @click.native="handleEditClass()">提交修改</el-button>
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
						<p >所在班级：{{klass.Name}}</p>
					</div>
				</el-card>
			</el-col>
			
			<!--<el-col :span="6" v-for="p in parent">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">{{p.ParentType}}</span>
						<el-button style="float: right;" type="primary" @click.native="$router.push('/parent/info?parentId='+p.ParentMeid)">查看家长</el-button>
					</div>
					<div class="item">
						<p>{{p.ParentMeid}}</p>
						<p>{{p.ParentTrueName}}</p>
						<p>{{p.ParentPhone}}</p>
						<img :src="p.ParentHeadimgurl">
					</div>
				</el-card>
			</el-col>-->
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
				user:{},
				school:{},
				klass:[],
				parent:[],
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
					Meid: this.$route.query.studentId||'0ddavcge'
				};
				this.$studentAPI.getStudentInfo(para).then(res=>{
					this.data = res
					this.user = res.user
					this.school = res.School
					this.klass = res.Class
					this.parent = res.Parents
				})
			},
			changeEditInfo(){
				if(this.ifEditInfo){
					this.ifEditInfo=false
				}else{
					this.ifEditInfo=true
				}
			},
			handleEditClass(){
				this.user.Role = 1
				this.$studentAPI.editStudent(this.user).then(()=>{
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
