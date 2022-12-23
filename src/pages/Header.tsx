import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

function Header() {

  return (
    <AppBar position="static" sx = {{bgcolor:"primary"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EmojiNatureIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ノリノリデイズ
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
