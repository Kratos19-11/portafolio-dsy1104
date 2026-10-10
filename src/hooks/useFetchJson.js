import { useEffect, useState } from 'react';
import { fetchJson } from '../services/dataService';

/**
 * Hook que carga un JSON y expone su estado.
 * Devuelve: { data, loading, error }
 */
function useFetchJson(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchJson(path)
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}

export default useFetchJson;