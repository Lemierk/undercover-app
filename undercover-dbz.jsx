import { useState, useEffect } from "react";

const DBZ_PAIRS = [
  { civil: "Kamehameha", undercover: "Galick Gun" },
  { civil: "Super Saiyan", undercover: "Super Saiyan 2" },
  { civil: "Goku", undercover: "Vegeta" },
  { civil: "Capsule Corp", undercover: "Red Ribbon" },
  { civil: "Namek", undercover: "Vegeta (planète)" },
  { civil: "Dragon Ball", undercover: "Dragon Star" },
  { civil: "Kaioken", undercover: "Zenkai" },
  { civil: "Freezer", undercover: "Cell" },
  { civil: "Buu", undercover: "Janemba" },
  { civil: "Bulma", undercover: "Chi-Chi" },
  { civil: "Piccolo", undercover: "Kami" },
  { civil: "Shenron", undercover: "Porunga" },
  { civil: "Oeuf de Saiyajin", undercover: "Oeuf de dinosaure" },
  { civil: "Senzu", undercover: "Elixir" },
  { civil: "Tortue Géniale", undercover: "Karin" },
  { civil: "Tour Karin", undercover: "Palais de Dieu" },
  { civil: "Salle du temps", undercover: "Chambre de gravité" },
  { civil: "Gohan", undercover: "Goten" },
  { civil: "Trunks", undercover: "Gotenks" },
  { civil: "Attaque finale", undercover: "Explosion finale" },
];

