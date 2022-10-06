import { useBoardContext } from './Board';

export const HelpText = () => {
  const { isActive, ctx } = useBoardContext();

  const stage: string | null =
    (ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer]) || null;

  // todo: make more descriptive
  const text = isActive ? `${ctx.phase} : ${stage}` : 'Waiting for Opponent...';

  return <h1>{text}</h1>;
};
