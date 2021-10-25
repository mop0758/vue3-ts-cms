import { App } from 'vue'
import { ElButton, ElInput } from 'element-plus'
const components = [ElButton, ElInput]

/**
 * 循环注册引入的el组件
 * @param app vue创建的app
 */
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
