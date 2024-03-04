export type AddBioProps = {
  setBio: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void;
}

export type IAddBioFormValues = {
    bio: string;
  };
