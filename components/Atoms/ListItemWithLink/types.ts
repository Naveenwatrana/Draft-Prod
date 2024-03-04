export type IList = (string | { value: string, href: { url: string, label: string }, value2: string })[];
export type ListComponentWithLinkProps = { list?: IList };
