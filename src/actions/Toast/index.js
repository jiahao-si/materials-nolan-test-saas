import 'antd-mobile/lib/toast/style/css';
import Toast from 'antd-mobile/lib/toast';

function toast({ data: { text, duration } }) {
  return new Promise(resolve => {
    Toast.hide();
    Toast.show(text, 0);
    setTimeout(() => {
      Toast.hide();
      resolve();
    }, (duration || 2) * 1000);
  });
}

export default toast;
