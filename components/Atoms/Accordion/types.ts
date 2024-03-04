export type AccordionItem = {
  title: string;
  content: string | JSX.Element | JSX.Element[];
};

export type AccordionProps = {
  items: AccordionItem[];
  defaultActive?: number | null;
};

export type AccordionItemHeaderProps = {
  active?: boolean;
};
