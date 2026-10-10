import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { COLLECTIONS, SIZES } from "@/lib/catalog";
import { getAllProducts } from "@/lib/catalog-server";
import { supabaseConfigured } from "@/lib/supabase";
import { saveProduct } from "../../actions";
import { Notice, SetupRequired } from "../../ui";

function Text({ name, label, value, hint, ...rest }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} defaultValue={value ?? ""} {...rest} />
      {hint && <p className="field__hint">{hint}</p>}
    </div>
  );
}

export default async function ProductFormPage({ params, searchParams }) {
  await requireAdmin();
  const { id } = await params;
  if (!supabaseConfigured()) return <SetupRequired />;

  const isNew = id === "new";
  const product = isNew ? null : (await getAllProducts()).find((p) => p.id === id);
  if (!isNew && !product) notFound();
  const colour = product?.colours[0];

  return (
    <>
      <p>
        <Link href="/admin/products" className="textbtn">
          ← Stock & products
        </Link>
      </p>
      <h1 className="admin__title">{isNew ? "Add product" : product.name}</h1>
      <Notice searchParams={await searchParams} />
      <form action={saveProduct} className="admin__card admin__form">
        {!isNew && <input type="hidden" name="id" value={product.id} />}
        <div className="admin__row">
          <Text name="name" label="Name" value={product?.name} required />
          <Text name="full_name" label="Full name" value={product?.fullName} hint="Used as the page title." />
        </div>
        <div className="admin__row">
          <Text name="price" label="Price (₹)" type="number" min="0" value={product?.price ?? 0} required />
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={product?.status || "available"}>
              <option value="available">Available</option>
              <option value="concept">Concept (not for sale)</option>
              <option value="hidden">Hidden from site</option>
            </select>
          </div>
        </div>
        <div className="admin__row">
          <Text name="colour_name" label="Colour" value={colour?.name || "Black"} />
          <Text name="colour_hex" label="Colour swatch" type="color" value={colour?.hex || "#1a1a1a"} />
          <div className="field">
            <label htmlFor="tone">Tee is</label>
            <select id="tone" name="tone" defaultValue={product?.tone || "dark"}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <fieldset className="admin__checks">
          <legend>Collections</legend>
          {COLLECTIONS.map((c) => (
            <label className="check" key={c.id}>
              <input
                type="checkbox"
                name="collections"
                value={c.id}
                defaultChecked={product ? product.collections.includes(c.id) : c.live}
              />{" "}
              {c.name}
            </label>
          ))}
        </fieldset>
        {isNew && (
          <div className="admin__row admin__row--sizes">
            {SIZES.map((size) => (
              <Text
                key={size}
                name={`stock_${size}`}
                label={`Stock ${size}`}
                type="number"
                min="0"
                value={0}
              />
            ))}
          </div>
        )}
        <Text name="short" label="One-line summary" value={product?.short} />
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} defaultValue={product?.description || ""} />
        </div>
        <div className="admin__row">
          <Text name="design" label="Design" value={product?.design} />
          <Text name="fit" label="Fit" value={product?.fit} />
        </div>
        <div className="admin__row">
          <Text name="fabric" label="Fabric" value={product?.fabric} />
          <Text name="gsm" label="GSM" value={product?.gsm} />
          <Text name="print_method" label="Print method" value={product?.printMethod} />
        </div>
        <Text
          name="tags"
          label="Search tags"
          value={product?.tags.join(", ")}
          hint="Comma separated, for the site search."
        />
        <div className="field">
          <label htmlFor="photos">{isNew ? "Photos" : "Replace photos"}</label>
          <input id="photos" name="photos" type="file" accept="image/*" multiple required={isNew} />
          <p className="field__hint">
            The first photo is the main image and the second shows on hover.
            {isNew ? "" : " Leave empty to keep the current photos."} Up to 12 MB in total.
          </p>
        </div>
        <button type="submit" className="btn btn--solid">
          {isNew ? "Add product" : "Save changes"}
        </button>
      </form>
    </>
  );
}
