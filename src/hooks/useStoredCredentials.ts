import { generateCredentials } from '@boardgame.io/p2p';

interface IStoredCredentials {
  matchID: string;
  credentials: string;
}

export const useStoredCredentials = (matchID: string) => {
  let credentials: string | null = null;

  const localCredentials = localStorage.getItem('credentials');

  if (localCredentials !== null) {
    const storeCredentials: IStoredCredentials = JSON.parse(localCredentials);
    if (storeCredentials.matchID === matchID) {
      credentials = storeCredentials.credentials;
    }
  }

  if (!credentials) {
    credentials = generateCredentials();
    const storeCredentials: IStoredCredentials = {
      matchID,
      credentials,
    };
    localStorage.setItem('credentials', JSON.stringify(storeCredentials));
  }

  return credentials;
};
