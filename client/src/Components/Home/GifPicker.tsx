import React, { useState } from "react";
import Modal from "../Layout/Modal";

import {
  GifButton,
  LoadingMessage,
  SearchContainer,
  SearchInput,
} from "../../Style/ComponentStyles/GifPickerStyles";
import useGifs from "../../utils/hooks/useGifs";
import Gifs from "./Gifs";
import { Button } from "../../Style/ComponentStyles/RegisterPageStyles";
interface Props {
  setGif: React.Dispatch<React.SetStateAction<string>>;
}

const GifPicker: React.FC<Props> = ({ setGif }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const { loading, modalGifs, search, setSearch } = useGifs(isOpen, autoPlay);

  if ((!isOpen && loading) || (!isOpen && !loading)) {
    return <GifButton onClick={() => setIsOpen(true)} fontSize={28} />;
  } else if (isOpen && loading) {
    return (
      <Modal open={isOpen} closeModal={() => setIsOpen(false)} isPadding>
        <div style={{ display: "flex", flexDirection: "column" }}></div>
        <LoadingMessage>Loading...</LoadingMessage>
        <SearchContainer>
          <SearchInput
            type="text"
            value={search}
            name="search"
            placeholder="Search for GIFs"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </SearchContainer>
        <div />
      </Modal>
    );
  } else
    return (
      <Modal open={isOpen} closeModal={() => setIsOpen(false)} isPadding>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SearchContainer>
            <SearchInput
              type="text"
              value={search}
              name="search"
              placeholder="Search for GIFs"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <Button
              type="button"
              onClick={() => setAutoPlay(!autoPlay)}
              style={{ fontSize: "0.8rem" }}
              disabled={loading}
            >
              Auto play gifs
            </Button>
          </SearchContainer>
          <Gifs
            modalGifs={modalGifs}
            handleClick={(gif: any) => {
              setGif(gif.images.fixed_height.mp4);
              setIsOpen(false);
            }}
            autoPlay={autoPlay}
          />
        </div>
      </Modal>
    );
};

export default GifPicker;
