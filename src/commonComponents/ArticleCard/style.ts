import styled from '@emotion/styled';
import { Card, Typography, Box } from '@mui/material';

interface ArticleCardContainerProps {
  isSelected?: boolean;
}

export const ArticleCardContainer = styled(Card)<ArticleCardContainerProps>`
  width: 300px;
  height: 400px;
  border: ${({ isSelected }) => (isSelected ? '2px solid red' : '1px solid rgba(0, 0, 0, 0.12)')};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), ' +
        '0px 1px 14px 0px rgba(0,0,0,0.12)'
      : '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), ' +
        '0px 1px 3px 0px rgba(0,0,0,0.12)'};
  transition: all 0.3s ease;

  &:hover {
    border: ${({ isSelected }) =>
      isSelected ? '2px solid darkred' : '1px solid rgba(0, 0, 0, 0.3)'};
    box-shadow: ${({ isSelected }) =>
      isSelected
        ? '0px 7px 9px -1px rgba(0,0,0,0.3), ' +
          '0px 10px 12px 0px rgba(0,0,0,0.24), ' +
          '0px 5px 16px 0px rgba(0,0,0,0.22)'
        : '0px 4px 3px -1px rgba(0,0,0,0.3), ' +
          '0px 3px 3px 0px rgba(0,0,0,0.24), ' +
          '0px 3px 5px 0px rgba(0,0,0,0.22)'};
    transform: translateY(-2px);
  }
`;

export const CardHeading = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
  margin-bottom: 20px;
`;

export const CardDescription = styled(Typography)`
  font-size: 12px;
  color: #555;
  text-align: justify;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 70px;
  margin-bottom: 20px;
`;

export const CardPublishedDateContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CardPublishedDate = styled(Typography)`
  font-size: 12px;
  color: #777;
  text-align: right;
`;
