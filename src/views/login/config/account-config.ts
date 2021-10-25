//编写规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur' //失去焦点时触发
    },
    {
      pattern: /^[a-z0-9]{5,10}$/, //表示5~10位的字母和数字
      message: '用户名必须是5~10个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur' //失去焦点时触发
    },
    {
      pattern: /^[a-z0-9]{3,}$/, //表示5~10位的字母和数字
      message: '用户名必须是3位以上字母或数字~',
      trigger: 'blur'
    }
  ]
}
