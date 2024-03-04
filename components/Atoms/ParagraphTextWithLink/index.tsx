import Link from 'next/link';
import ButtonComp from 'components/buttonComp';
import { Paragraph } from './style';
import { ParagraphTextProps } from './types';

const ParagraphTextWithLink = ({
  value, href, value2 = '', button,
}: ParagraphTextProps) => (
  <Paragraph>
    {value}
    {' '}
    {href && <Link target="_blank" href={href?.url}>{href?.label}</Link>}
    {button && <ButtonComp label={button.label} variant="link" onClick={button.onClick} />}
    {value2}
  </Paragraph>
);
export default ParagraphTextWithLink;
