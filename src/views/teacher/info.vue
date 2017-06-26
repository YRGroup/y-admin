<template>
	<section>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 36px;">教师详情</span>
				<el-button style="float: right;" type="primary" @click.native="changeEditInfo">编辑资料</el-button>
			</div>
			<el-form :model="data" label-width="80px" ref="editTeacherDom">
				<el-form-item label="教师Id">
					<el-input v-model="data.Meid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="data.TrueName" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="data.Sex" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="data.SelfDiscription" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="data.Headimgurl" :disabled="ifEditInfo?false:true"></el-input>
				</el-form-item>
			</el-form>
			<el-col :span="24" class="toolbar" v-show="ifEditInfo">
				<el-button type="primary" size="small" @click.native="handleEditTeacher(scope.row)">提交修改</el-button>
			</el-col>
		</el-card>

		</br>

		<el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span >班级</span>
					</div>
					<div class="item">
						000
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">卡片名称</span>
						<el-button style="float: right;" type="primary">操作按钮</el-button>
					</div>
					<div class="item">
						000
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">卡片名称</span>
						<el-button style="float: right;" type="primary">操作按钮</el-button>
					</div>
					<div class="item">
						000
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
					Meid: this.$route.query.id,
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
			}
		},
		mounted(){
			this.getData()
			console.log(navigator)
		}
	};

</script>

<style lang="less" scoped>
.box-card {
   	.item{
		   min-height:200px;
	   }
  }
</style>
