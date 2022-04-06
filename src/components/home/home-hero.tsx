import type { FC } from 'react';
import NextLink from 'next/link';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const HomeHero: FC = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 6
      }}
      {...props}
    >
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mx: -1,
            mt: 2,
            mb: 6,
            '& > a': {
              m: 1
            }
          }}
        >
          <NextLink
            href="/dashboard"
            passHref
          >
            <Button
              component="a"
              size="large"
              variant="contained"
            >
              無料版はこちら
            </Button>
          </NextLink>
          <NextLink
            href="/dashboard"
            passHref
          >
            <Button
              component="a"
              size="large"
              variant="contained"
            >
              有料版はこちら
            </Button>
          </NextLink>          
        </Box>
      </Container>
    </Box>
  );
};
