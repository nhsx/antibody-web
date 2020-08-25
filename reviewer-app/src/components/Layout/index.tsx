import React from 'react';
import { Header, Container } from 'nhsuk-react-components';

export default ({ children }) => {
  return (
    <>
      <Header transactional>
        <Header.Container>
          <Header.Logo href="/" />
          <Header.ServiceName href="/">
            Coronavirus home testing
          </Header.ServiceName>
        </Header.Container>
      </Header>
      <Container>
        <main className="nhsuk-main-wrapper nhsuk-main-wrapper--s">
          {children}
        </main>
      </Container>
    </>
  );
};

