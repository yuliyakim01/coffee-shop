import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from '@/components/Header-components/Nav';
import { MemoryRouter } from 'react-router-dom';
import { LABELS } from '@/data/routes';

describe('Nav component', () => {
  it('renders all navigation links with correct labels', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByText(LABELS.home)).toBeInTheDocument();
    expect(screen.getByText(LABELS.about)).toBeInTheDocument();
    expect(screen.getByText(LABELS.products)).toBeInTheDocument();
  });

  it('calls onItemClick when a link is clicked', () => {
    const onItemClickMock = jest.fn();

    render(
      <MemoryRouter>
        <Nav onItemClick={onItemClickMock} />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(LABELS.home);
    fireEvent.click(homeLink);

    expect(onItemClickMock).toHaveBeenCalledTimes(1);
  });
});
