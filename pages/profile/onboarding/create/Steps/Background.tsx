/* eslint-disable react/no-array-index-key */
import React from 'react';
import DefaultCard from 'components/DefaultCard';
import { CardPairContainer, ImageContainer, ImagesContainer } from './style';
import { dummyData } from './const';
import { BackgroundProps } from './type';

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
                longText={data.desc}
                type="about"
                cover={data.cover}
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
                longText={data.desc}
                type="about"
                cover={data.cover}
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
