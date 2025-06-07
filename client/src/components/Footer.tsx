import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => (
  <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} Cordon Bleu Haus. All rights reserved.
    </Typography>
  </Box>
);

export default Footer; 