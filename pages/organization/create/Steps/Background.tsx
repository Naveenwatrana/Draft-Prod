/* eslint-disable react/no-array-index-key */
import React from 'react';
import DefaultCard from 'components/DefaultCard';
import { CardPairContainer, ImageContainer, ImagesContainer } from 'pages/profile/onboarding/create/Steps/style';
import { BackgroundProps } from 'pages/profile/onboarding/create/Steps/type';
import { dummyData } from './const';

const Background = ({ focused }: BackgroundProps) => {
  return (
    <ImageContainer focused={focused}>
      <ImagesContainer>
        {dummyData?.slice(0, 2)?.map((dataArray, index) => (
          <CardPairContainer key={`cardPair${index}`}>
            {dataArray.map((data) => (
              <DefaultCard
                key={data.title}
                primaryText={data.title}
                secondaryText={data.desc}
                type="info"
                cover={data.cover}
                icon={data.icon}
                hideHeader
                height="628px"
                width="372px"
              />
            ))}
          </CardPairContainer>
        ))}
      </ImagesContainer>
      <ImagesContainer>
        {dummyData?.slice(2, 4)?.map((dataArray, index) => (
          <CardPairContainer key={`cardPair${index}${2}`}>
            {dataArray.map((data) => (
              <DefaultCard
                key={data.title}
                primaryText={data.title}
                secondaryText={data.desc}
                type="info"
                cover={data.cover}
                icon={data.icon}
                hideHeader
                height="628px"
                width="372px"
              />
            ))}
          </CardPairContainer>
        ))}
      </ImagesContainer>
    </ImageContainer>
  );
};

export default Background;
