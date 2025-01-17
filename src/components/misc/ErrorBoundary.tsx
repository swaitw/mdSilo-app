import { Component, ReactNode } from 'react';
import { Log } from 'file/log';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // sentry? TODO
    Log('Error', `${error.name}: ${error.message}, ${error.cause}, ${error.stack}`);
  }

  render() {
    const { children, fallback } = this.props;

    if (this.state.hasError) {
      return (
        fallback ?? (
          <div className="flex items-center justify-center flex-1 flex-shrink-0 w-full h-full">
            <p>An unexpected error occurred.</p>
          </div>
        )
      );
    }

    return children;
  }
}
