/**
 * @desc component info
 * @type {EditorComponentInfo}
 */
const info = {
  name: '文本',
  desc: '纯文本组件',
  author: '',
  type: 'h5',
};

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties | OverrideFormType}
 */
const dataForm = {
  text: {
    title: '文本内容',
    type: 'textarea',
    default: '输入文本内容...',
  },
};

/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */
const enableStyleGroup = {
  size: true,
  transform: true,
  text: true,
  border: true,
  background: true,
  margin: {
    top: 12,
    bottom: 12,
  },
  padding: {
    left: 8,
    right: 8,
  },
  zIndex: true,
  position: true,
};

/**
 * @desc component styleSchema
 * @type {EditorComponent}
 */
export default {
  info,
  dataForm,
  enableStyleGroup,
};
