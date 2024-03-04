import TextComp from 'components/textComp';

type WordCounterProps = {
  total: number;
  count: number;
  className?: string;
  error?: boolean;
};
export const WordCounter = ({
  total,
  count,
  className,
  error,
}: WordCounterProps) => {
  const content = `${count}/${total}`;
  return (
    <TextComp className={className} error={error}>
      {content}
    </TextComp>
  );
};

export default WordCounter;
