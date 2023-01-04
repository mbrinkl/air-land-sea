import { Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createMatch } from '../../api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userSlice } from '../../store/user';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const nickname = useAppSelector((state) => state.user.nickname);
  const dispatch = useAppDispatch();

  const onSetNicknameInputChanged = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nickname = e.target.value;
    dispatch(userSlice.actions.setNickname(nickname));
  };

  const onOnlineClicked = async () => {
    const matchID = await createMatch(2);
    navigate(`/${matchID}`);
  };

  const onLocalClicked = () => {
    navigate('/local');
  };

  return (
    <div>
      <Input
        value={nickname || ''}
        placeholder="nickname"
        onChange={onSetNicknameInputChanged}
      />
      <Button onClick={onOnlineClicked}>Online</Button>
      <Button onClick={onLocalClicked}>Local</Button>
    </div>
  );
};

export default Home;
