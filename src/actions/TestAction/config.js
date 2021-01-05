/**
 * Created By Vision CLI
 *
 * API 参考：
 * http://vision.oa.com/docs/dev-action/#
 */

// 基本信息，将在编辑器中显示
const info = {
  name: 'TestAction', // 展示名
  desc: '', // 描述
  author: '', // 作者
  type: '*', // 类型
};

/**
 * 表单配置
 * 表单将展示在编辑器的 [数据] Tab
 * 表单数据将作为参数 “data” 传入 action 函数
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

export default { info, dataForm };
