import React from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../Images/Twitter_Logo_WhiteOnImage.svg";
import {
  BiHomeCircle,
  BiHash,
  BiBell,
  BiMessage,
  BiBookmark,
  BiListUl,
  BiUser,
  BiLogOut,
} from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { useObserver } from "mobx-react-lite";
import { useRootStore } from "../../Store/RootStore";
import DefaultImage from "../../Images/default_profile_400x400.png";
import {
  Avatar,
  AvatarContainer,
  Button,
  IconWrapper,
  NavBar,
  TwitterLogo,
} from "../../Style/ComponentStyles/NavbarStyles";

const Navbar = () => {
  const { userStore } = useRootStore();

  return useObserver(() => {
    if (!userStore.isAuthenticated) return <Redirect to="/login" />;

    return (
      <NavBar>
        <div>
          <TwitterLogo src={Logo} />
          <IconWrapper to="/home">
            <BiHomeCircle fontSize={24} style={{ marginRight: "1.2rem" }} />
            Home
          </IconWrapper>
          <IconWrapper to="/home">
            <BiHash fontSize={24} style={{ marginRight: "1.2rem" }} />
            Explore
          </IconWrapper>
          <IconWrapper to="/home">
            <BiBell fontSize={24} style={{ marginRight: "1.2rem" }} />
            Notifications
          </IconWrapper>
          <IconWrapper to="/home">
            <BiMessage fontSize={24} style={{ marginRight: "1.2rem" }} />
            Messages
          </IconWrapper>
          <IconWrapper to="/home">
            <BiBookmark fontSize={24} style={{ marginRight: "1.2rem" }} />
            Bookmarks
          </IconWrapper>
          <IconWrapper to="/home">
            <BiListUl fontSize={24} style={{ marginRight: "1.2rem" }} />
            Lists
          </IconWrapper>
          <IconWrapper to="/profile">
            <BiUser fontSize={24} style={{ marginRight: "1.2rem" }} />
            Profile
          </IconWrapper>
          <IconWrapper to="/home">
            <CgMoreO fontSize={24} style={{ marginRight: "1.2rem" }} />
            More
          </IconWrapper>
          <Button type="button">Tweet</Button>
        </div>
        <AvatarContainer>
          <Avatar
            src={
              userStore.userData?.avatar
                ? userStore.userData.avatar.url
                : DefaultImage
            }
          />
          <div>
            {userStore.userData?.userName} <br />
            <p style={{ fontSize: "0.6rem" }}>@{userStore.userData?.email}</p>
          </div>
          <BiLogOut
            fontSize={24}
            style={{ marginLeft: "1.2rem", cursor: "pointer" }}
            onClick={async () => {
              await userStore.logout();
            }}
          />
        </AvatarContainer>
      </NavBar>
    );
  });
};

export default Navbar;
