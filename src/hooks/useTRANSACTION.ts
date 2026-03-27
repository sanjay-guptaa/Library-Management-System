import { useState, useEffect } from "react";
import { TRANSACTION } from "../types/TRANSACTION";
import { tRANSACTIONService } from "../services/tRANSACTIONService";

export function useTRANSACTION(id?: string) {
  const [items, setItems] = useState<TRANSACTION[]>([]);
  const [item, setItem] = useState<TRANSACTION | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id) {
      setItem(tRANSACTIONService.getById(id));
    } else {
      setItems(tRANSACTIONService.getAll());
    }
    setLoading(false);
  }, [id]);

  return { items, item, loading };
}
