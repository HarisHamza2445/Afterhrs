import { StoreReady } from "@/lib/store";
import { OrderPage } from "@/views/OrderPages";

export const metadata = { title: "Order" };

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <StoreReady>
      <OrderPage id={id} />
    </StoreReady>
  );
}
