import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

jest.mock('@/pages/Home', () => () => <div>Home Page</div>);
jest.mock('@/pages/About', () => () => <div>About Page</div>);
jest.mock('@/pages/ProductPage', () => () => <div>Product Page</div>);
jest.mock('@/pages/Cart', () => () => <div>Cart Page</div>);
jest.mock('@/pages/NotFoundPage', () => () => <div>404 Not Found</div>);
jest.mock('@/assets/logo.svg', () => 'mocked-logo.svg');
jest.mock('@/assets/cart.png', () => 'mocked-cart.png');
jest.mock('@/assets/burger.png', () => 'mocked-burger.png');
jest.mock('@/assets/close.png', () => 'mocked-close.png');
jest.mock('@/assets/user-Prifile-icon.png', () => 'mocked-user-Prifile-icon.png');
jest.mock('@/assets/login.png', () => 'mocked-login.png');
fetchMock.enableMocks();

describe('App routing', () => {
  it('renders HomePage on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  it('renders About page on "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/about page/i)).toBeInTheDocument();
  });

  it('renders Product page on "/products"', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/product page/i)).toBeInTheDocument();
  });

  it('renders Cart page on "/cart"', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/cart page/i)).toBeInTheDocument();
  });

  it('renders NotFound page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/this-page-does-not-exist']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
  });
});
