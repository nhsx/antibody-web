import React from 'react';
import TestResult from '.';
import { render, act } from '@testing-library/react';

describe("TestResult", () => {
  const nextResultToReviewSpy = jest.fn(() => {
    return new Promise<{ url: string }>(
      (resolve) => resolve({ url: "https://meow.cat" })
    );
  });

  it("Gets the next result from the testApi", async () => {
    await act(async () => {
      await render(<TestResult container={{ testApi: { nextResultToReview: nextResultToReviewSpy } }} />);
    });

    expect(nextResultToReviewSpy).toHaveBeenCalled();
  });

  it("Displays an image with the returned url", async () => {
    let testResult;

    await act(async () => {
      testResult = await render(<TestResult container={{ testApi: { nextResultToReview: nextResultToReviewSpy } }} />);
    });

    const testImage = await testResult.findByTestId('test-result-image');
    expect(testImage).toHaveAttribute("src", "https://meow.cat");
  });
});