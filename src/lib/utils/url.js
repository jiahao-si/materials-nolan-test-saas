import * as qs from './query-string';

const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

export function isUrl(string) {
  if (typeof string !== 'string') {
    return false;
  }

  const match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  return (
    localhostDomainRE.test(everythingAfterProtocol)
    || nonLocalhostDomainRE.test(everythingAfterProtocol)
  );
}

export function deliverUrlParams(url) {
  const { url: link, query: originalQuery } = qs.parseUrl(url);
  const query = {
    ...originalQuery,
    ...qs.parseUrl(window.location.href).query,
  };

  if (window.VISION && window.VISION.meta) {
    const { isTest, actKey, isEditor } = window.VISION.meta;
    query.vision_fr = `${actKey}${isTest ? '_test' : ''}${isEditor ? '_editor' : ''}`;
  }

  return `${link.endsWith('/') ? link.slice(0, link.length - 1) : link}?${qs.stringify(query)}`;
}

export function open(url, newTab = false) {
  if (!isUrl(url)) {
    return;
  }

  if (newTab) {
    window.open(url);
  } else {
    window.open(url, '_self');
  }
}

export function openWithUrlParams(url, newTab = false) {
  if (!isUrl(url)) {
    return;
  }

  const link = deliverUrlParams(url);
  if (newTab) {
    window.open(link);
  } else {
    window.open(link, '_self');
  }
}
