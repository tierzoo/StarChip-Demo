const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;

// ─── HTTP Server (serves static files from /public) ───
const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]; // strip query params
  let filePath = urlPath === '/' ? '/index.html' : urlPath;
  filePath = path.join(__dirname, 'public', filePath);
  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
    '.webmanifest': 'application/manifest+json',
  };
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const headers = { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' };
    // Prevent caching for HTML and JS so updates take effect immediately
    if (ext === '.html' || ext === '.js') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    }
    res.writeHead(200, headers);
    res.end(data);
  });
});

// ─── WebSocket Relay ───
const wss = new WebSocketServer({ server });

const rooms = {}; // code -> { arena: ws, players: { id: { ws, name, ships: [] } } }

function genCode() {
  const words = ['NOVA','BOLT','FANG','VOID','STAR','GLOW','RUSH','BLAZE','FURY','WARP',
    'FLUX','NEON','EDGE','CORE','ZERO','APEX','VIBE','HAZE','RIFT','COMET'];
  let code;
  do { code = words[Math.floor(Math.random() * words.length)]; } while (rooms[code]);
  return code;
}

function broadcast(room, msg, exclude) {
  const data = JSON.stringify(msg);
  if (room.arena && room.arena !== exclude) room.arena.send(data);
  for (const p of Object.values(room.players)) {
    if (p.ws && p.ws !== exclude) p.ws.send(data);
  }
}

let nextPlayerId = 1;

wss.on('connection', (ws) => {
  let myRoom = null;
  let myId = null;
  let isArena = false;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {

      case 'create_room': {
        const code = genCode();
        rooms[code] = { arena: ws, players: {} };
        myRoom = rooms[code];
        isArena = true;
        ws.send(JSON.stringify({ type: 'room_created', code }));
        console.log(`Room ${code} created`);
        break;
      }

      case 'join_room': {
        const room = rooms[msg.code?.toUpperCase()];
        if (!room) {
          ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
          return;
        }
        myId = 'p' + (nextPlayerId++);
        myRoom = room;
        room.players[myId] = { ws, name: msg.name || 'Player', ships: [] };
        ws.send(JSON.stringify({ type: 'joined', id: myId, code: msg.code.toUpperCase() }));
        if (room.arena) {
          room.arena.send(JSON.stringify({
            type: 'player_joined', id: myId, name: msg.name || 'Player'
          }));
        }
        console.log(`${msg.name || 'Player'} (${myId}) joined ${msg.code.toUpperCase()}`);
        break;
      }

      case 'scan_ship': {
        if (!myRoom || !myId) return;
        const player = myRoom.players[myId];
        if (!player) return;
        player.ships.push(msg.ship);
        if (myRoom.arena) {
          myRoom.arena.send(JSON.stringify({
            type: 'ship_scanned', playerId: myId,
            playerName: player.name, ship: msg.ship
          }));
        }
        ws.send(JSON.stringify({ type: 'scan_confirmed', ship: msg.ship }));
        console.log(`Ship scanned by ${myId}:`, msg.ship);
        break;
      }

      case 'remove_ship': {
        if (!myRoom || !myId) return;
        const pl = myRoom.players[myId];
        if (!pl) return;
        const idx = msg.index;
        if (idx >= 0 && idx < pl.ships.length) {
          pl.ships.splice(idx, 1);
          if (myRoom.arena) {
            myRoom.arena.send(JSON.stringify({
              type: 'ship_removed', playerId: myId, index: idx
            }));
          }
        }
        break;
      }

      case 'start_match': {
        if (!myRoom || !isArena) return;
        broadcast(myRoom, { type: 'match_started' });
        console.log('Match started!');
        break;
      }

      case 'match_ended': {
        if (!myRoom || !isArena) return;
        broadcast(myRoom, { type: 'match_ended', results: msg.results }, ws);
        break;
      }
    }
  });

  ws.on('close', () => {
    if (!myRoom) return;
    if (isArena) {
      // Arena disconnected — notify players, clean up room
      broadcast(myRoom, { type: 'room_closed' }, ws);
      // Find and delete the room
      for (const [code, room] of Object.entries(rooms)) {
        if (room === myRoom) { delete rooms[code]; console.log(`Room ${code} closed`); break; }
      }
    } else if (myId) {
      // Player disconnected
      delete myRoom.players[myId];
      if (myRoom.arena) {
        myRoom.arena.send(JSON.stringify({ type: 'player_left', id: myId }));
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n  ⚡ StarChip Demo Server running on port ${PORT}`);
  console.log(`  🖥️  Arena:  http://localhost:${PORT}/arena.html`);
  console.log(`  📱 Player: http://localhost:${PORT}/player.html\n`);
});
