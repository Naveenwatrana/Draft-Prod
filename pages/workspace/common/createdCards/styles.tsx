import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';

export const Content = styled.div`
    flex: 4;
    display: flex;
    padding: 16px;
    flex-wrap: wrap;
`;

export const NoContent = styled(Content)`
    justify-content: center;
    flex: 4;
`;
export const MoreActions = styled(Content)`
    justify-content: center;
`;

export const Card = styled.div`
    margin-left: 24px;
    overflow: visible;
    margin-bottom: 24px;
`;

export const ArticleMetaInfo = styled.div`
    margin-top: 20px;
    margin-left: 16px;
    display: flex;
    justify-content: space-between;
`;
export const ArticleStats = styled.div`
`;
export const ArticleStatsItem = styled.div`
    display: flex;
    align-items: center;
`;
export const ArticleActions = styled.div`
`;
export const ArticleStatsItemLabel = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
`;

type ArticleStatusProps = {
    active: boolean;
};
export const ArticleStatus = styled.div<ArticleStatusProps>`
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    margin-left: 8px;
    padding: 4px 8px;
    background-color: ${({ active, theme }) => active ? theme.palette.gray['40'].value : theme.palette.gray['50'].value};
    border-radius: 8px;
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
    margin-left: 291px;
    @media (max-width: 768px) {
        margin-left: auto;
    }
`;
export const ViewArticleLink = styled(Link)`
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    &:hover {
        color: ${({ theme }) => theme.palette.green['100'].value};
    }
`;

export const PublishArticleButton = styled(ButtonComp)`
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
`;
