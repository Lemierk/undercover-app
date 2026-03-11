import { useState, useEffect } from "react";

// ─── THEMES ────────────────────────────────────────────────────────────────────
const THEMES = {
  dbz: {
    id: "dbz",
    label: "Dragon Ball Z",
    emoji: "🐉",
    particles: ["🔥","⚡","💥","✨","🌟","👊","💢"],
    playerEmojis: ["🐉","⚡","💥","🌟","👊","🔥","✨","🌀","🎯","⭐","🏆","🎮"],
    accent: "#f5a623",
    accentAlt: "#ff6b00",
    accentText: "#ffdd00",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #1a0505 50%, #0d0d2e 100%)",
    pulseColor: "#f5a623",
    characters: ["Goku","Vegeta","Gohan","Piccolo","Trunks","Krilin","Yamcha","Ten Shin Han","Bulma","C-18","Freezer","Cell","Buu","Broly","Chi-chi"],
    pairs: [
      { civil: "Kamehameha", undercover: "Genkidama" },
      { civil: "Super Saiyan", undercover: "Super Saiyan 2" },
      { civil: "Goku", undercover: "Vegeta" },
      { civil: "C-17", undercover: "C-16" },
      { civil: "Dieu (Kami)", undercover: "Dende" },
      { civil: "Dragon Ball", undercover: "Super Dragon Ball" },
      { civil: "Kaioken", undercover: "Oozaru" },
      { civil: "Freezer", undercover: "Cell" },
      { civil: "Buu", undercover: "Janemba" },
      { civil: "Bulma", undercover: "Chi-Chi" },
      { civil: "Piccolo", undercover: "Kami" },
      { civil: "Shenron", undercover: "Porunga" },
      { civil: "Beerus", undercover: "Champa" },
      { civil: "Senzu", undercover: "Karin" },
      { civil: "Tortue Géniale", undercover: "Karin" },
      { civil: "Tour Karin", undercover: "Palais de Dieu" },
      { civil: "Salle du temps", undercover: "Chambre de gravité" },
      { civil: "Gohan", undercover: "Goten" },
      { civil: "Trunks", undercover: "Gotenks" },
      { civil: "Makankosappo", undercover: "Masenko" },
	  { civil: "Tenshinhan", undercover: "Yamcha" },
	  { civil: "Cell junior", undercover: "Saibaiman" },
	  { civil: "Nappa", undercover: "Raditz" },
    ],
  },

  yugioh: {
    id: "yugioh",
    label: "Yu-Gi-Oh !",
    emoji: "👁️",
    particles: ["👁️","🃏","⚔️","🌀","💜","✦","🔮"],
    playerEmojis: ["👁️","🃏","⚔️","🌀","💜","🔮","✦","🌑","👑","🐉","⚡","🗡️"],
    accent: "#a855f7",
    accentAlt: "#7c3aed",
    accentText: "#e879f9",
    bg: "linear-gradient(135deg, #0a0014 0%, #14001a 50%, #0d0030 100%)",
    pulseColor: "#a855f7",
    characters: ["Yugi","Kaiba","Joey","Jaden","Zane","Bakura","Marek","Pegasus","Sirius","Alexia Rodes","Makuba","Mako Tsunami","Rex","Insector Haga","Mai"],
    pairs: [
      { civil: "Magicien sombre", undercover: "Magicienne des ténébres" },
      { civil: "Dragon blanc aux yeux bleus", undercover: "Dragon noir aux yeux rouges" },
      { civil: "Exodia", undercover: "Exodia Necros" },
      { civil: "Yugi Muto", undercover: "Jaden Yuki" },
      { civil: "Pot de cupidité", undercover: "Pot d'Avarice" },
      { civil: "Force de Mirroir", undercover: "Cylindre magique" },
      { civil: "Puzzle du Millenium", undercover: "L'anneau du Millenium" },
      { civil: "Domino city", undercover: "La duel académie" },
      { civil: "Montre XYZ", undercover: "Monstre Synchro" },
      { civil: "Carte piège", undercover: "Carte magie" },
      { civil: "Monster Reborn", undercover: "Enterrement prématuré" },
      { civil: "Seto Kaiba", undercover: "Yami Yugi" },
      { civil: "Pegasus", undercover: "Marek" },
      { civil: "L'ile des duelistes", undercover: "Battle City" },
      { civil: "Obelisk le Tourmenteur", undercover: "Le dragon ailé de Ra" },
	  { civil: "Seto Kaiba", undercover: "Noa Kaiba" },
	  { civil: "Violent orage", undercover: "Tornade géante" },
	  { civil: "Trou noir", undercover: "Raigeki" },
	  { civil: "Cyber dragon", undercover: "Naga cyber" },
	  { civil: "Avian héro élémentaire", undercover: "Sparkman héro élémentaire" },
	  { civil: "Néos héro élémentaire", undercover: "Magicien sombre" },
    ],
  },

  pokemon: {
    id: "pokemon",
    label: "Pokémon",
    emoji: "⚡",
    particles: ["⚡","🔴","🌊","🔥","🌿","✨","💫"],
    playerEmojis: ["⚡","🔴","🌊","🔥","🌿","✨","💫","🎯","🏆","🌟","🎮","🦋"],
    accent: "#facc15",
    accentAlt: "#ef4444",
    accentText: "#fde68a",
    bg: "linear-gradient(135deg, #0a1628 0%, #0f2040 50%, #0a1628 100%)",
    pulseColor: "#facc15",
    characters: ["Sacha","Pikachu","Red","Ondine","Métamorphe","Pierre","Jessie","James","Miaouss","Professeur Chen","Agent Jenny","Infirmière Joelle","Dracaufeu","Le byciclette","Régis"],
    pairs: [
      { civil: "Pikachu", undercover: "Raichu" },
      { civil: "Poké Ball", undercover: "Master Ball" },
      { civil: "Dresseur", undercover: "Champion" },
      { civil: "Attaque Tonnerre", undercover: "Fatal foudre" },
      { civil: "Gigamax", undercover: "Méga-Évolution" },
      { civil: "Pokédex", undercover: "PokéNav" },
      { civil: "Arène", undercover: "Ligue Pokémon" },
      { civil: "IV", undercover: "EV" },
      { civil: "Charge", undercover: "Tranche" },
      { civil: "Centre Pokémon", undercover: "Magasin Pokémon" },
      { civil: "Chenipan", undercover: "Chrysacier" },
      { civil: "Rondoudou", undercover: "Grodoudou" },
      { civil: "Bulbizarre", undercover: "Herbizarre" },
      { civil: "Carapuce", undercover: "Carabaffe" },
      { civil: "Salamèche", undercover: "Reptincel" },
      { civil: "Dracolosse", undercover: "Dracaufeu" },
      { civil: "Mewtwo", undercover: "Mew" },
      { civil: "Kanto", undercover: "Jotho" },
    ],
  },

  got: {
    id: "got",
    label: "Game of Thrones",
    emoji: "👑",
    particles: ["👑","🐉","⚔️","🔥","❄️","🌹","🦁"],
    playerEmojis: ["👑","🐉","⚔️","🔥","❄️","🌹","🦁","🐺","🌊","🏰","💀","🗡️"],
    accent: "#c0a060",
    accentAlt: "#8b6914",
    accentText: "#f0d080",
    bg: "linear-gradient(135deg, #0a0800 0%, #1a1200 50%, #0a0800 100%)",
    pulseColor: "#c0a060",
    characters: ["Tyrion","Jon Snow","Daenerys","Cersei","Jaime","Arya","Sansa","Ned Stark","Tywin","Joffrey","Robb Stark","Stannis","Melisandre","Brienne","Rhaenyra"],
    pairs: [
      { civil: "Jon Snow", undercover: "Aegon Targaryen" },
      { civil: "Daenerys", undercover: "Rhaenyra" },
      { civil: "Lannister", undercover: "Baratheon" },
      { civil: "Stark", undercover: "Tully" },
      { civil: "Trône de Fer", undercover: "Port Real" },
      { civil: "Dracarys", undercover: "Valar Morghulis" },
      { civil: "Garde de Nuit", undercover: "Manteau d'or" },
      { civil: "La Main du Roi", undercover: "Le Conseil Restreint" },
      { civil: "Westeros", undercover: "Essos" },
      { civil: "Winterfell", undercover: "Peyredragon" },
      { civil: "Joffrey", undercover: "Ramsay" },
      { civil: "Marcheur Blanc", undercover: "Sauvageons" },
      { civil: "Drogon", undercover: "Viserion" },
      { civil: "Le Limier", undercover: "La montagne" },
      { civil: "Cersei", undercover: "Margaery" },
      { civil: "Arya", undercover: "Sansa" },
      { civil: "Rhaenyra", undercover: "Alicent" },
      { civil: "Valyrien", undercover: "Targaryen" },
      { civil: "Vagar", undercover: "Caraxes" },
      { civil: "Targaryen", undercover: "Velaryon" },
	  { civil: "Deamon", undercover: "Aemond" },
	  { civil: "Eddard Stark", undercover: "Robert Baratheon" },
    ],
  },

  harrypotter: {
    id: "harrypotter",
    label: "Harry Potter",
    emoji: "🪄",
    particles: ["🪄","🦉","🧙","✨","🔮","🌙","⚡"],
    playerEmojis: ["🪄","🦉","🧙","✨","🔮","🌙","⚡","🐍","🦁","🦅","🦡","📚"],
    accent: "#c084fc",
    accentAlt: "#7c3aed",
    accentText: "#e9d5ff",
    bg: "linear-gradient(135deg, #050010 0%, #0f0520 50%, #050010 100%)",
    pulseColor: "#c084fc",
    characters: ["Harry","Hermione","Ron","Dumbledore","Voldemort","Severus","Drago","Hagrid","Sirius","Lupin","Bellatrix","Neville","Luna","Dobby","McGonagall"],
    pairs: [
      { civil: "Gryffondor", undercover: "Serdaigle" },
      { civil: "Serpentard", undercover: "Poufsouffle" },
      { civil: "Poudlard", undercover: "Pré-au-lard" },
      { civil: "Patronus", undercover: "Horcruxe" },
      { civil: "Expelliarmus", undercover: "Stupefix" },
      { civil: "Avada Kedavra", undercover: "Crucio" },
      { civil: "Baguette magique", undercover: "Balais volant" },
      { civil: "Quidditch", undercover: "Echec" },
      { civil: "Vif d'or", undercover: "Cognard" },
      { civil: "Choixpeau", undercover: "Cape d'invisibilité" },
      { civil: "Placard sous l'escalier", undercover: "Chambre des secrets" },
      { civil: "Potion de polynectar", undercover: "Potion de chance" },
      { civil: "Détraqueur", undercover: "Loup-garou" },
      { civil: "Dobby", undercover: "Créature" },
      { civil: "Mangemort", undercover: "Auror" },
      { civil: "Harry Potter", undercover: "Neville Londubat" },
      { civil: "Dumbledore", undercover: "Grindelwald" },
      { civil: "Moldu", undercover: "Cracmol" },
      { civil: "Voie 9¾", undercover: "Poudlard Express" },
      { civil: "Carte du Marauders", undercover: "Miroir magique" },
	  { civil: "Hedwige ", undercover: "Croûtard" },
	  { civil: "Nagini", undercover: "Le basilic" },
    ],
  },

  starwars: {
    id: "starwars",
    label: "Star Wars",
    emoji: "🚀",
    particles: ["🚀","🌌","💙","❤️","⭐","⚔️","🌠"],
    playerEmojis: ["🚀","🌌","💙","⭐","⚔️","🤖","🌠","🛸","🏛️","👾","🔭","🎖️"],
    accent: "#38bdf8",
    accentAlt: "#0ea5e9",
    accentText: "#7dd3fc",
    bg: "linear-gradient(135deg, #000005 0%, #050510 50%, #000005 100%)",
    pulseColor: "#38bdf8",
    characters: ["Luke","Leia","Han Solo","Yoda","Dark Vador","Obi-Wan","Général Grievous","Ahsoka Tano","Boba Fett","Chewbacca","R2-D2","C-3PO","Palpatine","Mace Windu","Anakin"],
    pairs: [
      { civil: "Luke", undercover: "Anakin" },
      { civil: "Naboo", undercover: "Endor" },
      { civil: "Jedi", undercover: "Sith" },
      { civil: "La Force", undercover: "Le côté obscur" },
      { civil: "X-Wing", undercover: "TIE Fighter" },
      { civil: "L'Empire", undercover: "L'Alliance Rebelle" },
      { civil: "Étoile de la Mort", undercover: "Starkiller" },
      { civil: "R2-D2", undercover: "C-3PO" },
      { civil: "Sabre laser vert", undercover: "Sabre laser violet" },
      { civil: "Kashyyyk", undercover: "Dagobah" },
      { civil: "Tatouïne", undercover: "Jakku" },
      { civil: "Coruscant", undercover: "Naboo" },
      { civil: "Ewok", undercover: "Jawa" },
      { civil: "Dark Maul", undercover: "Compte Doku" },
      { civil: "Sénat Galactique", undercover: "Temple Jedi" },
      { civil: "Padawan", undercover: "Inquisiteur" },
    ],
  },
};

