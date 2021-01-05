import './index.scss';
import * as React from 'react';

export function EmptyData({ text }) {
  return <div className="material_empty_data">{text || '无数据'}</div>;
}
