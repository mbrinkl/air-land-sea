import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = (): JSX.Element => {
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotFound(true);
    }, 5000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap="10px"
    >
      <Text fontSize="2xl">Attempting to Connect to Match...</Text>
      <Spinner />
      {notFound && (
        <>
          <Text color="red" fontSize="xl">
            Connection is taking too long - Match is proabably unavailable
          </Text>
          <Button
            size="lg"
            colorScheme="red"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Loading;
