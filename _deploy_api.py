import os, json, time, urllib.request, urllib.error

TOKEN = "nfp_JH8TME9WVw8S4JJEa7gTyof7gyYKxiFK950e"
ROOT = "C:\\Users\\HP\\remote-income-system"
API = "https://api.netlify.com/api/v1"
H = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}

def api(method, path, body=None, headers=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(f"{API}{path}", data=data, headers=headers or H, method=method)
    try:
        r = urllib.request.urlopen(req, timeout=30); return r.read().decode()
    except urllib.error.HTTPError as e:
        return f"HTTP {e.code}: {e.read().decode()[:400]}"

print("== create site ==")
res = api("POST", "/sites", {"name": f"remote-income-system-{int(time.time())}"})
print(res[:120])
sid = json.loads(res)["id"]

SKIP = {"_test_key.cjs","_validate.cjs","_validate_price.cjs","_deploy.py","_livepay_test.py","ris-deploy.zip","DEPLOY-NETLIFY-DROP.md","_deploy_api.py"}
files = []
for dp,_,fns in os.walk(ROOT):
    for fn in fns:
        full=os.path.join(dp,fn); rel=os.path.relpath(full,ROOT).replace("\\","/")
        if os.path.basename(full) in SKIP or rel.startswith(".git"): continue
        files.append((rel,full))

print("== create deploy ==")
dres = api("POST", f"/sites/{sid}/deploys", {"draft": False})
did = json.loads(dres)["id"]
print("deploy id:", did)

print("== set deploy ready ==")
r = api("PATCH", f"/deploys/{did}", {"state":"ready"})
print(r[:150])

print("== upload files ==")
FH = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/octet-stream"}
ok=0; fail=0
for rel, full in files:
    with open(full,"rb") as f: data=f.read()
    url = f"{API}/deploys/{did}/files/{rel}"
    req = urllib.request.Request(url, data=data, headers=FH, method="PUT")
    try:
        urllib.request.urlopen(req, timeout=30); ok+=1
    except urllib.error.HTTPError as e:
        print("  FAIL", rel, e.code, e.read().decode()[:120]); fail+=1
print(f"ok={ok} fail={fail}")

print("== publish (restore) ==")
print(api("POST", f"/deploys/{did}/restore", {})[:200])

print("== URLs ==")
s = json.loads(api("GET", f"/sites/{sid}"))
print("HTTP :", s.get("url"))
print("HTTPS:", s.get("ssl_url"))
print("SITE_ID:", sid)
