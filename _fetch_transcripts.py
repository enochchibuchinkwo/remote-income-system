import os, json, requests
from youtube_transcript_api import YouTubeTranscriptApi

ids = [
    "V8MUnG0o27w","kYPAlvnRiiI","OGyxSOcL1F0","efa728D0yWM","rgwR8qjbxRM",
    "YEGHT9rOXDI","cOE2mO0AhH4","B-uKiW9-78s","g4ImbLZAIo8","S0yC5SWtNSk",
    "sMH8WchxQR8","CerlRwYW4D0"
]
out = r"C:\Users\HP\remote-income-system\transcripts"
os.makedirs(out, exist_ok=True)
for vid in ids:
    title = ""
    try:
        r = requests.get(f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json", timeout=15)
        if r.ok:
            title = r.json().get("title","")
    except Exception:
        pass
    try:
        segs = YouTubeTranscriptApi.get_transcript(vid, languages=["en"])
        text = " ".join(s["text"] for s in segs)
        with open(os.path.join(out, vid + ".txt"), "w", encoding="utf-8") as f:
            f.write(text)
        snippet = text[:600].replace("\n", " ")
        print(f"OK|{vid}|{len(text)}|{title}\n  {snippet}\n")
    except Exception as e:
        print(f"FAIL|{vid}|{title}|{repr(e)[:200]}\n")
