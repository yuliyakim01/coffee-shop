import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DefaultAddressCheckbox from '@/components/Profile-components/DefaultAddressCheckbox';
import { FormElements } from '@/data/constants';

describe('DefaultAddressCheckbox', () => {
  it('renders checkbox with label', () => {
    render(<DefaultAddressCheckbox checked={false} onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(FormElements.sameAddress.label);

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('reflects checked state properly', () => {
    const { rerender } = render(<DefaultAddressCheckbox checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<DefaultAddressCheckbox checked={true} onChange={() => {}} />);
    expect(checkbox).toBeChecked();
  });

  it('calls onChange with correct value when toggled', () => {
    const onChangeMock = jest.fn();
    render(<DefaultAddressCheckbox checked={false} onChange={onChangeMock} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChangeMock).toHaveBeenCalledWith(true);
  });
});
