import React, { useState, useEffect } from 'react';
import { Grid, Box, CircularProgress, Snackbar, Alert, Pagination } from '@mui/material';
import axios from 'axios';
import ChildCard from './ChildCard';
import ChildCardModal from './ChildCardModal';
import SearchComponent from './SearchComponent';

const ChildCheckin: React.FC = () => {
  interface Child {
    id: string;
    name: string;
    state: string;
    image: string;
    birthday?: string;
    gender?: number;
    homeAddress?: string | null;
    extraInfo?: string;
  }

  const [children, setChildren] = useState<Child[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://app.famly.co/api/daycare/tablet/group', {
        params: {
          accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
          groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
          institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb',
          page,
        },
      });

      const newChildren = response.data.children.map((child: any) => ({
        id: child.childId,
        name: child.name.fullName,
        state: child.checkins.length > 0 ? 'checkout' : 'checkin',
        image: child.image?.small || '',
        birthday: child.birthday,
        gender: child.gender,
        homeAddress: child.homeAddress,
        extraInfo: child.extraInfo,
        
      }));

      setChildren(newChildren);
      setHasMore(newChildren.length > 0);
    } catch (error) {
      console.error('Children data fetch errored:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (children.length > 0) {
      const filtered = children.filter((child) =>
        child.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChildren(filtered);
    }
  }, [children, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAction = (id: string, state: string, name: string) => {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hrs}:${min}`;

    const endpoint =
      state === 'checkin'
        ? `https://app.famly.co/api/v2/children/${id}/checkins`
        : `https://app.famly.co/api/v2/children/${id}/checkout`;

    const payload =
      state === 'checkin'
        ? {
            accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
            pickupTime: formattedTime,
          }
        : {
            accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
          };

    axios
      .post(endpoint, payload)
      .then(() => {
        setChildren((prev) =>
          prev.map((child) =>
            child.id === id
              ? { ...child, state: state === 'checkin' ? 'checkout' : 'checkin' }
              : child
          )
        );
        setAlertMessage(`${name} ${state === 'checkin' ? 'is checked-in' : 'is checked-out'}`);
        setOpenAlert(true);
      })
      .catch((error) => {
        console.error('Error with checkout / checkin post:', error);
      });
  };

  const handleCardClick = (child: Child) => {
    setSelectedChild(child);
  };

  const handleCloseModal = () => {
    setSelectedChild(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);  // Set the new page number
  };

  useEffect(() => {
    fetchChildren();  // Fetch data when the page changes
  }, [page]);  // Fetch data when the page changes

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchComponent onSearch={handleSearch} />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50px',
          }}
        >
          <CircularProgress sx={{ color: '#8644e4' }} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredChildren.map((child) => (
            <Grid item xs={12} sm={6} md={4} key={child.id}>
              <ChildCard item={child} onClick={() => handleCardClick(child)} onAction={handleAction} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        count={hasMore ? page + 1 : page}  // Adjust the count based on the "hasMore" state
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
      <ChildCardModal open={!!selectedChild} onClose={handleCloseModal} child={selectedChild} />
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChildCheckin;