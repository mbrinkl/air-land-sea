import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const WithdrawTable = (): JSX.Element => {
  return (
    <TableContainer>
      <Table size="sm">
        <TableCaption>Withdraw Table</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>Cards Remaining In Hand</Th>
            <Th isNumeric>Points Your Opponent Will Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td isNumeric>4 - 6</Td>
            <Td isNumeric>2</Td>
          </Tr>
          <Tr>
            <Td isNumeric>2 - 3</Td>
            <Td isNumeric>4</Td>
          </Tr>
          <Tr>
            <Td isNumeric>1</Td>
            <Td isNumeric>5</Td>
          </Tr>
          <Tr>
            <Td isNumeric>11</Td>
            <Td isNumeric>6</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WithdrawTable;
