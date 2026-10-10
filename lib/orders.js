export const ORDER_STATUSES = [
  { key: "pending", label: "Pending — awaiting WhatsApp confirmation" },
  { key: "processing", label: "Confirmed — preparing" },
  { key: "shipped", label: "Shipped" },
  { key: "out", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

export const statusLabel = (key) => ORDER_STATUSES.find((s) => s.key === key)?.label.split(" — ")[0] || key;

// Stock is taken out of inventory while an order is in one of these states.
export const holdsStock = (status) => ["processing", "shipped", "out", "delivered"].includes(status);
