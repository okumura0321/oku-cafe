export const useOrder = () => {
  const submitOrder = async (label: string) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [label] }),
    });
    const data = await res.json();
    const stored = localStorage.getItem("myOrderIds");
    const ids = stored ? JSON.parse(stored) : [];
    ids.push(data.id);
    localStorage.setItem("myOrderIds", JSON.stringify(ids));
    alert("注文を受け付けました！");
  };

  return { submitOrder };
};
