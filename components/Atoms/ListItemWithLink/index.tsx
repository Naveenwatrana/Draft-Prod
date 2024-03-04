import Link from 'next/link';
import { List } from './style';
import { ListComponentWithLinkProps } from './types';

const ListComponentWithLink = ({ list }: ListComponentWithLinkProps) => (
  <div>
    {list?.map(
      (item) => typeof item === 'string' ? <List key={item}>{item}</List> : (
        <List key={item.href.url}>
          {item.value}
          {' '}
          <Link href={item.href.url}>{item.href.label}</Link>
          {' '}
          {item.value2}
        </List>
      ),
    )}
  </div>
);
export default ListComponentWithLink;
