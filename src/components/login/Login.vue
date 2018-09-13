<template>
    <div class="login fixed" id="particles-js">
        <div class="wrapper animated flipInY">
			<div class="logo"><a href="#"><i class="fa fa-bolt"></i> <span>Maniac</span></a></div>
			<div class="box">
				<div class="header clearfix">
					<div class="pull-left"><i class="fa fa-sign-in"></i> Sign In</div>
					<div class="pull-right"><a href="#"><i class="fa fa-times"></i></a></div>
				</div>
				<form id="loginform" method="post">
					<div class="alert alert-warning no-radius no-margin padding-sm"><i class="fa fa-info-circle"></i> Please sign in to maniac dashboard</div>
					<div class="box-body padding-md">
						<div class="form-group">
							<input type="text" name="username" class="form-control" v-model="username" placeholder="Username"/>
						</div>
						<div class="form-group">
							<input type="password" name="password" class="form-control" v-model="password" placeholder="Password"/>
						</div>          
						<div class="form-group">
							<input type="checkbox" /> <small>Remember me</small>
						</div>  
						<div class="box-footer">                                                               
							<button type="button" class="btn btn-success btn-block"  @click="login()">Sign in</button>  
						</div>
					</div>
				</form>
			</div>
			<div class="box-extra clearfix">
				<a href="#" class="pull-left btn btn-xs">Forgotten Password?</a>
				<a href="register.html" class="pull-right btn  btn-xs">Register an account</a>
			</div>
			
			<footer>
				Copyright &copy; 2014 by YAKUZI.
				
				<ul class="list-unstyled list-inline">
					<li><a href="#">Home</a></li>
					<li><a href="#">About Us</a></li>
					<li><a href="#">UI Elements</a></li>
					<li><a href="#">Charts</a></li>
					<li><a href="#">Mobile Apps</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</footer>
		</div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
        username: "",
        password: ""
        };
    },
    methods: {
        login() {
        // console.log(this.username);
        let userReg = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/);
        let passReg = new RegExp(/^[a-zA-Z]\w{5,17}$/);
        let vm = this;
        if (!userReg.test(vm.username)) {
            alert('用户名以字母开头');
            vm.username='';
            return false;
        }else if(vm.username===''){
            alert('账号名不能为空');
            vm.username='';
            return false;
        }else if (!passReg.test(vm.password)) {
            alert('密码与账号名不符');
            vm.password==='';
            return false;
        }else if(vm.password===''){
            alert('密码不能为空');
            vm.password==='';
            return false;
        }else{
            console.log(vm.username);
			console.log(vm.password);

			this.$axios.post('/login',{
				username:vm.username,
				password:vm.password
			}).then((res)=>{
				if(res.data.code===0){
					window.sessionStorage.setItem('token',JSON.stringify(true));
                	this.$router.push('/index');
				}else{
					alert(res.data.mas);
				}
			})
        }
        }
	},
	mounted() {
		particlesJS.load('particles-js', '../../../static/particles.json');
		// console.log(this)
	},
};
</script>

<style scoped>
/* #particles-js{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #b61924;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
} */
</style>
