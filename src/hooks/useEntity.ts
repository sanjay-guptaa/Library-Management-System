import { useState, useEffect, useCallback } from 'react';

interface Service<T> {
  getAll: (...args: any[]) => Promise<T[]>;
  getById: (...args: any[]) => Promise<T | undefined>;
}

export function useEntity<T>(service: Service<T>, id?: string | number) {
  const [data, setData] = useState<T | T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let result;
      if (id) {
        result = await service.getById(id);
      } else {
        result = await service.getAll();
      }
      setData(result ?? null);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id, service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
