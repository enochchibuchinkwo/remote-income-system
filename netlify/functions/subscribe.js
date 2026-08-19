// Netlify Function: non-blocking email capture for retention flows.
// Stores leads in a Netlify Blob store (free, server-side, no 3rd party).
// Fire-and-forget from the browser via navigator.sendBeacon — never blocks checkout.

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  let email = "";
  let status = "lead";
  try {
    const body = JSON.parse(event.body || "{}");
    email = (body.email || "").trim().toLowerCase();
    status = body.status || "lead";
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false }) };
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false }) };
  }

  // Persist. Prefer Netlify Blobs; fall back to function logs so nothing leaks.
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("ris_subscribers");
    const prev = await store.get(email).catch(() => null);
    const rec = prev ? JSON.parse(prev) : { email, first_seen: Date.now(), events: [] };
    rec.events.push({ status, ts: Date.now() });
    rec.last_status = status;
    await store.set(email, JSON.stringify(rec));
  } catch (e) {
    console.log("SUBSCRIBER", JSON.stringify({ email, status, ts: Date.now() }));
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
