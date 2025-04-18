import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
interface ArticleProps {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  isSelected: boolean;
  published_date: string;
}
const useArticleFetch = () => {
// useState to manage articles, search text, and selected duration
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('1');
  const [apiData, setApiData] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{message: string, type: string}>({
    message: '',
    type: ''});

  const nytApiKey = 'X45C9DdzwdjJDZUsJcCjBhXoyE6rAq0b';
  const nytUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/';
 

  // fecth articles for api
  const fetchData =  useCallback(async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${nytUrl}${selectedDuration}.json?api-key=${nytApiKey}`);
      if(response.status === 200){
        const data = (response.data as { results: any[] })?.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.abstract,
          image: item.media[0]['media-metadata'][2].url,
          url: item.url,
          isSelected: false,
          published_date: item.published_date,
        }));
        setApiData(data);
        setArticles(data);
        setAlertMessage({
          message: 'Articles fetched successfully',
          type: 'success',
        });
      }
    } catch (err: any) {
      setAlertMessage({
        message: err.message,
        type: 'error',
      });
    } 
    setLoading(false);
  },[selectedDuration]);



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

    },[searchText]);

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