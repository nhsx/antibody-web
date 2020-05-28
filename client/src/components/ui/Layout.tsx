import React from 'react';
import PageContent from 'components/ui/PageContent';
import { Header, Container } from 'nhsuk-react-components';
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
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">
            <span data-testid="service-name">
  
            </span>
          </Header.ServiceName>
        </Header.Container>
      </Header>
      <Container>
        <MainContent>
          {error && <Error error={error} />}
          {children}
        </MainContent>
      </Container>
    </PageContent>
  );
};