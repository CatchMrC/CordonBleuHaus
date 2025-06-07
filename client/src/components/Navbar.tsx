import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Box,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const Navbar: React.FC<Props> = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const trigger = useScrollTrigger({
    target: props.window ? props.window() : undefined,
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Cordon Bleu Haus
      </Typography>
      <Divider />
      <List>
        <ListItem onClick={() => scrollToSection('menu-section')}>
          <ListItemText primary="Menu" />
        </ListItem>
        <ListItem onClick={() => scrollToSection('special-offers')}>
          <ListItemText primary="Special Offers" />
        </ListItem>
        <ListItem onClick={() => scrollToSection('testimonials')}>
          <ListItemText primary="Testimonials" />
        </ListItem>
        <ListItem onClick={() => scrollToSection('gallery')}>
          <ListItemText primary="Gallery" />
        </ListItem>
        <ListItem onClick={() => scrollToSection('contact')}>
          <ListItemText primary="Contact" />
        </ListItem>
        {isAuthenticated && (
          <ListItem onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <Typography
              variant="h6"
              component="a"
              onClick={() => scrollToSection('hero-section')}
              sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
            >
              Cordon Bleu Haus
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color="inherit" onClick={() => scrollToSection('menu-section')}>
                Menu
              </Button>
              <Button color="inherit" onClick={() => scrollToSection('special-offers')}>
                Special Offers
              </Button>
              <Button color="inherit" onClick={() => scrollToSection('testimonials')}>
                Testimonials
              </Button>
              <Button color="inherit" onClick={() => scrollToSection('gallery')}>
                Gallery
              </Button>
              <Button color="inherit" onClick={() => scrollToSection('contact')}>
                Contact
              </Button>
              {isAuthenticated && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
