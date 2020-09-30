import React, { useState } from "react";
import Modal from "./Modal";
import AddBackground from "./UpdateProfileSteps/AddBackground";
import AddProfilePhoto from "./UpdateProfileSteps/AddProfilePhoto";
import UpdateBio from "./UpdateProfileSteps/UpdateBio";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
const ProfileModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  const [page, setPage] = useState(0);
  const [background, setBackgorund] = useState<any>();
  const [profilePhoto, setProfilePhoto] = useState<any>();

  return (
    <Modal open={isOpen} closeModal={closeModal}>
      {page === 0 && (
        <AddProfilePhoto
          profilePhoto={profilePhoto}
          setProfilePhoto={(photo: any) => setProfilePhoto(photo)}
          setPage={() => setPage((prev) => prev + 1)}
        />
      )}
      {page === 1 && (
        <AddBackground
          background={background}
          setBackgroundPhoto={(background: any) => setBackgorund(background)}
          setPage={() => setPage((prev) => prev + 1)}
        />
      )}
      {page === 2 && <UpdateBio />}
    </Modal>
  );
};

export default ProfileModal;
