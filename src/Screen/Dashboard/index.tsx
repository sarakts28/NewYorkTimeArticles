import {
  ArticleContainer,
  Container,
  MainContainer,
  NoArticlesText,
  LoaderContainer,
} from './style';
import { ArticleCard, DropDown, SearchInput } from '../../commonComponents';
import { Box, CircularProgress, Typography, Snackbar, Alert } from '@mui/material';
import useArticleFetch from '../../hooks/useArticleFetch';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const {
    updateSelectedArticle,
    articles,
    alertMessage,
    searchText,
    setSearchText,
    selectedDuration,
    setSelectedDuration,
    loading,
  } = useArticleFetch();

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (alertMessage.message) {
      setOpenAlert(true);
    }
  }, [alertMessage]);

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <MainContainer>
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertMessage.type === 'success' ? 'success' : 'error'}
          >
            {alertMessage.message}
          </Alert>
        </Snackbar>

        <Container>
          <DropDown
            options={[
              { value: '1', label: 'For Today' },
              { value: '7', label: 'For Week' },
              { value: '30', label: 'For Month' },
            ]}
            value={selectedDuration}
            placeholder='Select duration'
            onChange={(e) => setSelectedDuration(e.target.value as string)}
            width={'35%'}
          />
          <Typography variant='h6'>Most Read Article</Typography>
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            width={'35%'}
            placeholder='Search for articles'
          />
        </Container>
        <ArticleContainer>
          {loading ? (
            <LoaderContainer>
              <CircularProgress />
            </LoaderContainer>
          ) : articles.length === 0 ? (
            <NoArticlesText>No articles found</NoArticlesText>
          ) : (
            articles.map((item) => (
              <Box onClick={() => updateSelectedArticle(item.id)} key={item.id}>
                <ArticleCard key={item.id} item={item} />
              </Box>
            ))
          )}
        </ArticleContainer>
      </MainContainer>
    </>
  );
};
export default Dashboard;
