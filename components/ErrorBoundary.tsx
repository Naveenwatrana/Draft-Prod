import {
  NotFoundContainer, NotFoundDescription, NotFoundHeader, NotFoundSection, NotFoundTitle,
} from 'pages/404/styles';
import React, { ErrorInfo, ReactNode } from 'react';
import NotFoundIcon from 'components/Icons/404-icon.svg';
import lang from 'common/lang';
import LogoIcon from './Icons/icon';

type Props = {
  children?: ReactNode;
}

type State = {
  hasError: boolean;
}

const { errorMessages } = lang;

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    // Check if the error is thrown
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <NotFoundContainer>
          <NotFoundHeader>
            <LogoIcon theme="light" />
          </NotFoundHeader>
          <NotFoundSection>
            <NotFoundIcon />
            <NotFoundTitle component="h2">Something is wrong</NotFoundTitle>
            <NotFoundDescription component="p">
              {errorMessages.notFound}
            </NotFoundDescription>
          </NotFoundSection>
        </NotFoundContainer>
      );
    }

    // Return children components in case of no error

    return children;
  }
}

export default ErrorBoundary;
