import * as React from 'react';
import { EmptyData } from '../../lib/components';

function Text({ data, commonStyle }) {
  const { text } = data;

  if (!text || !text.trim()) {
    return <EmptyData />;
  }

  return (
    <p style={commonStyle} dangerouslySetInnerHTML={{ __html: text.replace(/[\n\r]/g, '<br/>') }} />
  );
}

export default Text;