// ─── HELPERS ───────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedThemeId, setSelectedThemeId] = useState("dbz");
  const [playerCount, setPlayerCount] = useState(5);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhite, setMrWhite] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentReveal, setCurrentReveal] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [particles, setParticles] = useState([]);

  const theme = THEMES[selectedThemeId];

  useEffect(() => {
    const p = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: theme.particles[Math.floor(Math.random() * theme.particles.length)],
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      size: 10 + Math.random() * 20,
    }));
    setParticles(p);
  }, [screen, selectedThemeId]);

  function startGame() {
    const pair = theme.pairs[Math.floor(Math.random() * theme.pairs.length)];
    const shuffledChars = shuffle(theme.characters).slice(0, playerCount);
    const indices = shuffle(Array.from({ length: playerCount }, (_, i) => i));
    const undercoverIndices = indices.slice(0, undercoverCount);
    const mrWhiteIndex = mrWhite ? indices[undercoverCount] : -1;

    const roles = Array.from({ length: playerCount }, (_, i) => {
      if (undercoverIndices.includes(i)) return { name: shuffledChars[i], role: "undercover", word: pair.undercover };
      if (i === mrWhiteIndex) return { name: shuffledChars[i], role: "mrwhite", word: "???" };
      return { name: shuffledChars[i], role: "civil", word: pair.civil };
    });

    setPlayers(roles);
    setCurrentReveal(0);
    setShowWord(false);
    setScreen("reveal");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      fontFamily: "'Bangers', 'Impact', cursive",
      color: "#fff",
      overflowX: "hidden",
      position: "relative",
      transition: "background 0.5s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@500;700&display=swap');
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          to { transform: translateY(-30px) rotate(15deg); opacity: 0.25; }
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
        .card {
          background: rgba(255,255,255,0.04);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          animation: slideUp 0.4s ease forwards;
        }
        .counter-btn {
          width: 44px; height: 44px; border-radius: 8px;
          font-size: 24px; cursor: pointer;
          font-family: 'Bangers', cursive;
          transition: all 0.15s;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
        }
        .counter-btn:active { transform: scale(0.9); }
        .role-badge-civil {
          background: linear-gradient(135deg, #1a4a1a, #2d7a2d);
          border: 2px solid #4caf50 !important; color: #a5d6a7;
        }
        .role-badge-undercover {
          background: linear-gradient(135deg, #4a0000, #8b0000);
          border: 2px solid #f44336 !important; color: #ffcdd2;
          animation: shake 0.5s ease;
        }
        .role-badge-mrwhite {
          background: linear-gradient(135deg, #1a1a4a, #2d2d8b);
          border: 2px solid #9c27b0 !important; color: #e1bee7;
        }
        .word-reveal { animation: zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .theme-option {
          border-radius: 12px; padding: 14px 16px;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 12px;
          border: 2px solid transparent;
          font-family: 'Rajdhani', sans-serif;
          background: rgba(255,255,255,0.04);
        }
        .theme-option:active { transform: scale(0.98); }
      `}</style>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed", left: `${p.x}%`, top: `${p.y}%`,
          fontSize: `${p.size}px`, opacity: 0.15,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          pointerEvents: "none", zIndex: 0,
        }}>{p.char}</div>
      ))}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 430, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {screen === "home" && (
          <HomeScreen theme={theme} selectedThemeId={selectedThemeId} setSelectedThemeId={setSelectedThemeId} onStart={() => setScreen("setup")} />
        )}
        {screen === "setup" && (
          <SetupScreen
            theme={theme}
            playerCount={playerCount} setPlayerCount={setPlayerCount}
            undercoverCount={undercoverCount} setUndercoverCount={setUndercoverCount}
            mrWhite={mrWhite} setMrWhite={setMrWhite}
            onStart={startGame} onBack={() => setScreen("home")}
          />
        )}
        {screen === "reveal" && (
          <RevealScreen
            theme={theme} players={players}
            currentReveal={currentReveal} setCurrentReveal={setCurrentReveal}
            showWord={showWord} setShowWord={setShowWord}
            onDone={() => setScreen("play")}
          />
        )}
        {screen === "play" && (
          <PlayScreen
            theme={theme} players={players}
            onRestart={() => setScreen("home")} onNewGame={startGame}
          />
        )}
      </div>
    </div>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({ theme, selectedThemeId, setSelectedThemeId, onStart }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "24px", gap: 28 }}>
      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 8, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}>{theme.emoji}</div>
        <h1 style={{
          fontSize: 64, letterSpacing: 4, margin: 0, lineHeight: 1,
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentText}, ${theme.accentAlt})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: `drop-shadow(0 0 20px ${theme.accent}80)`,
        }}>
          UNDER<br/>COVER
        </h1>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: "#aaa", letterSpacing: 3, marginTop: 8, textTransform: "uppercase" }}>
          Jeu de déduction sociale
        </p>
      </div>

      {/* Theme selector */}
      <div style={{ width: "100%" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>
          🎨 Choisir un thème
        </div>

        {/* Selected theme button */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            background: `rgba(255,255,255,0.06)`,
            border: `2px solid ${theme.accent}`,
            borderRadius: 12, padding: "14px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{theme.emoji}</span>
            <div>
              <div style={{ fontSize: 22, letterSpacing: 1, color: theme.accentText }}>{theme.label}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, color: "#888", letterSpacing: 1 }}>{theme.pairs.length} paires de mots</div>
            </div>
          </div>
          <div style={{ fontSize: 20, color: theme.accent, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="word-reveal" style={{
            background: "rgba(10,10,20,0.95)",
            border: `1px solid ${theme.accent}40`,
            borderRadius: 12, marginTop: 8, overflow: "hidden",
            backdropFilter: "blur(20px)",
          }}>
            {Object.values(THEMES).map(t => (
              <div
                key={t.id}
                className="theme-option"
                onClick={() => { setSelectedThemeId(t.id); setOpen(false); }}
                style={{
                  borderRadius: 0,
                  borderLeft: selectedThemeId === t.id ? `4px solid ${t.accent}` : "4px solid transparent",
                  background: selectedThemeId === t.id ? `${t.accent}15` : "transparent",
                  padding: "14px 18px",
                }}
              >
                <span style={{ fontSize: 28 }}>{t.emoji}</span>
                <div>
                  <div style={{ fontSize: 18, letterSpacing: 1, color: selectedThemeId === t.id ? t.accentText : "#ccc" }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: "#666", letterSpacing: 1 }}>{t.pairs.length} paires • {t.characters.length} personnages</div>
                </div>
                {selectedThemeId === t.id && <div style={{ marginLeft: "auto", color: t.accent, fontSize: 18 }}>✓</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rules */}
      <div className="card" style={{ width: "100%", textAlign: "center", border: `1px solid ${theme.accent}30` }}>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, color: "#ccc", lineHeight: 1.7, margin: 0 }}>
          Les <span style={{ color: "#4caf50" }}>civils</span> ont le même mot.<br/>
          L'<span style={{ color: "#f44336" }}>undercover</span> a un mot similaire.<br/>
          <span style={{ color: "#ce93d8" }}>Mr. White</span> ne sait rien du tout !<br/>
          Votez pour éliminer l'imposteur.
        </p>
      </div>

      {/* Start */}
      <button
        onClick={onStart}
        style={{
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
          color: "#0a0a1a", border: "none", padding: "16px 32px",
          fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2,
          borderRadius: 8, cursor: "pointer", width: "100%",
          boxShadow: `0 0 20px ${theme.accent}60, 0 0 40px ${theme.accent}30`,
          transition: "transform 0.1s", textTransform: "uppercase",
        }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {theme.emoji} COMMENCER {theme.emoji}
      </button>
    </div>
  );
}

// ─── SETUP ─────────────────────────────────────────────────────────────────────
function SetupScreen({ theme, playerCount, setPlayerCount, undercoverCount, setUndercoverCount, mrWhite, setMrWhite, onStart, onBack }) {
  const maxUndercover = Math.floor((playerCount - (mrWhite ? 1 : 0)) / 2);
  const safeUC = Math.min(undercoverCount, maxUndercover);

  const BtnPrimary = ({ children, onClick, style = {} }) => (
    <button onClick={onClick} style={{
      background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
      color: "#0a0a1a", border: "none", padding: "16px 32px",
      fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2,
      borderRadius: 8, cursor: "pointer", width: "100%",
      boxShadow: `0 0 20px ${theme.accent}50`,
      textTransform: "uppercase", ...style,
    }}>{children}</button>
  );

  const BtnSecondary = ({ children, onClick }) => (
    <button onClick={onClick} style={{
      background: "transparent", color: theme.accent,
      border: `2px solid ${theme.accent}`, padding: "12px 24px",
      fontSize: 18, fontFamily: "'Bangers', cursive", letterSpacing: 2,
      borderRadius: 8, cursor: "pointer", width: "100%", textTransform: "uppercase",
    }}>{children}</button>
  );

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 48 }}>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 36 }}>{theme.emoji}</div>
        <h2 style={{ fontSize: 36, margin: "4px 0 0", color: theme.accent, letterSpacing: 3 }}>CONFIGURATION</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "4px 0 0", letterSpacing: 2, fontSize: 12, textTransform: "uppercase" }}>{theme.label}</p>
      </div>

      {/* Players */}
      <div className="card" style={{ border: `1px solid ${theme.accent}30` }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: theme.accent, fontSize: 13, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>👥 Nombre de joueurs</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="counter-btn" onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: theme.accentText }}>{playerCount}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>joueurs</div>
          </div>
          <button className="counter-btn" onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}>+</button>
        </div>
      </div>

      {/* Undercovers */}
      <div className="card" style={{ border: "1px solid rgba(244,67,54,0.3)" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#f44336", fontSize: 13, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>🕵️ Nombre d'undercovers</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="counter-btn" onClick={() => setUndercoverCount(Math.max(1, safeUC - 1))}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: "#f44336" }}>{safeUC}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>undercover(s)</div>
          </div>
          <button className="counter-btn" onClick={() => setUndercoverCount(Math.min(maxUndercover, safeUC + 1))}>+</button>
        </div>
      </div>

      {/* Mr White toggle */}
      <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(156,39,176,0.3)" }}>
        <div>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🤷 Mr. White</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 13 }}>Un joueur sans aucun mot</div>
        </div>
        <div onClick={() => setMrWhite(!mrWhite)} style={{
          width: 56, height: 30, borderRadius: 15,
          background: mrWhite ? "linear-gradient(135deg, #7b1fa2, #9c27b0)" : "rgba(255,255,255,0.1)",
          border: mrWhite ? "1px solid #ce93d8" : "1px solid rgba(255,255,255,0.2)",
          cursor: "pointer", position: "relative", transition: "all 0.3s",
        }}>
          <div style={{
            position: "absolute", top: 3, left: mrWhite ? 28 : 3,
            width: 22, height: 22, borderRadius: "50%",
            background: mrWhite ? "#e1bee7" : "#666", transition: "all 0.3s",
          }} />
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: `${theme.accent}08`, border: `1px solid ${theme.accent}15`, borderRadius: 12, padding: "12px 16px", fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 13, textAlign: "center", letterSpacing: 1 }}>
        {playerCount} joueurs • {safeUC} undercover{safeUC > 1 ? "s" : ""} • {playerCount - safeUC - (mrWhite ? 1 : 0)} civils{mrWhite ? " • 1 Mr. White" : ""}
      </div>

      <BtnPrimary onClick={onStart}>🔥 LANCER LA PARTIE</BtnPrimary>
      <BtnSecondary onClick={onBack}>← RETOUR</BtnSecondary>
    </div>
  );
}

// ─── REVEAL ────────────────────────────────────────────────────────────────────
function RevealScreen({ theme, players, currentReveal, setCurrentReveal, showWord, setShowWord, onDone }) {
  const player = players[currentReveal];
  const isLast = currentReveal === players.length - 1;

  const roleInfo = {
    civil: { label: "CIVIL", emoji: "✅", cls: "role-badge-civil", desc: "Tu es du côté des civils !" },
    undercover: { label: "UNDERCOVER", emoji: "🕵️", cls: "role-badge-undercover", desc: "Tu es l'infiltré !" },
    mrwhite: { label: "MR. WHITE", emoji: "❓", cls: "role-badge-mrwhite", desc: "Tu ne sais rien... bluff !" },
  };
  const info = roleInfo[player.role];

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 40, minHeight: "100vh" }}>
      {/* Progress */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Joueur {currentReveal + 1} / {players.length}
        </div>
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
          {players.map((_, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 2, flex: 1, maxWidth: 32,
              background: i <= currentReveal ? `linear-gradient(90deg, ${theme.accent}, ${theme.accentAlt})` : "rgba(255,255,255,0.1)"
            }} />
          ))}
        </div>
      </div>

      {/* Player card */}
      <div className="card" style={{ textAlign: "center", padding: 32, border: `1px solid ${theme.accent}30` }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>
          {theme.playerEmojis[currentReveal % theme.playerEmojis.length]}
        </div>
        <h2 style={{ fontSize: 36, margin: 0, color: theme.accentText, letterSpacing: 2 }}>{player.name}</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "8px 0 0", fontSize: 13, letterSpacing: 1 }}>
          Passe le téléphone à ce joueur
        </p>
      </div>

      {!showWord ? (
        <button onClick={() => setShowWord(true)} style={{
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
          color: "#0a0a1a", border: "none", padding: "16px 32px",
          fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2,
          borderRadius: 8, cursor: "pointer", width: "100%",
          boxShadow: `0 0 20px ${theme.accent}50`, textTransform: "uppercase",
        }}>👁️ VOIR MON MOT</button>
      ) : (
        <div className="word-reveal" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Mr. White sait qu'il est Mr. White — les autres voient juste leur mot */}
          {player.role === "mrwhite" ? (
            <div className="card role-badge-mrwhite" style={{ textAlign: "center", padding: 28 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>❓</div>
              <div style={{ fontSize: 28, letterSpacing: 3, marginBottom: 4 }}>MR. WHITE</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, opacity: 0.8 }}>Tu ne sais rien... bluff !</div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: 40, border: `1px solid ${theme.accent}30` }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Ton mot secret</div>
              <div style={{
                fontSize: 42,
                color: theme.accentText,
                letterSpacing: 2, fontWeight: "bold",
                textShadow: `0 0 20px ${theme.accent}80`,
              }}>
                {player.word}
              </div>
            </div>
          )}

          <button onClick={() => {
            if (isLast) onDone();
            else { setCurrentReveal(currentReveal + 1); setShowWord(false); }
          }} style={{
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
            color: "#0a0a1a", border: "none", padding: "16px 32px",
            fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2,
            borderRadius: 8, cursor: "pointer", width: "100%",
            boxShadow: `0 0 20px ${theme.accent}50`, textTransform: "uppercase",
          }}>
            {isLast ? "🎮 COMMENCER À JOUER" : "➡️ JOUEUR SUIVANT"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── PLAY ──────────────────────────────────────────────────────────────────────
function PlayScreen({ theme, players, onRestart, onNewGame }) {
  const [eliminated, setEliminated] = useState([]);
  const [showRoles, setShowRoles] = useState(false);
  const [confirmReveal, setConfirmReveal] = useState(false);

  const activePlayers = players.filter((_, i) => !eliminated.includes(i));
  const activeUC = activePlayers.filter(p => p.role === "undercover").length;
  const activeCivils = activePlayers.filter(p => p.role === "civil").length;
  const activeMW = activePlayers.filter(p => p.role === "mrwhite").length;

  let gameStatus = null;
  if (activeUC === 0 && activeMW === 0) gameStatus = "civil";
  else if (activeUC >= activeCivils) gameStatus = "undercover";

  const BtnSecondary = ({ children, onClick, style = {} }) => (
    <button onClick={onClick} style={{
      background: "transparent", color: theme.accent,
      border: `2px solid ${theme.accent}`, padding: "12px 24px",
      fontSize: 18, fontFamily: "'Bangers', cursive", letterSpacing: 2,
      borderRadius: 8, cursor: "pointer", width: "100%",
      textTransform: "uppercase", ...style,
    }}>{children}</button>
  );

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 40, minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32 }}>{theme.emoji}</div>
        <h2 style={{ fontSize: 36, margin: "4px 0 0", color: theme.accent, letterSpacing: 3 }}>EN JEU</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "4px 0 0", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
          Appuyez sur un joueur pour l'éliminer
        </p>
      </div>

      {gameStatus && (
        <div className="word-reveal card" style={{
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

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { label: "Civils", count: activeCivils, color: "#4caf50" },
          { label: "Undercover", count: activeUC, color: "#f44336" },
          { label: "Mr. White", count: activeMW, color: "#9c27b0" },
        ].filter(s => s.count > 0).map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${s.color}40`, borderRadius: 8, padding: "8px 14px", textAlign: "center", fontFamily: "'Rajdhani', sans-serif" }}>
            <div style={{ fontSize: 20, color: s.color, fontWeight: 700 }}>{s.count}</div>
            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Player list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {players.map((player, i) => {
          const isOut = eliminated.includes(i);
          return (
            <div key={i} onClick={() => !showRoles && (isOut
              ? setEliminated(prev => prev.filter(x => x !== i))
              : setEliminated(prev => [...prev, i])
            )} style={{
              background: isOut ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.06)",
              border: isOut ? "1px solid rgba(255,255,255,0.05)" : `1px solid ${theme.accent}30`,
              borderRadius: 12, padding: "14px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: showRoles ? "default" : "pointer", transition: "all 0.2s",
              opacity: isOut ? 0.35 : 1, filter: isOut ? "grayscale(1)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{isOut ? "💀" : theme.playerEmojis[i % theme.playerEmojis.length]}</span>
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
                <div style={{ fontSize: 12, color: isOut ? "#555" : theme.accent, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1 }}>
                  {isOut ? "ÉLIMINÉ" : "ACTIF"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showRoles && (
        <BtnSecondary style={{ borderColor: "#9c27b0", color: "#ce93d8" }} onClick={() => setConfirmReveal(true)}>
          🔍 RÉVÉLER LES RÔLES
        </BtnSecondary>
      )}

      {confirmReveal && !showRoles && (
        <div className="word-reveal card" style={{ textAlign: "center", background: "rgba(156,39,176,0.1)", border: "1px solid #9c27b0" }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#ce93d8", fontSize: 15, margin: "0 0 16px" }}>Révéler met fin à la partie. Confirmer ?</p>
          <div style={{ display: "flex", gap: 12 }}>
            <BtnSecondary style={{ borderColor: "#9c27b0", color: "#ce93d8", flex: 1 }} onClick={() => { setShowRoles(true); setConfirmReveal(false); }}>✅ OUI</BtnSecondary>
            <BtnSecondary style={{ flex: 1 }} onClick={() => setConfirmReveal(false)}>❌ NON</BtnSecondary>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <BtnSecondary style={{ flex: 1 }} onClick={onNewGame}>🔄 REJOUER</BtnSecondary>
        <BtnSecondary style={{ flex: 1 }} onClick={onRestart}>🏠 ACCUEIL</BtnSecondary>
      </div>
    </div>
  );
}
