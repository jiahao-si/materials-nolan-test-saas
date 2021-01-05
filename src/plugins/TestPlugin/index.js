/**
 * Created By Vision CLI
 *
 * API 参考：
 * http://vision.oa.com/docs/dev-plugin/#
 */

export default function({
  key, // {number} 用于标识每一个 action 实例的全局唯一且持久化的 key
  data, // {object} 数据表单内容
  global, // {object} 页面容器自定义的全局配置项
  meta, // {object} 页面元数据
  componentsMap, // {Map<number, HTMLElement>} 所有组件 DOM 节点的 Map，key 为组件的 key（number）
  getComponentByKey, // {(key: number) => HTMLElement | undefined} 通过组件 key 获取组件 DOM 节点的 API
}) {
  const { content } = data;
  window.addEventListener('click', () => window.alert(content));
}
