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
              普通のダッシュボード
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
              VC向けダッシュボード
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
              大学発ベンチャー向けダッシュボード
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
              M&A先の探索
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
              相手を知財から調べたい
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
              技術シーズからの探索
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
              攻めと守りの観点
            </Button>
          </NextLink>                                    
        </Box>
      </Container>
    </Box>
  );
};
