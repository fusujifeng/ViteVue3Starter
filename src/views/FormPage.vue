<template>
  <div>
    <a-card title="用户信息表单">
      <a-form
        :model="formData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formData.username" placeholder="请输入用户名" />
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="电话" name="phone">
          <a-input v-model:value="formData.phone" placeholder="请输入电话号码" />
        </a-form-item>

        <a-form-item label="性别" name="gender">
          <a-radio-group v-model:value="formData.gender">
            <a-radio value="male">男</a-radio>
            <a-radio value="female">女</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="兴趣爱好" name="hobbies">
          <a-checkbox-group v-model:value="formData.hobbies">
            <a-checkbox value="reading">阅读</a-checkbox>
            <a-checkbox value="music">音乐</a-checkbox>
            <a-checkbox value="sports">运动</a-checkbox>
            <a-checkbox value="travel">旅行</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item label="城市" name="city">
          <a-select v-model:value="formData.city" placeholder="请选择城市">
            <a-select-option value="beijing">北京</a-select-option>
            <a-select-option value="shanghai">上海</a-select-option>
            <a-select-option value="guangzhou">广州</a-select-option>
            <a-select-option value="shenzhen">深圳</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="生日" name="birthday">
          <a-date-picker v-model:value="formData.birthday" style="width: 100%" />
        </a-form-item>

        <a-form-item label="个人简介" name="description">
          <a-textarea v-model:value="formData.description" placeholder="请输入个人简介" :rows="4" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 14 }">
          <a-space>
            <a-button type="primary" html-type="submit" :loading="submitting"> 提交 </a-button>
            <a-button @click="resetForm">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const submitting = ref(false)

const formData = reactive({
  username: '',
  email: '',
  phone: '',
  gender: 'male',
  hobbies: [],
  city: undefined,
  birthday: undefined,
  description: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
}

interface FormData {
  name: string
  email: string
  phone: string
  gender: string
  age: number
  city: string
  interests: string[]
  description: string
}

interface ValidationError {
  values: FormData
  errorFields: Array<{
    name: string[]
    errors: string[]
  }>
}

const onFinish = (values: FormData) => {
  submitting.value = true
  console.log('表单数据:', values)

  // 模拟提交
  setTimeout(() => {
    submitting.value = false
    message.success('提交成功！')
  }, 1000)
}

const onFinishFailed = (errorInfo: ValidationError) => {
  console.log('表单验证失败:', errorInfo)
  message.error('请检查表单信息')
}

const resetForm = () => {
  Object.assign(formData, {
    username: '',
    email: '',
    phone: '',
    gender: 'male',
    hobbies: [],
    city: undefined,
    birthday: undefined,
    description: '',
  })
}
</script>