const CHARACTERS = ["Goku","Vegeta","Gohan","Piccolo","Trunks","Krilin","Yamcha","Ten Shin Han","Bulma","C-18","Freezer","Cell","Buu","Broly","Bardock"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DBZ_CHARS = ["🔥","⚡","💥","✨","🌟","👊","💢"];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [playerCount, setPlayerCount] = useState(5);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhite, setMrWhite] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentReveal, setCurrentReveal] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({length: 12}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: DBZ_CHARS[Math.floor(Math.random() * DBZ_CHARS.length)],
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      size: 10 + Math.random() * 20,
    }));
    setParticles(p);
  }, [screen]);

  function startGame() {
    const pair = DBZ_PAIRS[Math.floor(Math.random() * DBZ_PAIRS.length)];
    const shuffledChars = shuffle(CHARACTERS).slice(0, playerCount);
    const roles = [];
    const indices = shuffle(Array.from({length: playerCount}, (_, i) => i));
    
    let undercoverIndices = indices.slice(0, undercoverCount);
    let mrWhiteIndex = mrWhite ? indices[undercoverCount] : -1;

    for (let i = 0; i < playerCount; i++) {
      if (undercoverIndices.includes(i)) {
        roles.push({ name: shuffledChars[i], role: "undercover", word: pair.undercover });
      } else if (i === mrWhiteIndex) {
        roles.push({ name: shuffledChars[i], role: "mrwhite", word: "???" });
      } else {
        roles.push({ name: shuffledChars[i], role: "civil", word: pair.civil });
      }
    }

    setPlayers(roles);
    setCurrentReveal(0);
    setShowWord(false);
    setGameStarted(true);
    setScreen("reveal");
  }

  const styles = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a0505 50%, #0d0d2e 100%)",
      fontFamily: "'Bangers', 'Impact', cursive",
      color: "#fff",
      overflowX: "hidden",
      position: "relative",
    },
    particle: (p) => ({
      position: "fixed",
      left: `${p.x}%`,
      top: `${p.y}%`,
      fontSize: `${p.size}px`,
      opacity: 0.15,
      animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
      pointerEvents: "none",
      zIndex: 0,
    }),
    container: {
      position: "relative",
      zIndex: 1,
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@500;700&display=swap');
        
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          to { transform: translateY(-30px) rotate(15deg); opacity: 0.25; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px #f5a623, 0 0 40px #f5a623; }
          50% { box-shadow: 0 0 40px #ff6b00, 0 0 80px #ff6b00; }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #f5a623, 0 0 20px #ff6b00; }
          50% { text-shadow: 0 0 20px #ffdd00, 0 0 40px #f5a623, 0 0 60px #ff6b00; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .btn-primary {
          background: linear-gradient(135deg, #f5a623, #ff6b00);
          color: #0a0a1a;
          border: none;
          padding: 16px 32px;
          font-size: 22px;
          font-family: 'Bangers', cursive;
          letter-spacing: 2px;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          animation: pulse 2s ease-in-out infinite;
          transition: transform 0.1s;
          text-transform: uppercase;
        }
        .btn-primary:active { transform: scale(0.97); }
        .btn-secondary {
          background: transparent;
          color: #f5a623;
          border: 2px solid #f5a623;
          padding: 12px 24px;
          font-size: 18px;
          font-family: 'Bangers', cursive;
          letter-spacing: 2px;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        .btn-secondary:hover { background: rgba(245,166,35,0.1); }
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(245,166,35,0.2);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          animation: slideUp 0.4s ease forwards;
        }
        .counter-btn {
          background: rgba(245,166,35,0.15);
          border: 1px solid rgba(245,166,35,0.4);
          color: #f5a623;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          font-size: 24px;
          cursor: pointer;
          font-family: 'Bangers', cursive;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .counter-btn:active { transform: scale(0.9); background: rgba(245,166,35,0.3); }
        .role-badge-civil {
          background: linear-gradient(135deg, #1a4a1a, #2d7a2d);
          border: 2px solid #4caf50;
          color: #a5d6a7;
        }
        .role-badge-undercover {
          background: linear-gradient(135deg, #4a0000, #8b0000);
          border: 2px solid #f44336;
          color: #ffcdd2;
          animation: shake 0.5s ease;
        }
        .role-badge-mrwhite {
          background: linear-gradient(135deg, #1a1a4a, #2d2d8b);
          border: 2px solid #9c27b0;
          color: #e1bee7;
        }
        .word-reveal {
          animation: zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {particles.map(p => (
        <div key={p.id} style={styles.particle(p)}>{p.char}</div>
      ))}

      <div style={styles.container}>
        {screen === "home" && <HomeScreen onStart={() => setScreen("setup")} />}
        {screen === "setup" && (
          <SetupScreen
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            undercoverCount={undercoverCount}
            setUndercoverCount={setUndercoverCount}
            mrWhite={mrWhite}
            setMrWhite={setMrWhite}
            onStart={startGame}
            onBack={() => setScreen("home")}
          />
        )}
        {screen === "reveal" && (
          <RevealScreen
            players={players}
            currentReveal={currentReveal}
            setCurrentReveal={setCurrentReveal}
            showWord={showWord}
            setShowWord={setShowWord}
            onDone={() => setScreen("play")}
          />
        )}
        {screen === "play" && (
          <PlayScreen
            players={players}
            onRestart={() => setScreen("home")}
            onNewGame={startGame}
          />
        )}
      </div>
    </div>
  );
}

function HomeScreen({ onStart }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "24px", gap: 32 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 8 }}>🐉</div>
        <h1 style={{
          fontSize: 64,
          letterSpacing: 4,
          margin: 0,
          lineHeight: 1,
          background: "linear-gradient(135deg, #f5a623, #ffdd00, #ff6b00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "glow 2s ease-in-out infinite",
          filter: "drop-shadow(0 0 20px rgba(245,166,35,0.5))",
        }}>
          UNDER<br/>COVER
        </h1>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, color: "#aaa", letterSpacing: 3, marginTop: 8, textTransform: "uppercase" }}>
          Dragon Ball Z Edition
        </p>
      </div>

      <div className="card" style={{ width: "100%", textAlign: "center" }}>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, color: "#ccc", lineHeight: 1.6, margin: "0 0 16px" }}>
          Chaque joueur reçoit un mot secret.<br/>
          Les <span style={{ color: "#4caf50" }}>civils</span> ont le même mot.<br/>
          L'<span style={{ color: "#f44336" }}>undercover</span> a un mot similaire.<br/>
          <span style={{ color: "#9c27b0" }}>Mr. White</span> ne sait rien !<br/>
          Qui sera éliminé ?
        </p>
      </div>

      <div style={{ width: "100%" }}>
        <button className="btn-primary" onClick={onStart}>
          ⚡ COMMENCER ⚡
        </button>
      </div>
    </div>
  );
}

