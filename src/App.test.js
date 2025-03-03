import { render, screen } from '@testing-library/react';
import App from './App';
import TestWrapper from './utils/TestWrapper';

test('renders main content', async () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );

  // البحث عن العنصر الفعلي في تطبيقك
  const headerElement = await screen.findByText(/E-COMMERCE STORE/i);
  expect(headerElement).toBeInTheDocument();
});