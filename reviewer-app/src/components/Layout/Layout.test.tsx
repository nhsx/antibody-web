import React from 'react';
import Layout from '.';
import { render } from '@testing-library/react';


describe("<Layout>", () => {
  it("renders the child content", async () => {
    const result = await render(<Layout><span data-testid="to-find">To find</span></Layout>);
    const spanToFind = await result.findByTestId('to-find');
    expect(spanToFind).toBeTruthy();
  });
});