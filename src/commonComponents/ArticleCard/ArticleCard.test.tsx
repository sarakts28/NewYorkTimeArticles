// src/commonComponents/ArticleCard/ArticleCard.test.tsx
import { render, screen } from '@testing-library/react';
import ArticleCard from './index';

describe('ArticleCard', () => {
  const mockArticle = {
    id: 1,
    title: 'Test Article',
    description: 'This is a test article description.',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/article',
    isselected: false,
    published_date: '2023-10-01',
  };

  it('renders article title', () => {
    render(<ArticleCard item={mockArticle} />);
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });
});
