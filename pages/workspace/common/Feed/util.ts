import { URL_WWW } from 'common/constants';

export const filteredDomainName = (domain: string) => domain?.startsWith(URL_WWW) ? domain.slice(URL_WWW.length) : domain;
