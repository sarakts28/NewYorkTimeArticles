import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useArticleFetch from './useArticleFetch';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useArticleFetch', () => {
  const mockApiResponse = {
    results: [
      {
        id: 1,
        title: 'Test Article 1',
        abstract: 'Test description 1',
        media: [
          {
            'media-metadata': [
              { url: 'http://small.image1.jpg' },
              { url: 'http://medium.image1.jpg' },
              { url: 'http://large.image1.jpg' },
            ],
          },
        ],
        url: 'http://test.article1.com',
        published_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Test Article 2',
        abstract: 'Test description 2',
        media: [
          {
            'media-metadata': [{ url: 'http://small.image2.jpg' }],
          },
        ],
        url: 'http://test.article2.com',
        published_date: '2023-01-02',
      },
      {
        // Test article with missing fields
        title: 'Incomplete Article',
        abstract: '',
        url: '',
        published_date: '',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useArticleFetch());

    expect(result.current.loading).toBe(false);
    expect(result.current.articles).toEqual([]);
    expect(result.current.searchText).toBe('');
    expect(result.current.selectedDuration).toBe('1');
    expect(result.current.alertMessage).toEqual({
      message: '',
      type: '',
    });
  });

  it('should fetch articles successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockApiResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useArticleFetch());

    expect(result.current.loading).toBe(false);
    await act(async () => {
      await waitForNextUpdate();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=X45C9DdzwdjJDZUsJcCjBhXoyE6rAq0b'
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.articles).toHaveLength(3);
    expect(result.current.articles[0]).toEqual({
      id: 1,
      title: 'Test Article 1',
      description: 'Test description 1',
      image: 'http://large.image1.jpg',
      url: 'http://test.article1.com',
      isselected: false,
      published_date: '2023-01-01',
    });
    expect(result.current.articles[1].image).toBe('http://small.image2.jpg'); // Fallback to first image
    expect(result.current.alertMessage).toEqual({
      message: 'Articles fetched successfully for last 1 day',
      type: 'success',
    });
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useArticleFetch());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.alertMessage).toEqual({
      message: `Failed to fetch articles: ${errorMessage}`,
      type: 'error',
    });
  });

  it('should filter articles based on search text', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockApiResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useArticleFetch());
    await act(async () => {
      await waitForNextUpdate();
    });

    // Initial state - all articles
    expect(result.current.articles).toHaveLength(3);

    // Filter articles
    act(() => {
      result.current.setSearchText('Article 1');
    });

    expect(result.current.articles).toHaveLength(1);
    expect(result.current.articles[0].title).toBe('Test Article 1');

    // Clear search
    act(() => {
      result.current.setSearchText('');
    });

    expect(result.current.articles).toHaveLength(3);
  });

  it('should update selected article', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockApiResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useArticleFetch());
    await act(async () => {
      await waitForNextUpdate();
    });

    // Select an article
    act(() => {
      result.current.updateSelectedArticle(1);
    });

    // Check if the correct article is selected
    const updatedArticles = result.current.articles;
    expect(updatedArticles.find((a) => a.id === 1)?.isselected).toBe(true);
    expect(updatedArticles.find((a) => a.id === 2)?.isselected).toBe(false);
  });

  it('should refetch when selectedDuration changes', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockApiResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useArticleFetch());

    // Initial fetch
    await act(async () => {
      await waitForNextUpdate();
    });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    // Change duration
    act(() => {
      result.current.setSelectedDuration('7');
    });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenLastCalledWith(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=X45C9DdzwdjJDZUsJcCjBhXoyE6rAq0b'
    );
    expect(result.current.alertMessage.message).toContain('7 days');
  });

  it('should handle missing data fields gracefully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockApiResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useArticleFetch());
    await act(async () => {
      await waitForNextUpdate();
    });

    const incompleteArticle = result.current.articles[2];
    expect(incompleteArticle.title).toBe('Incomplete Article');
    expect(incompleteArticle.id).toBeDefined(); // Should have generated ID
    expect(incompleteArticle.url).toBe('#');
    expect(incompleteArticle.image).toBe('');
  });
});
