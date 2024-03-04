/* eslint-disable react/no-array-index-key */
import React from 'react';
import DefaultCard from 'components/DefaultCard';
import { CardPairContainer, ImageContainer, ImagesContainer } from './style';
import { BackgroundProps } from './type';
import { dummyData } from './const';

const Background = ({ focused }: BackgroundProps) => {
  return (
    <ImageContainer focused={focused}>
      {[dummyData?.slice(0, 2), dummyData?.slice(2, 4)].map((dataArray1, index1) => (
        <ImagesContainer key={`imageContainer-${index1}`}>
          {dataArray1?.map((dataArray, index) => (
            <CardPairContainer key={`cardPair${index}`}>
              {dataArray.map(
                ({
                  icon,
                  primaryText,
                  secondaryText,
                  tertiaryText,
                  tertiaryPairText,
                  salaryFrom,
                  salaryTo,
                  cover,
                }) => (
                  <DefaultCard
                    icon={icon}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                    tertiaryText={tertiaryText}
                    tertiaryPairText={tertiaryPairText as [string, string]}
                    type="job"
                    range={{
                      from: salaryFrom,
                      to: salaryTo,
                    }}
                    height="628px"
                    width="372px"
                    cover={cover}
                    hideHeader
                    userNameClickable={false}
                    key={icon}
                  />
                ),
              )}
            </CardPairContainer>
          ))}
        </ImagesContainer>
      ))}
    </ImageContainer>
  );
};

export default Background;
