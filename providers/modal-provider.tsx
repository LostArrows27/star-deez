import { AlertError } from "@/components/ui/alert";
import { useEffect, useState } from "react";

export default function ModalProviders() {
  // Prevent modal open when SSR
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AlertError />
    </>
  );
}
