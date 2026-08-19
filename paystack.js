// Paystack inline integration for The Remote Income System
// ---------------------------------------------------------
// 1. Replace PAYSTACK_PUBLIC_KEY with YOUR live public key from
//    your Paystack dashboard (Settings -> API Keys).
// 2. The amount is in KOBO for NGN (30,000 NGN = 3,000,000 kobo).
//    To accept USD, enable "USD" on your Paystack dashboard and set
//    currency: 'USD' + amount in cents. Payouts still settle to your
//    Naira account.
// 3. After payment, we call /api/verify?reference=... (a serverless function)
//    to confirm the charge, then unlock the member area (product.html).
//    Without server-side verification, anyone could fake a success.

const PAYSTACK_PUBLIC_KEY = "pk_live_3186c9b8a4aaeb7f69e23b5abd0c0d8fd0e52b9d";
const AMOUNT_NGN_KOBO = 3000000; // ₦30,000

// Which product is this page selling? Read from the form's data-product attr.
function currentProduct() {
  const f = document.getElementById("paystack-form");
  return (f && f.getAttribute("data-product")) || "remote-income-system";
}

// Non-blocking lead capture (for retention flows). Never blocks checkout.
function captureLead(email, product) {
  try {
    const payload = JSON.stringify({ email: email, status: "lead", product: product || currentProduct() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/subscribe", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/subscribe", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
  } catch (e) { /* silent: must never break checkout */ }
}

const form = document.getElementById("paystack-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) return;
  const product = currentProduct();
  captureLead(email, product); // fire-and-forget; does not delay the popup

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: AMOUNT_NGN_KOBO,
    currency: "NGN",
    ref: "RIS-" + product + "-" + Date.now() + "-" + Math.floor(Math.random() * 1e6),
    metadata: { product: product, email: email },
    callback: function (response) {
      // Verify server-side, then unlock.
      verifyAndUnlock(response.reference, email, product);
    },
    onClose: function () {
      alert("Payment window closed. Your card was not charged.");
    },
  });
  handler.openIframe();
});

async function verifyAndUnlock(reference, email, product) {
  try {
    const res = await fetch("/api/verify?reference=" + encodeURIComponent(reference));
    const data = await res.json();
    if (data.status === "success" && data.access_granted) {
      // Store access grant with product info
      localStorage.setItem("ris_access", reference);
      localStorage.setItem("ris_product", product);
      localStorage.setItem("ris_email", email || data.email || "");
      // Redirect to the right member area
      const dest = product === "freelance-gig-machine" ? "freelance-member.html" : "product.html";
      window.location.href = dest + "?ref=" + encodeURIComponent(reference);
    } else {
      alert("Payment verification failed. Email enochchibuchinkwo@gmail.com with your reference: " + reference);
    }
  } catch (err) {
    alert("Could not verify payment. Email support with reference: " + reference);
  }
}
