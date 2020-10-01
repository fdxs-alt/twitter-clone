import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import { Button } from "../../Style/ComponentStyles/NavbarStyles";
import { ColumnWrapper } from "../../Style/ComponentStyles/ProfilePageStyles";
import Modal from "../Modal";
import AddBackground from "./AddBackground";
import AddProfilePhoto from "./AddProfilePhoto";
import UpdateBio from "./UpdateBio";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
const ProfileModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  const [page, setPage] = useState(0);
  const [background, setBackgorund] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<any>(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { userStore } = useRootStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = new FormData();

    dataToSend.append("avatar", profilePhoto);
    dataToSend.append("background", background);

    dataToSend.append("city", city);
    dataToSend.append("country", country);
    dataToSend.append("profileLink", link);
    dataToSend.append("description", description);

    await userStore.updateProfile(dataToSend);

    closeModal();
  };
  return useObserver(() => {
    return (
      <Modal open={isOpen} closeModal={closeModal}>
        <form onSubmit={(e) => handleSubmit(e)}>
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
              setBackgroundPhoto={(background: any) =>
                setBackgorund(background)
              }
              setPage={setPage}
            />
          )}
          {page === 2 && (
            <ColumnWrapper>
              <UpdateBio
                link={link}
                city={city}
                setCity={setCity}
                setCountry={setCountry}
                country={country}
                setLink={setLink}
                setDescription={setDescription}
                description={description}
              />
              <Button type="submit">Update profile</Button>
            </ColumnWrapper>
          )}
        </form>
      </Modal>
    );
  });
};

export default ProfileModal;
