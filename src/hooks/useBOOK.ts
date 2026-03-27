import { useState, useEffect } from "react";
import { BOOK } from "../types/BOOK";
import { bOOKService } from "../services/bOOKService";

export function useBOOK(id?: string) {
  const [items, setItems] = useState<BOOK[]>([]);
  const [item, setItem] = useState<BOOK | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id) {
      setItem(bOOKService.getById(id));
    } else {
      setItems(bOOKService.getAll());
    }
    setLoading(false);
  }, [id]);

  return { items, item, loading };
}
