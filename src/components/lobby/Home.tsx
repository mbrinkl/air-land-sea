import { Input, Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const [joinMatchID, setJoinMatchID] = useState('');
  const navigate = useNavigate();

  const onHostClicked = () => {
    const matchID = (Math.random() + 1).toString(36).substring(7);
    navigate(`/${matchID}?host`);
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="15px"
      px="10px"
    >
      <Input
        maxW="400px"
        size="lg"
        value={joinMatchID}
        placeholder="Match ID to Join"
        onChange={(e) => setJoinMatchID(e.target.value)}
      />
      <Flex gap="15px">
        <Button onClick={onHostClicked} size="lg" colorScheme="green">
          Host
        </Button>
        <Button
          onClick={() => navigate(joinMatchID)}
          disabled={joinMatchID.length === 0}
          size="lg"
          colorScheme="blue"
        >
          Join
        </Button>
        <Button onClick={() => navigate('bot')} size="lg" colorScheme="purple">
          vs Bot
        </Button>
        {import.meta.env.DEV && (
          <Button onClick={() => navigate('local')} size="lg">
            Local
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
