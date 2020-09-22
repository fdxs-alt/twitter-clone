import React from "react";
import {
  FooterWrapper,
  FeatureList,
  Feature,
} from "../../Style/ComponentStyles/RegisterPageStyles";

const Footer = () => {
  return (
    <FooterWrapper>
      <FeatureList>
        <Feature>About</Feature>
        <Feature>Help Center</Feature>
        <Feature>Terms</Feature>
        <Feature>Privacy policy</Feature>
        <Feature>Cookies</Feature>
        <Feature>Ads info</Feature>
        <Feature>Blog</Feature>
        <Feature>Status</Feature>
        <Feature>Job</Feature>
        <Feature>Brand</Feature>
        <Feature>Advertise</Feature>
        <Feature>Marketing</Feature>
        <Feature>Businesses</Feature>
        <Feature>Developers</Feature>
        <Feature>Directory</Feature>
        <Feature>Settings</Feature>
        <Feature>© 2020 Twitter, Inc.</Feature>
      </FeatureList>
    </FooterWrapper>
  );
};

export default Footer;
