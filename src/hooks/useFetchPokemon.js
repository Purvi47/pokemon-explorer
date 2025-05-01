import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchPokemon = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        if (!cancel) setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancel) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancel = true;
    };
  }, [url]);

  return { data, loading };
};

export default useFetchPokemon;
