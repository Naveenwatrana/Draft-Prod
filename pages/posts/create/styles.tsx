import styled from 'styled-components';

export const ArticlePreviewContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[60].value};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
  @media screen and (max-width: 1023px) {
    display: none;
  } 
`;
export const ArticlePreviewContainerMobile = styled(ArticlePreviewContainer)`
@media screen and (max-width: 1023px) {
  display: block;
} 
`;
export const CardsContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 142px);
  margin-top: 65px;
  @media screen and (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
    height: calc(100vh - 107px);
    padding-top: 30px;
  } 

`;
