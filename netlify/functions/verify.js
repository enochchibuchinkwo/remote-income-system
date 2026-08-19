// Netlify Function: server-side Paystack verification.
// Deploy with `netlify deploy --prod` after linking this folder.
// Set environment variable PAYSTACK_SECRET_KEY in the Netlify dashboard
// (Settings -> Environment variables) to your Paystack SECRET key.
// This confirms the payment actually succeeded before we unlock access,
// so a buyer can't fake a "success" by editing the browser.

exports.handler = async function (event) {
  const ref = event.queryStringParameters.reference;
  if (!ref) return { statusCode: 400, body: JSON.stringify({ status: "error", message: "missing reference" }) };

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return { statusCode: 500, body: JSON.stringify({ status: "error", message: "server misconfigured" }) };

  try {
    const resp = await fetch("https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref), {
      method: "GET",
      headers: { Authorization: "Bearer " + secret, "Content-Type": "application/json" },
    });
    const data = await resp.json();
    if (data.status && data.data && data.data.status === "success") {
      // Payment verified — grant access via secure cookie + log for email automation
      const email = data.data.customer?.email || "";
      const product = data.data.metadata?.product || "remote-income-system";
      const amount = data.data.amount / 100; // kobo to naira
      
      // Return success with access grant info for client-side redirect
      return { 
        statusCode: 200, 
        headers: {
          "Set-Cookie": `ris_access=${ref}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`
        },
        body: JSON.stringify({ 
          status: "success", 
          reference: ref,
          email: email,
          product: product,
          amount: amount,
          access_granted: true
        }) 
      };
    }
    return { statusCode: 200, body: JSON.stringify({ status: "failed" }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ status: "error", message: String(e) }) };
  }
};
