import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Restaurant
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Home', sectionId: 'hero-section' },
    { label: 'Menu', sectionId: 'menu-section' },
    { label: 'Special Offers', sectionId: 'special-offers' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Contact Us', sectionId: 'contact' }

  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Impressum', href: '/impressum' }
  ];

  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com/cordonbleuhaus', label: 'Facebook' },
    { icon: <Instagram />, href: 'https://instagram.com/cordonbleuhaus', label: 'Instagram' },
    { icon: <Twitter />, href: 'https://twitter.com/cordonbleuhaus', label: 'Twitter' }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'grey.900',
        color: 'white',
        pt: 6,
        pb: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mb: 4
        }}>
          {/* Restaurant Info */}
          <Box sx={{ flex: { md: 2 } }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Restaurant sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                  Cordon Bleu Haus
                </Typography>
              </Box>
              <Typography variant="body2" color="grey.300" sx={{ mb: 3, lineHeight: 1.6 }}>
                Experience exquisite dining with our carefully crafted dishes and warm hospitality. 
                We bring you the finest culinary traditions in a modern, elegant setting.
              </Typography>
              
              {/* Social Media */}
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'grey.300',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link, index) => (
                <Box
                  key={index}
                  onClick={() => scrollToSection(link.sectionId)}
                  sx={{
                    color: 'grey.300',
                    cursor: 'pointer',
                    py: 0.5,
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.3s ease',
                    display: 'block'
                  }}
                >
                  <Typography variant="body2">
                    {link.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Legal Links */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="grey.300"
                  underline="none"
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.3s ease',
                    display: 'block',
                    py: 0.5
                  }}
                >
                  <Typography variant="body2">
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Contact Info */}
          <Box sx={{ flex: { md: 2 } }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Contact Info
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationOn sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="grey.300" lineHeight={1.5}>
                    Freiburger Str. 313<br />
                    79539 Lörrach<br />
                    Deutschland
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ color: 'primary.main', fontSize: 20 }} />
                <Link 
                  href="tel:+4976211234567"
                  color="grey.300"
                  underline="none"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  <Typography variant="body2">
                    +49 7621 123456
                  </Typography>
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                <Link 
                  href="mailto:info@cordonbleuhaus.de"
                  color="grey.300"
                  underline="none"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  <Typography variant="body2">
                    info@cordonbleuhaus.de
                  </Typography>
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <AccessTime sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="white" sx={{ mb: 0.5 }}>
                    Opening Hours
                  </Typography>
                  <Typography variant="body2" color="grey.300" lineHeight={1.4}>
                    Mon - Fri: 11:00 - 22:00<br />
                    Saturday: 11:00 - 23:00<br />
                    Sunday: 12:00 - 21:00
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" color="grey.400">
            © {new Date().getFullYear()} Cordon Bleu Haus. All rights reserved.
          </Typography>
          
          <Typography variant="body2" color="grey.400">
            Made with ❤️ for exceptional dining experiences
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 