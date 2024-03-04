import { DividerComp } from 'components/Divider/styles';
import styled from 'styled-components';

export const ShadowIconContainer = styled.div`
  position: absolute ;
  left: 0;
  top: 0;
  height: 20px;
  height: min-content;
`;

export const Skills = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;
export const Content = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    width: 100%;
    ${DividerComp} {
        margin: 0;
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
