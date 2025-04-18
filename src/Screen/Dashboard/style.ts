import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
`;

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;
  padding: 0px 10px 10px 10px;
`;

export const ArticleContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  overflow: auto;
  height: 80vh;
  border: 1px solid #ccc;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const NoArticlesText = styled(Typography)`
  font-size: 16px;
  color: #555;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
