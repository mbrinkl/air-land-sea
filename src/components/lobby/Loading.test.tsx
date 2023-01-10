import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Loading from './Loading';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...mod,
    useNavigate: vi.fn().mockImplementation(() => mockNavigate),
  };
});

beforeEach(() => {
  render(<Loading />, { wrapper: MemoryRouter });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllMocks();
  // vi.useRealTimers();
});

it('should render without match not found button', () => {
  const button = screen.queryByText('Home');
  expect(button).not.toBeInTheDocument();
});

it('should render match not found button after 5 seconds', () => {
  act(() => {
    vi.advanceTimersByTime(5000);
  });

  const button = screen.queryByText('Home');
  expect(button).toBeInTheDocument();
});

it('should navigate to home on home button clicked', async () => {
  act(() => {
    vi.advanceTimersByTime(5000);
  });

  const button = await screen.findByText('Home');
  const user = userEvent.setup({ delay: null });
  await user.click(button);
  expect(mockNavigate).toHaveBeenCalledWith('/');
});
