import React from 'react';
import PageContent from 'components/ui/PageContent';
import { Container } from 'nhsuk-react-components';
import MainContent from 'components/ui/MainContent';
import AppError from 'errors/AppError';
import Error from 'components/ui/Error';


interface LayoutProps {
  children: React.ReactNode;
  error?: AppError;
}

export default (props: LayoutProps) => {
  const { error, children } = props;
  return (
    <PageContent>
      <Container>
        <MainContent>
          {error && <Error error={error} />}
          {children}
        </MainContent>
      </Container>
    </PageContent>
  );
};