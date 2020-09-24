import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Axios from "axios";
import { getSearchURL, getTreningURL } from "../utils/Urls";
import {
  GifButton,
  LoadingMessage,
  GifContainer,
  Gif,
  SearchContainer,
  SearchInput,
} from "../Style/ComponentStyles/GifPickerStyles";
interface Props {
  setGif: React.Dispatch<React.SetStateAction<string>>;
}

const GifPicker: React.FC<Props> = ({ setGif }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalGifs, setModalGifs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getTreningGifs = async () => {
      setLoading(true);
      try {
        let response;

        if (search.length === 0) {
          response = await Axios.get(getTreningURL);
          setModalGifs(response.data.data);
        } else {
          response = await Axios.get(getSearchURL(search));
          setModalGifs(response.data.data);
        }
      } catch (error) {}

      setLoading(false);
    };
    const delay = setTimeout(() => {
      getTreningGifs();
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, [search]);

  if ((!isOpen && loading) || (!isOpen && !loading)) {
    return <GifButton onClick={() => setIsOpen(true)} fontSize={28} />;
  } else if (isOpen && loading) {
    return (
      <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
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
      <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
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
          </SearchContainer>
          <GifContainer>
            {modalGifs.map((gif: any) => (
              <Gif
                src={gif.images.downsized_medium.url}
                key={gif.id}
                onClick={() => {
                  setGif(gif.images.downsized_medium.url);
                  setIsOpen(false);
                }}
              />
            ))}
          </GifContainer>
        </div>
      </Modal>
    );
};

export default GifPicker;
