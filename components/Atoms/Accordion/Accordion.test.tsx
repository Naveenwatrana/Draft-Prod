import { fireEvent, screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import Accordion from '.';
import { AccordionItem } from './types';
const items: AccordionItem[] = [
  { title: 'Item 1', content: 'Content for Item 1' },
  { title: 'Item 2', content: 'Content for Item 2' },
  { title: 'Item 3', content: 'Content for Item 3' },
];

describe('Accordion Component', () => {
  it('should render the component', () => {
    renderWithThemeStoreEvents(<Accordion items={items} />);
    items.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });
  it('should render the component with default content', () => {
    renderWithThemeStoreEvents(<Accordion items={items} defaultActive={0} />);
    expect(screen.getByText(items[0].content as string)).toBeInTheDocument();
  });
  it('should render the content of active accordion item', () => {
    renderWithThemeStoreEvents(<Accordion items={items} />);
    const accordionHeader = screen.getByTestId('accordion-header-1');
    fireEvent.click(accordionHeader);
    expect(screen.getByText(items[1].content as string)).toBeInTheDocument();
  });
});
