<template>
  <div class="login-wrap">
    <div class="content">
      <img class="animation" src="@/assets/imgs/login-cover.png" alt="" />
      <div class="form animation">
        <h1>管理系统</h1>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          size="large"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
const { push } = useRouter()
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "admin",
  password: "123456",
});
const rules = reactive<FormRules>({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const {username,password}=ruleForm;
      if(username!=='admin'||password!=='123456'){
        ElMessage.warning('用户名或密码错误');
      }else{
        ElMessage.success('登录成功');
        push({name: 'home'})
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

defineOptions({
  customOptions: {
    out: true,
  }
})
</script>

<style lang="scss" scoped>
.login-wrap,
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/imgs/login-bg.png) no-repeat;
  background-size: cover;
  overflow: hidden;
  .form {
    width: 480px;
    height: 480px;
    background-color: #fff;
    border-radius: 3px;
    padding: 45px 75px 0;
    margin-left: 70px;
    h1 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 35px;
    }
  }
}
:deep(.el-form-item) {
  margin-bottom: 25px;
}
:deep(.el-button) {
  width: 100%;
}
.content img{
  width:736px;
}
.animation{
  transition: all 0.3s;
}
@media screen and (max-width:1450px)  {
  .content img{
    width:600px;
  }
  .login-wrap .form {
    width: 420px;
    height: 420px;
    margin-left:40px;
    padding: 45px 50px 0;
  }
}
</style>
