/**
 * Created By Vision CLI
 *
 * API 参考：
 * http://vision.oa.com/docs/dev-component/#
 */

import * as React from 'react';
import './index.scss';

export default function({
  componentKey, // {number} 用于标识每一个组件实例的全局唯一且持久化的 key
  data, // {object} “数据”表单内容
  style, // {object} “样式”表单内容
  commonStyle, // {object} “组件自定义样式”表单内容
  global, // {object} 页面容器自定义的全局配置项
  meta, // {object} 页面元数据
  componentsMap, // {Map<number, HTMLElement>} 所有组件 DOM 节点的 Map，key 为组件的 key（number）
  getComponentByKey, // {(key: number) => HTMLElement | undefined} 通过组件 key 获取组件 DOM 节点的 API
}) {
  const { content } = data;
  const { color } = style;

  return (
    <div style={commonStyle}>
      <h1 style={{ color }}>{content}</h1>;
    </div>
  );
}
