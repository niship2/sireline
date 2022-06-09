import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Avatar, Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
//import { ChatComposer } from '../../components/dashboard/chat/chat-composer';
//import { ChatSidebar } from '../../components/dashboard/chat/chat-sidebar';
//import { ChatThread } from '../../components/dashboard/chat/chat-thread';
import { ChatAlt2 as ChatAlt2Icon } from '../../icons/chat-alt2';
import { MenuAlt4 as MenuAlt4Icon } from '../../icons/menu-alt-4';
import { gtm } from '../../lib/gtm';
import { getThreads } from '../../slices/chat';
import { useDispatch } from '../../store';

const ChatInner = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'open' }
)<{ open?: boolean; }>(
  ({ theme, open }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      marginLeft: -380
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      [theme.breakpoints.up('md')]: {
        marginLeft: 0
      },
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  })
);

// In our case there two possible routes
// one that contains /chat and one with a chat?threadKey={{threadKey}}
// if threadKey does not exist, it means that the chat is in compose mode

const Chat: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const compose = router.query.compose as string | undefined === 'true';
  const threadKey = router.query.threadKey as string | undefined;
  const mdUp = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('md'),
    { noSsr: true }
  );

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(
    () => {
      dispatch(getThreads());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (!mdUp) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    },
    [mdUp]
  );

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  if (!router.isReady) {
    return null;
  }

  const view = threadKey
    ? 'thread'
    : compose
      ? 'compose'
      : 'blank';

  return (
    <>
    </>
  );
};

Chat.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Chat;
