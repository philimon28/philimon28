import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { Logout } from '@mui/icons-material';
// import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const { data: session }: any = useSession();

  const handleSignOut = useCallback(async () => {
    signOut({ redirect: false }).then(() => router.push('/'));
    onClose?.();

    router.push('/');
  }, [onClose, session, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      // PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {session?.user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        {/* <Link href="/">
          <MenuItem>
            <ListItemIcon>
              <AccountCircleTwoTone />
            </ListItemIcon>
            <Typography variant="body1">Profile Setting</Typography>
          </MenuItem>
        </Link>*/}

        <MenuItem onClick={handleSignOut}>
          <ListItemIcon color="error">
            <Logout color="error" />
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
