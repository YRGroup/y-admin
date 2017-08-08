<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

		<el-form :inline="true" :model="filters">

				<el-form-item label="班级">
					<el-select v-model="selected"  placeholder="全部">
						<el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
						</el-option>
					</el-select>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary"  @click="$router.push('/teacher/list?classId='+selected+'&op='+filters.op +'&p=0&key=')">查询</el-button>
				
				</el-form-item>
aaaa
				<el-form-item label="教师姓名/手机号">
					<el-input v-model="searchInput" placeholder="请输入教师姓名或者手机号"></el-input>
					
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="$router.push('/teacher/list?classId=0&p=0&key='+searchInput+'&setm='+filters.setm)">查询</el-button>
				</el-form-item>
		
				<el-form :inline="true" :model="filters" v-if="filters.setm>0">
					<el-form-item>
						<el-button type="success" @click="$router.push('/teacher/list?classId=0&p=0&key='+searchInput+'&setm='+filters.setm)">添加一个老师并成为当前班级班主任</el-button>
					</el-form-item>
		
				</el-form>
			</el-form>



		</el-col>
	
		<!--列表-->
		<template>
			<el-table :data="teacherList" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column fixed="left" label="序号" type="index" width="65">
				</el-table-column>
				<el-table-column prop="Headimgurl" align="center" label="头像">
					<template scope="scope">				
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
					<template scope="scope">				
						<li style="list-style-type:none;" v-for="(item,index) in scope.row.Classes" :key="index" value='CourseName' >{{item.CourseName + (item.Role==1?'/班主任':'')}}</li>	
				
					</template>
				</el-table-column>
				<el-table-column prop="className" label="班级" >
					<template scope="scope">				
						<li style="list-style-type:none;" v-for="(item,index) in scope.row.Classes" :key="index" value='CourseName' >{{item.ClassName}}</li>	
				
					</template>
				</el-table-column>
				
				<el-table-column fixed="right" label="操作" width="200" align="center">
					<template scope="scope">
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
	
		<el-dialog title="编辑教师信息" v-model="editTeacherVisible" :close-on-click-modal="false">
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
				cid: this.$route.query.classId||'0',
				key : this.$route.query.key||'',
				p : this.$route.query.p || '0',
				setm : this.$route.query.setm || 0,
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
			classList:[{Name:'全部',cid:0}],
			searchInput:'',
			teacherList:[],
			total :0,
		}
	},
	computed: {
	
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		getData() {
			console.log( this.$route.query.i );

			this.filters.cid = this.$route.query.classId||'0';
			this.filters.key = this.$route.query.key||'';
			this.filters.p = this.$route.query.p||'0';
			this.filters.setm = this.$route.query.setm || 0,
			this.getNowData();

		},
		getNowData(){
			let start = (this.filters.p - 1) * this.pageSize;
			let end =this.filters.p * this.pageSize;
			
			console.log(this.filters.cid +'aaa'+this.filters.key);
			this.$teacherAPI.getTeacherList(this.filters).then(
				res=>{
					this.total = res.Total;
					this.teacherList = res.ModelList
				}
			)
		},


		getClassList() {
			  this.$classAPI.getClassList().then(res => {
							  this.classList = res;
							  this.classList.splice(0,0,{Name:'全部',cid:0});				
				});
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
				}).catch((err) => {
					console.error('fff>>>>', err);
					this.$message({
						message: err.msg,
						type: 'error',
					})
				})
			})
		},
		editTeacherSubmit: function () {
			this.$refs.editTeacherDom.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						//NProgress.start();
						this.$teacherAPI.editTeacher(this.addTeacherData).then(() => {
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
	},
	mounted() {
		this.getClassList();
		this.getData();
	},
	watch: {
		"$route": "getData"
	},
};

</script>

<style scoped>

</style>
