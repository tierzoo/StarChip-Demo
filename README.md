# StarChip Demo — Blast Belt Royale

Multi-device QR code prototype of the StarChip concept. One device hosts the arena, players scan cards with their phones.

## Deploy to Glitch (easiest)

1. Go to [glitch.com](https://glitch.com), sign in
2. Click **New Project** → **Import from GitHub** (or **glitch-hello-node**)
3. Replace all files with the contents of this project (drag & drop)
4. Glitch auto-installs and runs — your live URL is `https://your-project-name.glitch.me`

## How to Play

1. **Generate cards:** Go to `your-url/cards.html`, generate & print a set
2. **Host arena:** Open `your-url/arena.html` on a big screen — a room code appears
3. **Players join:** On phones, open `your-url/player.html`, enter the room code
4. **Scan StarChips:** Point phone cameras at QR codes on printed cards
5. **Battle!** Hit START on the arena screen

Players can also install the app to their phone home screen (it's a PWA).

## Local Development

```bash
npm install
npm start
# → http://localhost:3000
```

## QR Code Format

`BBR:{design}:{weapon}:{color}:{passive}:{maneuver}` — all indices 0–15.
