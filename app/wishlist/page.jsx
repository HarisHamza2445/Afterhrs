import { WishlistPage } from "@/views/WishlistPage";
import { StoreReady } from "@/lib/store";

export const metadata = { title: "Wishlist" };

export default function Page() {
  return (
    <StoreReady>
      <WishlistPage />
    </StoreReady>
  );
}
