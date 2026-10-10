import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllProducts } from "@/lib/catalog-server";
import { supabaseConfigured } from "@/lib/supabase";
import { updateStock } from "../actions";
import { Notice, SetupRequired } from "../ui";

export default async function ProductsPage({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  if (!supabaseConfigured()) return <SetupRequired />;

  let products = [];
  let loadError = null;
  try {
    products = await getAllProducts();
  } catch (err) {
    loadError = err.message;
  }

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title">Stock & products</h1>
        <Link href="/admin/products/new" className="btn btn--solid btn--sm">
          Add product
        </Link>
      </div>
      <Notice searchParams={loadError ? { error: loadError } : params} savedText={`Saved ${params.saved}.`} />
      <p className="muted">
        A size with 0 in stock shows as sold out on the site. Stock goes down by itself when you confirm an
        order.
      </p>
      {products.map((product) => (
        <form key={product.id} action={updateStock} className="admin__card admin__product">
          <input type="hidden" name="id" value={product.id} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.images.main} alt="" className="admin__thumb" />
          <div className="admin__product-body">
            <div className="admin__head">
              <h2>{product.name}</h2>
              <Link href={`/admin/products/${product.id}`} className="textbtn">
                Edit details
              </Link>
            </div>
            <div className="admin__row">
              <div className="field">
                <label htmlFor={`${product.id}-price`}>Price (₹)</label>
                <input
                  id={`${product.id}-price`}
                  name="price"
                  type="number"
                  min="0"
                  defaultValue={product.price}
                />
              </div>
              <div className="field">
                <label htmlFor={`${product.id}-status`}>Status</label>
                <select id={`${product.id}-status`} name="status" defaultValue={product.status}>
                  <option value="available">Available</option>
                  <option value="concept">Concept (not for sale)</option>
                  <option value="hidden">Hidden from site</option>
                </select>
              </div>
            </div>
            <div className="admin__row admin__row--sizes">
              {product.sizes.map((size) => (
                <div className="field" key={size}>
                  <label htmlFor={`${product.id}-${size}`}>{size}</label>
                  <input
                    id={`${product.id}-${size}`}
                    name={`stock_${size}`}
                    type="number"
                    min="0"
                    defaultValue={Number(product.stock[size]) || 0}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn--solid">
                Save
              </button>
            </div>
          </div>
        </form>
      ))}
    </>
  );
}
