import { extendTheme } from '@chakra-ui/react';

export const colors: Record<string, string> = {
  air: '#5b574b',
  land: '#5a7237',
  sea: '#356479',
  faceDown: '#34312e',
  first: '#c56569',
  second: '#687daf',
};

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        overflowX: 'hidden',
      },
    },
  },
});
