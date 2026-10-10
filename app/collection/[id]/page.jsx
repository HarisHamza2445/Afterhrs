import { COLLECTIONS } from "@/lib/catalog";
import { CollectionPage } from "@/views/ShopPages";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const collection = COLLECTIONS.find((c) => c.id === id);
  return { title: collection ? collection.name : "Collection" };
}

export default async function Page({ params }) {
  const { id } = await params;
  return <CollectionPage id={id} />;
}
