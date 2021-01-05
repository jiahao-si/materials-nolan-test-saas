export function preventSyntheticEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export function px(px) {
  return `${px}px`;
}

export function percent(percent) {
  return `${percent}%`;
}

export function isChildrenEmpty(children) {
  if (!children) {
    return true;
  }
  if (Array.isArray(children)) {
    return children.length <= 0;
  }
  return false;
}

export function getMetaDesc() {
  const metas = document.getElementsByTagName('meta');
  const meta = Array.from(metas).find(i => i.name.toLowerCase() === 'description');
  if (meta) {
    return meta.content;
  }
  return '';
}
