import { getCatalog } from "@/lib/catalog-server";
import { ProductPage } from "@/views/ProductPage";

export async function generateStaticParams() {
  return (await getCatalog()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = (await getCatalog()).find((p) => p.id === id);
  if (!product) return { title: "Product" };
  return {
    title: `${product.fullName} — ${product.colours[0].name}`,
    description: product.description,
    openGraph: { images: [product.images.main] },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductPage id={id} />;
}
