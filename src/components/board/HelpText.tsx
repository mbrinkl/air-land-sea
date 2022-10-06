import { useBoardContext } from './Board';

export const HelpText = () => {
  const { isActive } = useBoardContext();

  // todo: make more descriptive
  const text = isActive ? 'Do Something' : 'Waiting for Opponent...';

  return <h1>{text}</h1>;
};
