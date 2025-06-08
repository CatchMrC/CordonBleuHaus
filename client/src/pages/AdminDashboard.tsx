import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import MenuItemManagement from '../components/admin/MenuItemManagement';
import SpecialOfferManagement from '../components/admin/SpecialOfferManagement';
import CategoryManagement from '../components/admin/CategoryManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
          <Tab label="Menu Items" />
          <Tab label="Special Offers & Events" />
          <Tab label="Categories" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MenuItemManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SpecialOfferManagement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CategoryManagement />
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard; 