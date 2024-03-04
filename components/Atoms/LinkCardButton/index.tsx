import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { LinkCardButtonProps } from './types';
import { LinkButton, LinkButtonText } from './styles';

const LinkCardButton = ({ url, name, size }: LinkCardButtonProps) => {
  const loggedInUser = useLoggedInUser();
  return loggedInUser ? (
    <LinkButton
      href={url}
      target="_blank"
      size={size}
      onClick={(e) => e.stopPropagation()}
    >
      {name}
    </LinkButton>
  )
    : (
      <LinkButtonText
        size={size}
      >
        {name}
      </LinkButtonText>
    );
};

export default LinkCardButton;
