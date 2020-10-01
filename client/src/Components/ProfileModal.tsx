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
  const [background, setBackgorund] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<any>(null);

  return (
    <Modal open={isOpen} closeModal={closeModal}>
      <form>
        {page === 0 && (
          <AddProfilePhoto
            profilePhoto={profilePhoto}
            setProfilePhoto={(photo: any) => setProfilePhoto(photo)}
            setPage={setPage}
          />
        )}
        {page === 1 && (
          <AddBackground
            background={background}
            setBackgroundPhoto={(background: any) => setBackgorund(background)}
            setPage={setPage}
          />
        )}
        {page === 2 && <UpdateBio />}
      </form>
    </Modal>
  );
};

export default ProfileModal;
