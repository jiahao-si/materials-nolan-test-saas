/**
 * Created By Vision CLI
 *
 * API 参考：
 * http://vision.oa.com/docs/dev-component/#
 */

// 基本信息，将在编辑器中显示
const info = {
  name: 'Input', // 展示名
  desc: '', // 描述
  author: '', // 作者
  type: '*', // 组件类型，编辑器将会根据页面类型选择性加载组件
};

/**
 * 表单配置
 * 表单将展示在编辑器的 [数据] Tab
 * 表单数据将作为 “data” 以 Props 传入组件
 * JSON Schema 表单 API 参考：http://vision.oa.com/docs/dev-json-schema-form/#
 * 自定义表单 API 参考：http://vision.oa.com/docs/dev-override-form/#
 */
const dataForm = {
  content: {
    title: '内容', // 表单标签
    type: 'string', // 表单类型，支持的字段参考：http://vision.oa.com/docs/dev-json-schema-form/#字段类型（type）
    default: 'Hello Vision！', // 默认值，可选参数
    description: '请输入内容', // 字段描述，可选参数
    required: true, // 是否必填，可选参数
  },
};

/**
 * 样式配置
 * 表单将展示在编辑器的 [样式] Tab
 * 表单数据将作为 “style” 以 Props 传入组件
 * 表单 API 与 “dataForm” 相同
 *
 * 另外，常用的 CSS 样式有更加便捷的表单实现
 * 参考 StyleGroup API：http://test.vision.oa.com/docs/dev-style-group/#%E6%A6%82%E5%BF%B5
 */
const styleForm = {
  color: {
    title: '文字颜色',
    type: 'color',
    default: '#000000',
  },
};

export default { info, dataForm, styleForm };
