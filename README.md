# PA Caregiver Navigator (Prototype)

A small, static prototype for exploring caregiver supports in Pennsylvania.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Test on another device in the same network

1. Find your local IP address:

```bash
ipconfig getifaddr en0
```

2. On another device, open:

```
http://<YOUR_IP>:8000
```

## Privacy statement

- No accounts.
- No backend storage by default.
- Optional feedback is stored only in the browser (localStorage).
- Clear session removes local data from this browser.

## Notes for implementers

- `resources.json` is sample data only. Philadelphia and Allegheny have example entries, and all other counties fall back to statewide entries.
- If the State deploys a backend, update `app.js` to fetch from a secure API endpoint.
- Replace `pa-logo-placeholder.png` with an approved official logo asset.
