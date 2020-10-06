import Axios from "axios";
import { useState, useEffect } from "react";
import { getTrendingURL, getSearchURL } from "../Urls";

export default function (open: boolean, autoPlay: boolean) {
  const [loading, setLoading] = useState(false);
  const [modalGifs, setModalGifs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getTreningGifs = async () => {
      if (!open) return;
      setLoading(true);
      try {
        let response;

        if (search.length === 0) {
          response = await Axios.get(getTrendingURL);
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
  }, [search, open, autoPlay]);

  return { loading, modalGifs, search, setSearch };
}
