import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import {
  Avatar, CompaniesContainer, UserDropDownItem,
} from './styles';

type UserAccountListProps = {
  handleSwitch: (company: any) => void; // TODO: add type
  firstName: string;
  companiesList: any[]; // TODO: add type
};

const UserAccountList = ({
  handleSwitch, firstName, companiesList,
}: UserAccountListProps) => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <CompaniesContainer>
      <UserDropDownItem onClick={() => handleSwitch(null)}>
        {currentUser?.cards?.[0]?.fields?.media ? (
          <Avatar rectangle url={currentUser?.cards?.[0]?.fields?.media} />
        ) : (
          <Avatar rectangle>{firstName.charAt(0)}</Avatar>
        )}
        <span>{firstName}</span>
      </UserDropDownItem>
      {companiesList.map((company: any) => ( // TODO: add type
        <UserDropDownItem
          onClick={() => handleSwitch(company)}
          data-cy={`setCompany${company.name}`}
          key={company.id}
        >
          {company?.logo ? <Avatar url={company.logo} /> : <Avatar>{company.name.charAt(0)}</Avatar>}
          <span>{company.name}</span>
        </UserDropDownItem>
      ))}
    </CompaniesContainer>
  );
};

export default UserAccountList;
