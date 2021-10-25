import { App } from 'vue'
// import registerElement from './register-element'

export function globalRegister(app: App): void {
  // app.use(registerElement) //这里先屏蔽掉，因为element提供的按需引入已经自动添加组件了
}
