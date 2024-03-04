import React, { useEffect, useState } from 'react';
import DropdownIcon from 'components/Icons/DropdownIcon';
import { AccordionProps } from './types';
import {
  AccordionItemContent,
  AccordionItemHeader,
  StyledAccordionItem,
} from './styles';

const Accordion = ({ items, defaultActive }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultActive ?? null,
  );

  useEffect(() => {
    if (typeof defaultActive === 'number') {
      setActiveIndex(defaultActive);
    }
  }, [defaultActive]);

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <StyledAccordionItem key={item.title}>
          <AccordionItemHeader
            active={activeIndex === index}
            onClick={() => handleToggle(index)}
            data-testid={`accordion-header-${index}`}
          >
            <DropdownIcon />
            {item.title}
          </AccordionItemHeader>
          {activeIndex === index && (
            <AccordionItemContent>{item.content}</AccordionItemContent>
          )}
        </StyledAccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
