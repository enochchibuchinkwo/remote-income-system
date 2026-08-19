import os, zipfile, json, urllib.request, urllib.error, time

TOKEN = "nfp_EdSp4oWRKVxmFKu5NT71nZMsNJ1pM5oKe326"
SITE_DIR = os.getcwd()
ZIP_PATH = os.path.join(SITE_DIR, "ris-deploy.zip")
API = "https://api.netlify.com/api/v1"
SITE_NAME = "remote-income-system-ris"

def api(path, data=None, method='GET', binary=False):
    url = API + path
    h = {"Authorization": "Bearer " + TOKEN}
    if binary:
        req = urllib.request.Request(url, data=data, method=method, headers=h)
    else:
        raw = json.dumps(data).encode() if data else None
        req = urllib.request.Request(url, data=raw, method=method, headers=h)
        if data:
            req.add_header("Content-Type", "application/json")
    try:
        r = urllib.request.urlopen(req, timeout=40)
        return r.read().decode(), r.status
    except urllib.error.HTTPError as e:
        return e.read().decode(), e.code

# 1. zip the site (exclude my _*.cjs test scripts)
z = zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED)
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.startswith('_'):
            continue
        p = os.path.join(root, f)
        z.write(p, p)
z.close()
print("zipped ->", ZIP_PATH, os.path.getsize(ZIP_PATH), "bytes")

# 2. find existing site by name
body, code = api("/sites")
sites = json.loads(body)
site = next((s for s in sites if s.get("name") == SITE_NAME), None)
if not site:
    print("site not found; creating...")
    body, code = api("/sites", {"name": SITE_NAME}, method='POST')
    site = json.loads(body)
site_id = site["id"]
print("site_id:", site_id)
print("site url:", site.get("url"))

# 3. deploy the zip
with open(ZIP_PATH, 'rb') as fh:
    data = fh.read()
body, code = api(f"/sites/{site_id}/deploys", data=data, method='POST', binary=True)
print("deploy create:", code)
if code >= 400:
    print(body)
    raise SystemExit(1)
dep = json.loads(body)
deploy_id = dep.get("id")
print("deploy_id:", deploy_id, "state:", dep.get("state"))

# 4. poll until ready
for i in range(30):
    b, c = api(f"/sites/{site_id}/deploys/{deploy_id}")
    d = json.loads(b)
    st = d.get("state")
    print(f"poll {i}: state={st}")
    if st in ("ready", "uploaded", "prepared"):
        break
    if st == "error":
        print("DEPLOY ERROR:", b)
        raise SystemExit(1)
    time.sleep(3)

# 5. report live URL
b, c = api(f"/sites/{site_id}")
s = json.loads(b)
print("=== LIVE URL ===")
print("URL:", s.get("url"))
print("SSL:", s.get("ssl_url"))
print("Admin:", s.get("admin_url"))
