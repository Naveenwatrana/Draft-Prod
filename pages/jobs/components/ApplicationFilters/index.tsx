import React, {
  ChangeEvent, useEffect, useState,
} from 'react';
import lang from 'common/lang';
import { CheckboxItem } from 'components/Atoms/CheckboxSelect/style';
import CheckboxIcon from 'components/Icons/CheckboxIcon';
import { CheckboxLabel } from 'components/input/styles';
import { NavFilterProps } from 'pages/jobs/details/types';
import { SkillTag } from 'components/Atoms/SkillTag/styles';
import TextComp from 'components/textComp';
import {
  ApplicationSearchContainer, InputSearchIcon, ApplicationSearchInput, ApplicationsCrossIcon,
} from 'components/NavBar/styles';
import {
  SidebarContainer, SectionDivider, Title, Skills,
} from './style';
const { jobs } = lang;

type SkillsListProps = {
  skills: string[],
  toggleSkill: (skillId: string) => void,
  selectedSkills: string[]
};
const SkillsList = ({ skills, toggleSkill, selectedSkills }: SkillsListProps) => {
  return (
    <Skills>
      {skills.map((skill: string) => (
        <SkillTag onClick={() => toggleSkill(skill)} selected={selectedSkills.includes(skill)} key={skill}>{skill}</SkillTag>
      ))}
    </Skills>
  );
};

const ApplicationFilters = ({ skills, updateFilter, setSkills } : NavFilterProps) => {
  const [isSortListed, setIsSortListed] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const toggleSkill = (skillId:string) => {
    const index = selectedSkills.indexOf(skillId);
    if (index === -1) {
      selectedSkills.push(skillId);
    } else {
      selectedSkills.splice(index, 1);
    }
    setSkills(selectedSkills.map((skill) => skill));
    setSelectedSkills([...selectedSkills]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      updateFilter({ search: searchTerm, isSortListed });
      return;
    }
    updateFilter({
      isSortListed,
    });
  }, [searchTerm, isSortListed]);

  return (
    <SidebarContainer>
      <Title>{jobs.applicants.filters}</Title>
      <CheckboxItem
        key="item"
        onClick={() => { setIsSortListed(!isSortListed); }}
      >
        <CheckboxIcon checked={isSortListed} />
        <CheckboxLabel>{jobs.applicants.shortlisted}</CheckboxLabel>
      </CheckboxItem>
      <SectionDivider />

      {skills && Object.keys(skills).map((key: string) => {
        return (
          <div key={key}>
            <TextComp component="h6">{key}</TextComp>
            <SkillsList skills={skills[key]} toggleSkill={toggleSkill} selectedSkills={selectedSkills} />
          </div>
        );
      })}
      <SectionDivider />
      <ApplicationSearchContainer>
        <ApplicationSearchInput
          placeholder={jobs.applicants.search}
          value={searchTerm}
          onChange={handleSearch}
          autoFocus={false}
        />
        <InputSearchIcon size={25} />
        {searchTerm && <ApplicationsCrossIcon size={14} onClick={clearSearch} />}
      </ApplicationSearchContainer>
    </SidebarContainer>
  );
};

export default ApplicationFilters;