function SetupScreen({ playerCount, setPlayerCount, undercoverCount, setUndercoverCount, mrWhite, setMrWhite, onStart, onBack }) {
  const maxUndercover = Math.floor((playerCount - (mrWhite ? 1 : 0)) / 2);

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 48 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <h2 style={{ fontSize: 40, margin: 0, color: "#f5a623", letterSpacing: 3 }}>CONFIGURATION</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "4px 0 0", letterSpacing: 2, fontSize: 13, textTransform: "uppercase" }}>Prépare ta partie</p>
      </div>

      <div className="card">
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#f5a623", fontSize: 13, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>👥 Nombre de joueurs</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="counter-btn" onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: "#ffdd00" }}>{playerCount}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>joueurs</div>
          </div>
          <button className="counter-btn" onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}>+</button>
        </div>
      </div>

      <div className="card">
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#f44336", fontSize: 13, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>🕵️ Nombre d'undercovers</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="counter-btn" onClick={() => setUndercoverCount(Math.max(1, undercoverCount - 1))}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: "#f44336" }}>{undercoverCount}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>undercover(s)</div>
          </div>
          <button className="counter-btn" onClick={() => setUndercoverCount(Math.min(maxUndercover, undercoverCount + 1))}>+</button>
        </div>
      </div>

      <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🤷 Mr. White</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 13 }}>Un joueur sans aucun mot</div>
        </div>
        <div
          onClick={() => setMrWhite(!mrWhite)}
          style={{
            width: 56,
            height: 30,
            borderRadius: 15,
            background: mrWhite ? "linear-gradient(135deg, #7b1fa2, #9c27b0)" : "rgba(255,255,255,0.1)",
            border: mrWhite ? "1px solid #ce93d8" : "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s",
          }}
        >
          <div style={{
            position: "absolute",
            top: 3,
            left: mrWhite ? 28 : 3,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: mrWhite ? "#e1bee7" : "#666",
            transition: "all 0.3s",
          }} />
        </div>
      </div>

      <div style={{ background: "rgba(245,166,35,0.05)", border: "1px solid rgba(245,166,35,0.1)", borderRadius: 12, padding: "12px 16px", fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 13, textAlign: "center", letterSpacing: 1 }}>
        {playerCount} joueurs • {undercoverCount} undercover{undercoverCount > 1 ? "s" : ""} • {playerCount - undercoverCount - (mrWhite ? 1 : 0)} civils{mrWhite ? " • 1 Mr. White" : ""}
      </div>

      <button className="btn-primary" onClick={onStart}>
        🔥 LANCER LA PARTIE
      </button>
      <button className="btn-secondary" onClick={onBack}>← RETOUR</button>
    </div>
  );
}

function RevealScreen({ players, currentReveal, setCurrentReveal, showWord, setShowWord, onDone }) {
  const player = players[currentReveal];
  const isLast = currentReveal === players.length - 1;

  const roleInfo = {
    civil: { label: "CIVIL", emoji: "✅", className: "role-badge-civil", desc: "Tu es du côté des civils !" },
    undercover: { label: "UNDERCOVER", emoji: "🕵️", className: "role-badge-undercover", desc: "Tu es l'infiltré !" },
    mrwhite: { label: "MR. WHITE", emoji: "❓", className: "role-badge-mrwhite", desc: "Tu ne sais rien... bluff !" },
  };

  const info = roleInfo[player.role];

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 40, minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Joueur {currentReveal + 1} / {players.length}
        </div>
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 16 }}>
          {players.map((_, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 2, flex: 1, maxWidth: 32,
              background: i <= currentReveal ? "linear-gradient(90deg, #f5a623, #ff6b00)" : "rgba(255,255,255,0.1)"
            }} />
          ))}
        </div>
      </div>

      <div className="card" style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>
          {["🐉","⚡","💥","🌟","👊","🔥","✨"][currentReveal % 7]}
        </div>
        <h2 style={{ fontSize: 36, margin: 0, color: "#ffdd00", letterSpacing: 2 }}>{player.name}</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "8px 0 0", fontSize: 13, letterSpacing: 1 }}>
          Passe le téléphone à ce joueur
        </p>
      </div>

      {!showWord ? (
        <button className="btn-primary" onClick={() => setShowWord(true)}>
          👁️ VOIR MON RÔLE
        </button>
      ) : (
        <div className="word-reveal" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className={`card role-badge-${player.role}`} style={{ textAlign: "center", padding: 28, borderRadius: 16 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{info.emoji}</div>
            <div style={{ fontSize: 28, letterSpacing: 3, marginBottom: 4 }}>{info.label}</div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, opacity: 0.8 }}>{info.desc}</div>
          </div>

          <div className="card" style={{ textAlign: "center", padding: 28 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Ton mot secret</div>
            <div style={{
              fontSize: player.word === "???" ? 56 : 42,
              color: player.role === "undercover" ? "#f44336" : player.role === "mrwhite" ? "#ce93d8" : "#4caf50",
              letterSpacing: 2,
              fontWeight: "bold",
              textShadow: `0 0 20px currentColor`,
            }}>
              {player.word}
            </div>
          </div>

          <button className="btn-primary" onClick={() => {
            if (isLast) { onDone(); }
            else { setCurrentReveal(currentReveal + 1); setShowWord(false); }
          }}>
            {isLast ? "🎮 COMMENCER À JOUER" : "➡️ JOUEUR SUIVANT"}
          </button>
        </div>
      )}
    </div>
  );
}

