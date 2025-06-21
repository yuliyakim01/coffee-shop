import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
fetchMock.enableMocks();

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'test-anon-id'),
  },
});
