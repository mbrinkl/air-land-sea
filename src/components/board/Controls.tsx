import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useBoardContext } from './Board';
import WithdrawTable from './WithdrawTable';

const WithdrawDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  const { moves } = useBoardContext();
  const cancelRef = useRef<any>();
  function onConfirm() {
    moves.withdraw();
    onClose();
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Withdraw?</AlertDialogHeader>
        <AlertDialogBody>
          Opponent will score n points if you withdraw.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ScoreInfoModel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scoring Info</ModalHeader>
          <ModalBody>
            <WithdrawTable />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Controls = (): JSX.Element => {
  const { undo, ctx, isActive } = useBoardContext();
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <Flex gap="5px">
      <Button
        colorScheme="red"
        onClick={undo}
        disabled={!ctx.numMoves || !isActive}
      >
        Undo
      </Button>

      <Button
        colorScheme="red"
        variant="outline"
        onClick={onDialogOpen}
        disabled={!isActive}
      >
        Withdraw
      </Button>

      <Button colorScheme="blue" onClick={onModalOpen} disabled={!isActive}>
        ?
      </Button>

      <WithdrawDialog isOpen={isDialogOpen} onClose={onDialogClose} />
      <ScoreInfoModel isOpen={isModalOpen} onClose={onModalClose} />
    </Flex>
  );
};

export default Controls;
