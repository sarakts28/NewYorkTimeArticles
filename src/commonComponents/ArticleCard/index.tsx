import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Button, CardMedia } from '@mui/material';
import { ArticleCardContainer, CardDescription, CardHeading, CardPublishedDate,
  CardPublishedDateContainer } from './style';

interface ArticleCardProps {
 item: {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  isSelected: boolean;
  published_date: string;
  };
}
const  ArticleCard=(({item}:ArticleCardProps)=> {
  const handleLearnMoreClick = () => {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };
  return ( 
  <Box sx={{padding: 2}}>
  <ArticleCardContainer isSelected={item.isSelected}>
  <CardMedia
          sx={{ 
            height: 140, // Increased height for better visibility
            objectFit: 'cover', // Ensures the image covers the area
          }}
          image={item.image}
          alt={item.title}
          component="img"
        />
      <CardContent>
        <CardHeading >
      {item.title}
        </CardHeading>
        <CardDescription>
          {item.description}
        </CardDescription>
        <CardPublishedDateContainer>
        <CardPublishedDate
        >
          Published Date <span style={{ fontWeight: 'bold'}}>{item.published_date}</span>
        </CardPublishedDate>
        </CardPublishedDateContainer>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLearnMoreClick}>Learn More</Button>
      </CardActions>
    </ArticleCardContainer>
    </Box>
  );
});

export default ArticleCard;
