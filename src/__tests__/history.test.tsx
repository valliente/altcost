import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseHistoryLogView, ExpenseHistoryEntry } from '../components/history/ExpenseHistoryLogView';
import { vi, describe, it, expect } from 'vitest';

const mockLogs: ExpenseHistoryEntry[] = Array.from({ length: 15 }, (_, i) => ({
  id: `log-${i}`,
  title: `Test Habit ${i + 1}`,
  amount: 10 * (i + 1),
  frequency: 'daily',
  startDate: '2024-01-01',
  createdAt: new Date().toISOString(),
}));

describe('ExpenseHistoryLogView', () => {
  it('renders pagination controls and shows exactly 10 items on the first page', () => {
    render(
      <ExpenseHistoryLogView
        historyLogs={mockLogs}
        onDeleteEntry={vi.fn()}
        onBulkDeleteEntries={vi.fn()}
        onTogglePauseEntry={vi.fn()}
        onEditEntry={vi.fn()}
        onAddNewExpense={vi.fn()}
        onExportData={vi.fn()}
        onImportJSON={vi.fn()}
      />
    );
    
    // Total items should be paginated (10 per page)
    expect(screen.getByText('Test Habit 1')).toBeDefined();
    expect(screen.getByText('Test Habit 10')).toBeDefined();
    
    // The 11th item should not be rendered on the first page
    expect(screen.queryByText('Test Habit 11')).toBeNull();
    
    // Pagination info
    expect(screen.getByText(/Showing 1 to 10 of 15 entries/)).toBeDefined();
    expect(screen.getByText(/1 \/ 2/)).toBeDefined();
  });

  it('navigates to the second page when clicking Next', () => {
    render(
      <ExpenseHistoryLogView
        historyLogs={mockLogs}
        onDeleteEntry={vi.fn()}
        onBulkDeleteEntries={vi.fn()}
        onTogglePauseEntry={vi.fn()}
        onEditEntry={vi.fn()}
        onAddNewExpense={vi.fn()}
        onExportData={vi.fn()}
        onImportJSON={vi.fn()}
      />
    );

    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn);

    // After clicking Next, 11-15 should be visible
    expect(screen.queryByText('Test Habit 1')).toBeNull();
    expect(screen.getByText('Test Habit 11')).toBeDefined();
    expect(screen.getByText('Test Habit 15')).toBeDefined();
    
    // Pagination info update
    expect(screen.getByText(/Showing 11 to 15 of 15 entries/)).toBeDefined();
    expect(screen.getByText(/2 \/ 2/)).toBeDefined();
  });
});
