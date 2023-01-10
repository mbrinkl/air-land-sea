import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...mod,
    useNavigate: vi.fn().mockImplementation(() => mockNavigate),
  };
});

beforeEach(() => {
  render(<Home />, { wrapper: MemoryRouter });
});

afterEach(() => {
  vi.clearAllMocks();
});

it('should navigate to host url on host button clicked', async () => {
  const hostButton = screen.getByText('Host');
  await userEvent.click(hostButton);

  expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('?host'));
});

it('should navigate to vs bot url on vs bot button clicked', async () => {
  const botButton = screen.getByText('vs Bot');
  await userEvent.click(botButton);

  expect(mockNavigate).toHaveBeenCalledWith('bot');
});

it('should navigate to local url on local button clicked', async () => {
  const localButton = screen.getByText('Local');
  await userEvent.click(localButton);

  expect(mockNavigate).toHaveBeenCalledWith('local');
});

it('should render with join button disbled', () => {
  const joinButton = screen.getByText('Join');
  expect(joinButton).toBeDisabled();
});

it('should navigate to join url with input value on join button click', async () => {
  const input = screen.getByPlaceholderText('Match ID to Join');
  const joinButton = screen.getByText('Join');

  fireEvent.change(input, { target: { value: 'test' } });
  await userEvent.click(joinButton);

  expect(joinButton).not.toBeDisabled();
  expect(mockNavigate).toHaveBeenCalledWith('test');
});
