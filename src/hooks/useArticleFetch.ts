import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
interface ArticleProps {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  isselected: boolean;
  published_date: string;
}
const useArticleFetch = () => {
  // useState to manage articles, search text, and selected duration
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('1');
  const [apiData, setApiData] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  });

  const nytApiKey = 'X45C9DdzwdjJDZUsJcCjBhXoyE6rAq0b';
  const nytUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/';

  // fecth articles for api
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${nytUrl}${selectedDuration}.json?api-key=${nytApiKey}`);

      if (response.status === 200) {
        const results = response.data?.results || [];

        const data = results.map((item: any) => {
          // Safely get image URL with fallbacks

          return {
            id: item.id || Math.random().toString(36).substring(2, 9), // fallback ID
            title: item.title || 'No title available',
            description: item.abstract || '',
            image:
              item.media?.[0]?.['media-metadata']?.[2]?.url ||
              item.media?.[0]?.['media-metadata']?.[0]?.url ||
              '',
            url: item.url || '#',
            isselected: false,
            published_date: item.published_date || '',
          };
        });

        setApiData(data);
        setArticles(data);
        setAlertMessage({
          message: `Articles fetched successfully for last ${selectedDuration} day${selectedDuration !== '1' ? 's' : ''}`,
          type: 'success',
        });
      } else {
        setAlertMessage({
          message: 'Failed to fetch articles: Invalid response',
          type: 'error',
        });
      }
    } catch (err: any) {
      console.error('Error fetching articles:', err);
      setAlertMessage({
        message: `Failed to fetch articles: ${err.message || 'Unknown error'}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [selectedDuration]);

  const updateSelectedArticle = useCallback((id: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => ({
        ...article,
        isSelected: article.id === id,
      }))
    );
  }, []);

  const filterArticles = useCallback(() => {
    if (searchText) {
      const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setArticles(filteredArticles);
      return;
    }
    setArticles(apiData);
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [selectedDuration]);

  useEffect(() => {
    filterArticles();
  }, [searchText]);

  return {
    loading,
    alertMessage,
    updateSelectedArticle,
    articles,
    searchText,
    setSearchText,
    selectedDuration,
    setSelectedDuration,
  };
};
export default useArticleFetch;
