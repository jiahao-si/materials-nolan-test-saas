/**
 * @desc component info
 * @type {EditorActionInfo}
 */
const info = {
  name: '消息提醒（Toast）',
  author: '',
};

/**
 * @desc action dataForm
 * @type {JsonSchemaProperties | OverrideFormType}
 */
const dataForm = {
  text: {
    title: '内容',
    default: '提示消息',
    type: 'string',
    required: true,
  },
  duration: {
    title: '时长',
    type: 'number',
    default: 2,
    required: true,
  },
};

/**
 * @desc component styleSchema
 * @type {EditorAction}
 */
export default {
  info,
  dataForm,
  maxTimeout: Infinity,
};
