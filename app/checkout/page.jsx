import { CheckoutPage } from "@/views/CheckoutPage";
import { StoreReady } from "@/lib/store";

export const metadata = { title: "Checkout" };

export default function Page() {
  return (
    <StoreReady>
      <CheckoutPage />
    </StoreReady>
  );
}
