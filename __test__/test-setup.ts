// test-setup.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
});

// Add any global test configuration here
beforeAll(() => {
  // Setup code that runs before all tests
});

afterAll(() => {
  // Cleanup code that runs after all tests
});

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
});