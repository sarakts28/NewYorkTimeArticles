import {
  ArticleContainer,
  Container,
  MainContainer,
  NoArticlesText,
  LoaderContainer,
} from './style';
import { AlertNotification, ArticleCard, DropDown, SearchInput } from '../../commonComponents';
import { Box, CircularProgress, Typography } from '@mui/material';
import useArticleFetch from '../../hooks/useArticleFetch';
import { useEffect, useRef } from 'react';
import { AlertNotificationHandle } from '../../commonComponents/Alert';

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

  const alertRef = useRef<AlertNotificationHandle>(null);

  useEffect(() => {
    if (alertMessage.message) {
      if (alertMessage.type === 'error') {
        alertRef.current?.showAlert(alertMessage.message, alertMessage.type);
      } else {
        alertRef.current?.showAlert(alertMessage.message);
      }
    }
  }, [alertMessage.message, alertMessage.type]);

  return (
    <>
      <MainContainer>
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
      <AlertNotification ref={alertRef} />
    </>
  );
};
export default Dashboard;
