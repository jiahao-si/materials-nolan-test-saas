/**
 * Created By Vision CLI
 *
 * API 参考：
 * http://vision.oa.com/docs/dev-container/#
 */

import React from 'react';
import ReactDOM from 'react-dom';
// ⚠️ 请勿修改，引入自动生成的 App
import App from './src/app';
import './assets/style/reset.css';
import './assets/style/vision.mp.css';

export default function createApp() {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);

  ReactDOM.render(<App />, container);
}

// 你也可以在此文件中进行一些初始化操作：
// 如引入公共样式、初始化上报等。
