# RSVP → Google Sheet Setup

The RSVP form on the site posts to a small Google Apps Script "web app"
that's bound to your spreadsheet. No separate backend or hosting needed —
it all runs on Google's side, for free.

Your spreadsheet:
https://docs.google.com/spreadsheets/d/1EgWlKaMmhZIM-JMIFdKBBB2k3vbGWRjc2y90yZ9vy-Y/edit

## 1. Open the Apps Script editor

In that spreadsheet: **Extensions → Apps Script**.

## 2. Paste in the script

Delete whatever's in the default `Code.gs` file and paste in the contents
of [`Code.gs`](./Code.gs) from this folder. Save the project (e.g. name it
"RSVP Handler").

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Next to "Select type", click the gear icon and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to authorize the script — this is expected since
   it's your own script accessing your own sheet. If you see an
   "unverified app" warning, click **Advanced → Go to project (unsafe)**,
   then allow access.
6. Copy the **Web app URL** shown (it ends in `/exec`).

## 4. Connect the site to it

In the project root, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and set:

```
VITE_RSVP_SCRIPT_URL=PASTE_YOUR_WEB_APP_URL_HERE
```

Rebuild (`npm run build`) or restart the dev server (`npm run dev`) so Vite
picks up the new environment variable.

## 5. Test it

Submit the RSVP form on the site. A new tab named **RSVP** will appear in
your spreadsheet (created automatically on the first submission) with
columns: Timestamp, Name, Attending, Guests, Message. Your existing sheet
tabs are left untouched.

## Updating the script later

If you edit `Code.gs` in the Apps Script editor after your first deploy,
you need to publish a new version for the change to take effect:
**Deploy → Manage deployments → Edit (pencil icon) → Version: New version
→ Deploy**. The web app URL stays the same, so you won't need to update
`.env` again.

## Notes / limitations

- Because Apps Script web apps don't return CORS headers, the site submits
  with `fetch(..., { mode: "no-cors" })`. That means the browser can't read
  the response — the form shows "Thank you" once the request has been
  sent, without being able to confirm the row was written. If something
  looks off, check **Executions** in the Apps Script editor for errors.
- Anyone with the web app URL can technically POST rows to the sheet. For a
  wedding RSVP this is normally an acceptable trade-off, but don't publish
  the URL anywhere public beyond your own site's build.
