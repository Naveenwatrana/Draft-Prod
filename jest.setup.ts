import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';
import { setConfig } from 'next/config';
import { server } from 'common/mockServiceWorker/server';
import config from './next.config';

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// Mock matchMedia for Slick Slider Tests
window.matchMedia = window.matchMedia
  || function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
