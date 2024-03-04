import CancelIcon from 'components/Icons/CrossIcon';
import { useState } from 'react';
import { Body, Container, Header } from './style';
type FormToastProps = {
  header: string;
  body: string;
};
const FormToast = ({ header, body }: FormToastProps) => {
  const [open, setOpen] = useState<boolean>(true);
  return open ? (
    <Container>
      <CancelIcon size={10} onClick={() => setOpen(false)} data-cy={`cancel-${header}`} />
      <Header>
        {header}
      </Header>
      <Body>{body}</Body>
    </Container>
  ) : null;
};

export default FormToast;
