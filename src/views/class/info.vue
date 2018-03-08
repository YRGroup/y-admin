<template>
	<section>
		<!--学生列表-->
    <p>学生</p>
    <el-table :data="studentList" highlight-current-row  style="width: 100%;">
      <el-table-column fixed="left" label="序号" type="index" width="70">
      </el-table-column>
      <el-table-column prop="Headimgurl" align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.Headimgurl" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="TrueName" label="名字" sortable>
      </el-table-column>
      <el-table-column prop="StudentID" label="学号" sortable>
      </el-table-column>
      <el-table-column prop="Sex" label="性别" sortable>
      </el-table-column>
    </el-table>

    <p>教师</p>
    <!-- 老师 -->
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
			</el-table>
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
        
        classId:'',
        studentList:[],
teacherList:[]
			}
		},
		computed: {
			...mapGetters({
				loading: 'listLoading',
			})
    },
    created(){
      console.log(this.$route)
      this.classId=this.$route.query.classId
    },
		methods: {
			getData() {
        // this.$API.getClassInfo(this.classId).then(res=>{
          // console.log(res)
          // this.studentList=res
        // })
        this.$API.getStudentList(this.classId).then(res=>{
          console.log(res)
              this.studentList = res;
        })
        this.$API.getTeacherList(this.classId).then(res=>{
          console.log(res)
          	this.teacherList = res
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

</style>
