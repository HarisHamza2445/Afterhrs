import { BagPage } from "@/views/BagPage";
import { StoreReady } from "@/lib/store";

export const metadata = { title: "Shopping bag" };

export default function Page() {
  return (
    <StoreReady>
      <BagPage />
    </StoreReady>
  );
}
