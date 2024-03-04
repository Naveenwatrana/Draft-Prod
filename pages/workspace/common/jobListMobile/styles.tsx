import styled from 'styled-components';

type JobStatusProps = {
    isPublished: boolean;
}

export const ListItem = styled.div`
    border: 1px solid ${(props) => props.theme.palette.gray['60'].value};
    border-radius: 12px;
    padding 16px;
    margin-bottom: 16px;
`;

export const JobRole = styled.div`
    font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.green['80'].value};
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const JobDataRow = styled.div`
    padding: 4px 0;
    color: ${(props) => props.theme.palette.white['100'].value};
`;

export const JobDataKey = styled.span`
    font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
`;

export const JobDataValue = styled.span`
    font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
`;

export const JobRoleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

export const JobStatusWrapper = styled.div<JobStatusProps>`
    padding: 4px 8px;
    margin: 4px 0;
    width: fit-content;
    border-radius: 8px;
    color: ${(props) => props.theme.palette.white['100'].value};
    background-color: ${(props) => props.isPublished ? props.theme.palette.green['15'].value : props.theme.palette.gray['60'].value};
`;
