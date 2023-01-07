import { Button, Tooltip, useClipboard } from '@chakra-ui/react';
import { useState } from 'react';

const InvitePlayerButton = (): JSX.Element => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { onCopy } = useClipboard(window.location.href.split('?')[0]);

  const onInvitePlayerClicked = () => {
    setIsTooltipOpen(true);
    onCopy();
    setTimeout(() => {
      setIsTooltipOpen(false);
    }, 3000);
  };

  return (
    <Tooltip
      label="Invite URL copied to Clipboard"
      isOpen={isTooltipOpen}
      placement="right"
    >
      <Button colorScheme="green" onClick={onInvitePlayerClicked}>
        + Invite a Player
      </Button>
    </Tooltip>
  );
};

export default InvitePlayerButton;