function PlayScreen({ players, onRestart, onNewGame }) {
  const [eliminated, setEliminated] = useState([]);
  const [showRoles, setShowRoles] = useState(false);
  const [confirmReveal, setConfirmReveal] = useState(false);

  const activePlayers = players.filter((_, i) => !eliminated.includes(i));
  const activeUndercovors = activePlayers.filter(p => p.role === "undercover").length;
  const activeCivils = activePlayers.filter(p => p.role === "civil").length;
  const activeMrWhite = activePlayers.filter(p => p.role === "mrwhite").length;

  let gameStatus = null;
  if (activeUndercovors === 0 && activeMrWhite === 0) gameStatus = "civil";
  else if (activeUndercovors >= activeCivils) gameStatus = "undercover";

  function toggleEliminate(i) {
    setEliminated(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  }

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 40, minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 40, margin: 0, color: "#f5a623", letterSpacing: 3 }}>EN JEU</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "4px 0 0", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
          Appuyez sur un joueur pour l'éliminer
        </p>
      </div>

      {gameStatus && (
        <div className="card word-reveal" style={{
          textAlign: "center",
          background: gameStatus === "civil" ? "rgba(76,175,80,0.1)" : "rgba(244,67,54,0.1)",
          border: `2px solid ${gameStatus === "civil" ? "#4caf50" : "#f44336"}`,
          padding: 24,
        }}>
          <div style={{ fontSize: 48 }}>{gameStatus === "civil" ? "🏆" : "💀"}</div>
          <div style={{ fontSize: 32, color: gameStatus === "civil" ? "#4caf50" : "#f44336", letterSpacing: 2 }}>
            {gameStatus === "civil" ? "CIVILS GAGNENT !" : "UNDERCOVER GAGNE !"}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {[{label: "Civils", count: activeCivils, color: "#4caf50"}, {label: "Undercover", count: activeUndercovors, color: "#f44336"}, {label: "Mr. White", count: activeMrWhite, color: "#9c27b0"}].filter(s => s.count > 0 || s.label !== "Mr. White").map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${s.color}30`, borderRadius: 8, padding: "8px 14px", textAlign: "center", fontFamily: "'Rajdhani', sans-serif" }}>
            <div style={{ fontSize: 20, color: s.color, fontWeight: 700 }}>{s.count}</div>
            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {players.map((player, i) => {
          const isOut = eliminated.includes(i);
          return (
            <div
              key={i}
              onClick={() => !showRoles && toggleEliminate(i)}
              style={{
                background: isOut ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.06)",
                border: isOut ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(245,166,35,0.2)",
                borderRadius: 12,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: showRoles ? "default" : "pointer",
                transition: "all 0.2s",
                opacity: isOut ? 0.4 : 1,
                filter: isOut ? "grayscale(1)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{isOut ? "💀" : ["🐉","⚡","💥","🌟","👊","🔥","✨","🌀","🎯","⭐","🏆","🎮"][i % 12]}</span>
                <div>
                  <div style={{ fontSize: 20, letterSpacing: 1, textDecoration: isOut ? "line-through" : "none", color: isOut ? "#666" : "#fff" }}>{player.name}</div>
                  {showRoles && (
                    <div className="word-reveal" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: player.role === "undercover" ? "#f44336" : player.role === "mrwhite" ? "#ce93d8" : "#4caf50", marginTop: 2 }}>
                      {player.role === "undercover" ? "🕵️ UNDERCOVER" : player.role === "mrwhite" ? "❓ MR. WHITE" : "✅ CIVIL"} — {player.word}
                    </div>
                  )}
                </div>
              </div>
              {!showRoles && (
                <div style={{ fontSize: 13, color: isOut ? "#666" : "#f5a623", fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1 }}>
                  {isOut ? "ÉLIMINÉ" : "ACTIF"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showRoles ? (
        <button className="btn-secondary" style={{ borderColor: "#9c27b0", color: "#ce93d8" }} onClick={() => setConfirmReveal(true)}>
          🔍 RÉVÉLER LES RÔLES
        </button>
      ) : null}

      {confirmReveal && !showRoles && (
        <div className="word-reveal card" style={{ textAlign: "center", background: "rgba(156,39,176,0.1)", border: "1px solid #9c27b0" }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#ce93d8", fontSize: 15, margin: "0 0 16px" }}>Révéler met fin à la partie. Confirmer ?</p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-secondary" style={{ borderColor: "#9c27b0", color: "#ce93d8" }} onClick={() => { setShowRoles(true); setConfirmReveal(false); }}>✅ OUI</button>
            <button className="btn-secondary" onClick={() => setConfirmReveal(false)}>❌ NON</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={onNewGame}>🔄 REJOUER</button>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={onRestart}>🏠 ACCUEIL</button>
      </div>
    </div>
  );
}
