# Live payment proof for Remote Income System.
# Run ONLY after Paystack approves pk_live_ and you paste the PUBLIC key below.
# Does a REAL ₦50 charge in live mode to prove money reaches your Access Bank.
# The SECRET key is NEVER pasted here -- it goes in Netlify env vars via the dashboard.

PUBLIC_KEY = "pk_live_PASTE_HERE"   # <- you paste your real pk_live_ here
AMOUNT_KOBO = 5000                   # ₦50 test charge
EMAIL = "enochchibuchinkwo@gmail.com"

import json, urllib.request, urllib.error, sys

if "PASTE_HERE" in PUBLIC_KEY:
    print("ERROR: paste your real pk_live_ key into PUBLIC_KEY first.")
    sys.exit(1)

# Initialize a real transaction with Paystack (live mode)
init = {
    "amount": AMOUNT_KOBO,
    "email": EMAIL,
    "currency": "NGN",
    "metadata": {"product": "Remote Income System", "test": True},
}
req = urllib.request.Request(
    "https://api.paystack.co/transaction/initialize",
    data=json.dumps(init).encode(),
    method="POST",
    headers={"Authorization": "Bearer " + PUBLIC_KEY,
             "Content-Type": "application/json"})
try:
    r = urllib.request.urlopen(req, timeout=30)
    res = json.loads(r.read())
    if res.get("status"):
        print("LIVE INIT OK")
        print("Authorization URL (open in browser to complete the ₦50 test charge):")
        print(res["data"]["authorization_url"])
        print("reference:", res["data"]["reference"])
        print(">> After you pay ₦50, check your Access Bank. Then refund it from the Paystack dashboard.")
    else:
        print("INIT FAILED:", res)
except urllib.error.HTTPError as e:
    print("HTTP ERR", e.code, e.read().decode())
