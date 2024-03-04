import ChevronLeft from 'components/Icons/LeftChevron';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import { BackButton, TncContainer, ContentWrapper } from './styles';
import { ITermsProps } from '../types';

const { SignUp } = lang;

// TODO: Need to get actual terms and conditions
const Terms = ({ handleTerms }: ITermsProps) => {
  return (
    <TncContainer>
      <BackButton type="button" onClick={handleTerms}>
        <ChevronLeft />
        <TextComp component="p" theme="grey">
          {SignUp.termsBackButtonLabel}
        </TextComp>
      </BackButton>
      <TextComp component="h2">
        {SignUp.termsTitle}
      </TextComp>
      <ContentWrapper>
        <TextComp>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sollicitudin augue in sapien pulvinar imperdiet. Nulla sit amet
          bibendum enim. Donec maximus suscipit ipsum vitae rutrum. Sed
          ultricies ipsum et lacus accumsan, in placerat dolor posuere. Donec
          eget auctor nisi. Pellentesque nec hendrerit neque, id varius nisl.
          Proin ipsum risus, tempor at tincidunt auctor, egestas ac arcu. Aenean
          hendrerit, ligula et tempus varius, dui mauris tincidunt ligula, at
          imperdiet metus lectus sed eros. Pellentesque placerat sapien vel
          tempus malesuada. Ut commodo, est at mollis consequat, ipsum velit
          hendrerit lacus, at aliquam nibh nunc interdum sapien. Nulla posuere,
          est a tempus ullamcorper, est purus fermentum velit, sit amet pulvinar
          sem justo ac urna. Quisque vel malesuada massa.
        </TextComp>
        <br></br>
        <br></br>
        <TextComp>
          Nam id porta velit. Donec dignissim euismod tellus, in ullamcorper
          sapien ornare sit amet. Nulla tincidunt mi molestie, malesuada nulla
          nec, tincidunt urna. In et maximus ex, in vehicula erat. Duis congue
          scelerisque lacus, nec sagittis ipsum fringilla ac. Aenean non ipsum
          non purus efficitur viverra. Praesent facilisis lacus non ante
          gravida, et finibus felis pulvinar. Nam ultricies eros eu condimentum
          aliquam. Etiam eget nisl eros. Vestibulum id fringilla neque, eu
          vulputate erat. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia curae; Nam gravida odio non felis iaculis
          eleifend. Nulla nunc ex, vehicula et risus a, pulvinar ullamcorper
          quam. Nulla placerat ante eu convallis auctor. Nam nec bibendum dolor,
          eget porta odio.
        </TextComp>
      </ContentWrapper>
    </TncContainer>
  );
};

export default Terms;
