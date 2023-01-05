import {
  Table,
  TableContainer,
  TabList,
  Tabs,
  Tab,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useBoardContext } from '../../hooks/useBoardContext';

interface ScoringChart {
  cardsRemaining: string;
  opponentPoints: number;
}

const scoringChartP1: ScoringChart[] = [
  { cardsRemaining: '4 - 6', opponentPoints: 2 },
  { cardsRemaining: '2 - 3', opponentPoints: 3 },
  { cardsRemaining: '1', opponentPoints: 4 },
  { cardsRemaining: '0', opponentPoints: 6 },
];

const scoringChartP2: ScoringChart[] = [
  { cardsRemaining: '5 - 6', opponentPoints: 2 },
  { cardsRemaining: '3 - 4', opponentPoints: 3 },
  { cardsRemaining: '2', opponentPoints: 4 },
  { cardsRemaining: '0 - 1', opponentPoints: 6 },
];

const WithdrawTable = ({
  scoringChart,
}: {
  scoringChart: ScoringChart[];
}): JSX.Element => {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th isNumeric>Cards Remaining In Hand</Th>
            <Th isNumeric>Points Opponent Will Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {scoringChart.map((data) => (
            <Tr key={data.opponentPoints}>
              <Td isNumeric>{data.cardsRemaining}</Td>
              <Td isNumeric>{data.opponentPoints}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TabbedWithdrawTables = () => {
  const { G, playerID } = useBoardContext();

  const firstPlayer = G.players[playerID!].firstPlayer;

  return (
    <Tabs>
      <TabList>
        <Tab>1st Player {firstPlayer && '(You)'}</Tab>
        <Tab>2nd Player {!firstPlayer && '(You)'}</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <WithdrawTable scoringChart={scoringChartP1} />
        </TabPanel>
        <TabPanel>
          <WithdrawTable scoringChart={scoringChartP2} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabbedWithdrawTables;
