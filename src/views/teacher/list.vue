<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

		<el-form :inline="true" :model="filters">

				<el-form-item label="班级">
					<el-select v-model="filters.cid"  placeholder="选择班级">

						<el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="教师姓名/手机号">
					<el-input v-model="filters.key" placeholder="请输入教师姓名或者手机号"></el-input>	
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="getData()">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	
		<!--列表-->
		<template>
			<el-table :data="teacherList" highlight-current-row  style="width: 100%;">
				<el-table-column fixed="left" label="序号" type="index" width="65">
				</el-table-column>
				<el-table-column prop="Headimgurl" align="center" label="头像">
					<template slot-scope="scope">				
						<img :src="scope.row.Headimgurl"  width="50" height="50">		
					</template>
				</el-table-column>
				<el-table-column prop="TrueName" label="名字" >
				</el-table-column>
				<el-table-column prop="Mobilephone" label="手机" >
				</el-table-column>
				<el-table-column prop="Sex" label="性别" >
				</el-table-column>
				<el-table-column prop="Classes" label="科目" >
					<template slot-scope="scope">				
						<li style="list-style-type:none;" v-for="(item,index) in scope.row.Classes" :key="index" value='CourseName' >{{item.CourseName + (item.Role==1?'/班主任':'')}}</li>	
				
					</template>
				</el-table-column>
				<!-- <el-table-column prop="className" label="班级" >
					<template slot-scope="scope">				
						<li style="list-style-type:none;" v-for="(item,index) in scope.row.Classes" :key="index" value='CourseName' >{{item.ClassName}}</li>	
				
					</template>
				</el-table-column> -->
				
				<el-table-column  v-if="filters.setm>0" fixed="right" label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click.native="setClassAdminTeacher(scope.row.Meid)" plain>
							设为 <span class="className">{{className}}</span> 班主任
						</el-button>
					</template>
				</el-table-column>
				<el-table-column v-else fixed="right" label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click.native="$router.push('/teacher/info?teacherId='+scope.row.Meid)">
							详情
						</el-button>
						<el-button type="warning" size="small" @click.native="handleEditTeacher(scope.row)">
							编辑
						</el-button>
						<el-button type="danger" size="small" @click.native="handleDeleteTeacher(scope.row.Meid)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
	
		<el-col :span="24" class="toolbar">
			<el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	
		<el-dialog title="编辑教师信息" :visible.sync="editTeacherVisible" :close-on-click-modal="false">
			<el-form :model="editTeacherData" label-width="80px" ref="editTeacherDom">
				<el-form-item label="教师Id">
					<el-input v-model="editTeacherData.Meid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="editTeacherData.TrueName"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="editTeacherData.Sex"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="editTeacherData.SelfDiscription"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="editTeacherData.Headimgurl"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editTeacherVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editTeacherSubmit">提交</el-button>
			</div>
		</el-dialog>
	
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'teacherList',
	data() {
		return {
			page: 1,
			pageSize: 10,
			pageSizes: [10],
			filters: {
				cid: 0,
				key : '',
				p : 0,
				setm : '',
			},
			editTeacherVisible: false,
			editTeacherData: {
				Meid: '',
				TrueName: '',
				Sex: '',
				SelfDiscription: '',
				Headimgurl: '',
			},
			selected :0,
			searchInput:'',
			teacherList:[],
      total :0,
      className:''
		}
	},
	computed: {
  	classList() {
      if (!this.$store.getters.classList.length) {
        this.$store.dispatch('getClassList')
      } else{
        return this.$store.getters.classListPlus
      }
    },
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		getData() {
      this.className=this.$route.query.name;
			this.filters.setm = this.$route.query.setm || 0,
			this.getNowData();
		},
		getNowData(){
			let start = (this.filters.p - 1) * this.pageSize;
			let end =this.filters.p * this.pageSize;
			this.$teacherAPI.getTeacherList(this.filters).then(
				res=>{
					this.total = res.Total;
					this.teacherList = res.ModelList
				}
			)
		},
		handleSizeChange(val) {
			this.filters.p = val;
			this.pageSize = val;
			this.getNowData();
		},
		handleCurrentChange(val) {
			this.filters.p = val;
			this.page = val;
			this.getNowData();
		},
		handleEditTeacher: function (row) {
			this.editTeacherVisible = true
			this.editTeacherData = Object.assign({}, row)
		},
		handleDeleteTeacher: function (Meid) {
			this.$confirm('确认删除该老师账号吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					Meid: Meid
				}
				this.$teacherAPI.deleteTeacher(para).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success',
					}).catch((err) => {
						console.error('fff>>>>', err);
						this.$message({
							message: err.msg,
							type: 'error',
						})
					})
					this.getData()
				})
			})
		},
		editTeacherSubmit: function () {
			this.$refs.editTeacherDom.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						//NProgress.start();
						this.$teacherAPI.editTeacher(this.editTeacherData).then(() => {
							//NProgress.done();
							this.$refs['editTeacherDom'].resetFields();
							this.editTeacherVisible = false;
							this.getData()
						}).catch((err) => {
						console.error('fff>>>>', err);
						this.$message({
							message: err.msg,
							type: 'error',
						})
					});
					});
				}
			});
		},
		setClassAdminTeacher(meid){
				if(meid===''){
					this.$message.warning('数据不完整！')
				}else{
					let p={ClassID:this.filters.setm,Meid:meid}
					this.$classAPI.setClassAdminTeacher(p).then(res=>{
						this.$message.success('指定班主任成功！')
						this.$router.go(-1);
					})
				}
			}
	},
	mounted() {
		this.getData();
	},
	watch: {
		"$route": "getData"
	},
};

</script>

<style scoped lang='less'>
  .className{
    color: #F56C6C;
  }
</style>
