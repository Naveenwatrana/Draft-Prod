import { DividerComp } from 'components/Divider/styles';
import DescriptionInfo from 'components/Atoms/InfoBlock/Description';
import React, { useMemo } from 'react';
import { InfoDescriptionVariant } from 'components/Atoms/InfoBlock/type';
import lang from 'common/lang';
import Accordion from 'components/Atoms/Accordion';
import { AccordionItem } from 'components/Atoms/Accordion/types';
import { CancelableTagsContainer } from 'pages/jobs/create/details/style';
import TagSelect from 'components/Atoms/TagSelect';
import { Tooltip } from 'components/Atoms/FollowButton/style';
import QuestionMarkIcon from 'components/Icons/QuestionMark.svg';
import { Container, PreferenceChoiceSubTitle } from '../style';
import { IndustryAccordionProps } from './type';
import { StyledTooltip } from './style';
const {
  preferences: {
    job: { industries },
  },
} = lang;
const IndustryAccordion = ({
  industryOptions, industryTypes, onChange, selectedAccordionItem,
}: IndustryAccordionProps) => {
  const items: AccordionItem[] = useMemo(() => industryOptions?.filter((options) => industryTypes?.some((type) => type.label === options.industry)).map((industry, index) => {
    const industryToMatch = industryTypes.find((industryType) => industryType.label === industry.industry);
    return ({
      title: `${industry.industry} (${industryToMatch?.subIndustries?.length || 0})`,
      content: (
        <Container>
          {!!industry?.description && <PreferenceChoiceSubTitle>{industry.description}</PreferenceChoiceSubTitle>}
          <CancelableTagsContainer>
            {industry.sub_industries.map((subIndustry) => {
              const isSelected = !!industryToMatch?.subIndustries?.some((subIndustryToMatch) => subIndustryToMatch.label === subIndustry.name);
              return (
                <TagSelect
                  key={subIndustry.industry_id}
                  label={subIndustry.name}
                  isSelected={isSelected}
                  cancelable
                  icon={(
                    <StyledTooltip data-tooltip-id={subIndustry.name} onClick={(e) => e.stopPropagation()}>
                      <Tooltip
                        id={subIndustry.name}
                        place="right"
                        variant="light"
                        content={subIndustry.description}
                      />
                      <QuestionMarkIcon />
                    </StyledTooltip>
                  )}
                  toggleSelect={() => {
                    if (industryToMatch?.subIndustries) {
                      industryToMatch.subIndustries = isSelected
                        ? industryToMatch.subIndustries?.filter(
                          (subIndustryToMatch) => subIndustryToMatch.label !== subIndustry.name,
                        )
                        : [
                          ...industryToMatch.subIndustries,
                          {
                            value: `${subIndustry.id}`,
                            label: subIndustry.name,
                          },
                        ];
                      onChange(industryTypes.map((industryType) => industryType.label === industryToMatch.label ? industryToMatch : industryType));
                    }
                  }}
                />
              );
            })}
          </CancelableTagsContainer>
        </Container>
      ),
    });
  }), [industryOptions, industryTypes]);
  const defaultActive = useMemo(() => selectedAccordionItem ? items?.findIndex((item) => item.title.includes(selectedAccordionItem)) : null, [items, selectedAccordionItem]);
  if (!items?.length) return null;
  return (
    <>
      <DividerComp />
      <DescriptionInfo
        variant={InfoDescriptionVariant.PRIMARY}
        content={industries.subIndustries.description}
      />
      <Accordion items={items} defaultActive={defaultActive} />
    </>
  );
};

export default IndustryAccordion;
