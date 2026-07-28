import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OnboardingWizard } from '../components/onboarding/OnboardingWizard';

describe('OnboardingWizard', () => {
  it('renders step 1 by default', () => {
    const handleComplete = vi.fn();
    render(<OnboardingWizard onCompleteOnboarding={handleComplete} />);
    
    expect(screen.getByText(/Welcome to AltCost/i)).toBeDefined();
    expect(screen.getByText(/What should we call you?/i)).toBeDefined();
  });

  it('can progress through the state machine to completion', async () => {
    const handleComplete = vi.fn();
    render(<OnboardingWizard onCompleteOnboarding={handleComplete} />);
    
    // Step 1
    const nameInput = screen.getByPlaceholderText('e.g. Alex, Valliente Jefa, Sam');
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    
    const continueBtn = screen.getByText('Continue');
    fireEvent.click(continueBtn);

    // Step 2
    expect(await screen.findByText(/Select Your Currency/i)).toBeDefined();
    const usdButton = screen.getByText('USD ($)');
    fireEvent.click(usdButton);

    const continueBtn2 = screen.getByText('Next: Expense Setup');
    fireEvent.click(continueBtn2);

    // Step 3
    expect(await screen.findByText(/Add Your First Recurring Expense/i)).toBeDefined();
    const habitInput = screen.getByPlaceholderText('e.g. Daily Coffee, DoorDash');
    fireEvent.change(habitInput, { target: { value: 'Energy Drink' } });
    
    // Amount input doesn't have a placeholder "0.00", it just has a default value of "7". Let's get it by label or just get the number input
    const amountInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: '3' } });
    
    const finishBtn = screen.getByText('Save & Open Dashboard');
    fireEvent.click(finishBtn);

    // Assert completion
    await waitFor(() => expect(handleComplete).toHaveBeenCalledTimes(1));
    const args = handleComplete.mock.calls[0];
    expect(args[0]).toEqual({ name: 'Alice', currency: '$', onboarded: true });
    expect(args[1]).toMatchObject({ title: 'Energy Drink', amount: 3, frequency: 'daily' });
  });

  it('can skip the initial habit setup', async () => {
    const handleComplete = vi.fn();
    render(<OnboardingWizard onCompleteOnboarding={handleComplete} />);
    
    // Step 1
    fireEvent.change(screen.getByPlaceholderText('e.g. Alex, Valliente Jefa, Sam'), { target: { value: 'Bob' } });
    fireEvent.click(screen.getByText('Continue'));

    // Step 2
    expect(await screen.findByText(/Select Your Currency/i)).toBeDefined();
    fireEvent.click(screen.getByText('EUR (€)'));
    fireEvent.click(screen.getByText('Next: Expense Setup'));

    // Step 3
    expect(await screen.findByText(/Add Your First Recurring Expense/i)).toBeDefined();
    const skipBtn = screen.getByText(/Skip & Clean Launch/i);
    fireEvent.click(skipBtn);

    await waitFor(() => expect(handleComplete).toHaveBeenCalledTimes(1));
    const args = handleComplete.mock.calls[0];
    expect(args[0]).toEqual({ name: 'Bob', currency: '€', onboarded: true });
    expect(args[1]).toBeNull();
  });
});
