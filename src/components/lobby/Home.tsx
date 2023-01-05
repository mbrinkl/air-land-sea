import { Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [joinMatchID, setJoinMatchID] = useState('');

  const onHostClicked = () => {
    const matchID = (Math.random() + 1).toString(36).substring(7);
    navigate(`/${matchID}?host`);
  };

  const onJoinClicked = () => {
    navigate(`/${joinMatchID}`);
  };

  const onLocalClicked = () => {
    navigate('/local');
  };

  return (
    <div>
      <Input
        value={joinMatchID}
        placeholder="Match ID to Join"
        onChange={(e) => setJoinMatchID(e.target.value)}
      />
      <Button onClick={onHostClicked}>Host</Button>
      <Button onClick={onJoinClicked} disabled={joinMatchID.length === 0}>
        Join
      </Button>
      <Button onClick={onLocalClicked}>Local</Button>
    </div>
  );
};

export default Home;
