import React from "react";

interface Props {
  profilePhoto: any;
  setProfilePhoto: (photo: any) => void;
  setPage: () => void;
}
const AddProfilePhoto: React.FC<Props> = ({
  profilePhoto,
  setProfilePhoto,
  setPage,
}) => {
  return <div>AddProfilePhoto</div>;
};

export default AddProfilePhoto;
