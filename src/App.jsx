import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// UNDERCOVER — THÈMES & COMPOSANTS
// ═══════════════════════════════════════════════════════
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
      { civil: "Monstre XYZ", undercover: "Monstre Synchro" },
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
      { civil: "Hedwige", undercover: "Croûtard" },
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


// ─── BOT HINTS (pré-programmés par mot) ────────────────────────────────────────
const BOT_HINTS = {
  // DBZ
  "Kamehameha": ["Énergie","Vague","Puissance","Rayon","Charge"],
  "Genkidama": ["Sphère","Univers","Espoir","Énergie","Globe"],
  "Super Saiyan": ["Doré","Transformation","Cheveux","Puissance","Éveil"],
  "Super Saiyan 2": ["Éclairs","Évolution","Combat","Force","Aura"],
  "Goku": ["Héros","Combat","Saiyan","Terre","Sourire"],
  "Vegeta": ["Fierté","Prince","Rival","Élite","Orgueil"],
  "C-17": ["Androïde","Jumeau","Nature","Rebelle","Métal"],
  "C-16": ["Androïde","Paisible","Oiseau","Doux","Géant"],
  "Dieu (Kami)": ["Gardien","Ciel","Namek","Ancien","Palais"],
  "Dende": ["Soins","Namek","Jeune","Guérison","Vert"],
  "Dragon Ball": ["Sphère","Vœu","Orange","Étoile","Quête"],
  "Super Dragon Ball": ["Géant","Univers","Vœu","Rare","Puissant"],
  "Kaioken": ["Rouge","Multiplication","Risque","Vitesse","Aura"],
  "Oozaru": ["Singe","Lune","Transformation","Géant","Rugissement"],
  "Freezer": ["Tyran","Glace","Espace","Cruel","Violet"],
  "Cell": ["Parfait","Absorption","Insecte","Copie","Sombre"],
  "Buu": ["Rose","Magie","Absorption","Enfantin","Chaos"],
  "Janemba": ["Démon","Portail","Maléfique","Dimension","Étrange"],
  "Bulma": ["Génie","Inventrice","Bleue","Capsule","Curieuse"],
  "Chi-Chi": ["Mère","Stricte","Mariage","Cuisine","Protectrice"],
  "Piccolo": ["Vert","Namek","Mentor","Sérieux","Cap"],
  "Kami": ["Dieu","Ancien","Gardien","Séparé","Sage"],
  "Shenron": ["Dragon","Vœu","Vert","Éternel","Invocation"],
  "Porunga": ["Namek","Dragon","Grand","Trois","Vœux"],
  "Beerus": ["Dieu","Destruction","Sommeil","Chat","Puissant"],
  "Champa": ["Jumeau","Gros","Univers","Destruction","Jaloux"],
  "Senzu": ["Haricot","Soin","Récupération","Précieux","Magie"],
  "Karin": ["Chat","Tour","Haricot","Sage","Perché"],
  "Tortue Géniale": ["Maître","Plage","Vieux","Dragueur","Kimono"],
  "Tour Karin": ["Haute","Nuage","Ascension","Entraînement","Ciel"],
  "Palais de Dieu": ["Nuage","Haut","Gardien","Blanc","Céleste"],
  "Salle du temps": ["Année","Jour","Entraînement","Vide","Temps"],
  "Chambre de gravité": ["Pesanteur","Entraînement","Capsule","Effort","Vegeta"],
  "Gohan": ["Studieux","Potentiel","Fils","Lunettes","Calme"],
  "Goten": ["Enfant","Ressemblance","Joueur","Fusion","Petit"],
  "Trunks": ["Épée","Futur","Violet","Demi-Saiyan","Voyage"],
  "Gotenks": ["Fusion","Enfants","Espiègle","Puissant","Caprice"],
  "Makankosappo": ["Spirale","Percée","Piccolo","Doigts","Vrille"],
  "Masenko": ["Énergie","Gohan","Jaune","Attaque","Front"],
  "Tenshinhan": ["Troisième","Œil","Arts","Sérieux","Humain"],
  "Yamcha": ["Désert","Cicatrice","Baseball","Faible","Loup"],
  "Cell junior": ["Bleu","Mini","Violent","Clone","Petit"],
  "Saibaiman": ["Vert","Explosion","Faible","Groupe","Plante"],
  "Nappa": ["Chauve","Géant","Détruire","Végéta","Barbare"],
  "Raditz": ["Cheveux","Frère","Traître","Longue","Saiyan"],

  // Yu-Gi-Oh
  "Magicien sombre": ["Violet","Bâton","Magie","Yugi","Fidèle"],
  "Magicienne des ténébres": ["Féminin","Rose","Magie","Élève","Chapeau"],
  "Dragon blanc aux yeux bleus": ["Blanc","Légendaire","Kaiba","Puissant","Rare"],
  "Dragon noir aux yeux rouges": ["Noir","Potentiel","Joey","Feu","Rare"],
  "Exodia": ["Interdit","Cinq","Pièces","Victoire","Ancien"],
  "Exodia Necros": ["Sombre","Immortel","Maléfique","Rituel","Puissant"],
  "Yugi Muto": ["Puzzle","Petit","Pharaon","Amitié","Champion"],
  "Jaden Yuki": ["Héros","Académie","Fusion","Décontracté","Marron"],
  "Pot de cupidité": ["Piocher","Deux","Cartes","Célèbre","Banni"],
  "Pot d'Avarice": ["Cinq","Recycler","Deck","Mélanger","Puissant"],
  "Force de Mirroir": ["Reflet","Défense","Piège","Attaque","Renvoyer"],
  "Cylindre magique": ["Renvoyer","Dégâts","Piège","Rediriger","Classique"],
  "Puzzle du Millenium": ["Or","Pyramide","Pharaon","Yugi","Ancien"],
  "L'anneau du Millenium": ["Bakura","Blanc","Pointu","Ombre","Maléfique"],
  "Domino city": ["Ville","Yugi","Japon","Tournoi","Moderne"],
  "La duel académie": ["École","Île","Jaden","Formation","Uniforme"],
  "Monstre XYZ": ["Rang","Superposition","Matériaux","Noir","Moderne"],
  "Monstre Synchro": ["Accord","Blanc","Tuner","Niveau","Vitesse"],
  "Carte piège": ["Retourné","Surprise","Défense","Embuscade","Piège"],
  "Carte magie": ["Sort","Effet","Rapide","Terrain","Action"],
  "Monster Reborn": ["Résurrection","Croix","Rappel","Cimetière","Classique"],
  "Enterrement prématuré": ["Cimetière","Rappel","Coût","Équipement","Ancien"],
  "Seto Kaiba": ["Arrogant","Bleu","Dragon","Rival","Riche"],
  "Yami Yugi": ["Pharaon","Sombre","Stratège","Yeux","Ancien"],
  "Pegasus": ["Œil","Millénium","Créateur","Blanc","Lecture"],
  "Marek": ["Tige","Millénium","Contrôle","Blond","Égypte"],
  "L'ile des duelistes": ["Château","Mer","Tournoi","Isolé","Pegasus"],
  "Battle City": ["Tournoi","Ville","Grues","Kaiba","Semi-finals"],
  "Obelisk le Tourmenteur": ["Bleu","Dieu","Géant","Kaiba","Égypte"],
  "Le dragon ailé de Ra": ["Or","Dieu","Soleil","Égypte","Phénix"],
  "Noa Kaiba": ["Virtuel","Enfant","Vert","Jaloux","Numérique"],
  "Violent orage": ["Détruire","Magie","Terrain","Puissant","Nettoyer"],
  "Tornade géante": ["Détruire","Magie","Piège","Rapide","Vent"],
  "Trou noir": ["Détruire","Tous","Monstres","Classique","Noir"],
  "Raigeki": ["Foudre","Détruire","Attaque","Ancien","Banni"],
  "Cyber dragon": ["Machine","Blanc","Kaiba","Mécanique","Moderne"],
  "Naga cyber": ["Serpent","Machine","Fusion","Mécanique","Long"],
  "Avian héro élémentaire": ["Ailes","Vert","Héros","Vol","Jaden"],
  "Sparkman héro élémentaire": ["Électricité","Bleu","Héros","Éclair","Jaden"],
  "Néos héro élémentaire": ["Blanc","Espace","Jaden","Fusion","Puissant"],

  // Pokémon
  "Pikachu": ["Jaune","Électrique","Mascotte","Joues","Tonnerre"],
  "Raichu": ["Évolution","Queue","Orange","Électrique","Adulte"],
  "Poké Ball": ["Rouge","Capture","Rond","Blanc","Lancer"],
  "Master Ball": ["Violet","Rare","Infaillible","Légendaire","Ultime"],
  "Dresseur": ["Voyage","Équipe","Capture","Jeune","Aventure"],
  "Champion": ["Titre","Arène","Combat","Victoire","Élite"],
  "Attaque Tonnerre": ["Électrique","Pikachu","Rapide","Paralysie","Classique"],
  "Fatal foudre": ["Puissant","Électrique","Risque","Légendaire","Ciel"],
  "Gigamax": ["Géant","Moderne","Galar","Transformation","Rare"],
  "Méga-Évolution": ["Pierre","Temporaire","Puissance","Bracelet","Combat"],
  "Pokédex": ["Rouge","Données","Scanner","Informations","Encyclopédie"],
  "PokéNav": ["Hoenn","Navigation","Carte","Rival","Moderne"],
  "Arène": ["Combat","Médaille","Chef","Ville","Défi"],
  "Ligue Pokémon": ["Élite","Quatre","Champion","Finale","Victoire"],
  "IV": ["Statistique","Caché","Naissance","Valeur","Compétitif"],
  "EV": ["Entraînement","Effort","Combat","Points","Compétitif"],
  "Charge": ["Normal","Basique","Attaque","Foncer","Simple"],
  "Tranche": ["Griffes","Coupant","Normal","Rapide","Attaque"],
  "Centre Pokémon": ["Soins","Rose","Joelle","Gratuit","Repos"],
  "Magasin Pokémon": ["Bleu","Acheter","Poké Ball","Objets","Ville"],
  "Chenipan": ["Chenille","Vert","Bois","Faible","Premier"],
  "Chrysacier": ["Cocon","Immobile","Transformation","Carapace","Attente"],
  "Rondoudou": ["Rose","Chant","Sommeil","Micro","Gonflé"],
  "Grodoudou": ["Gros","Sommeil","Chant","Évolution","Rose"],
  "Bulbizarre": ["Plante","Bulbe","Vert","Starter","Kanto"],
  "Herbizarre": ["Évolution","Plante","Fleur","Milieu","Vert"],
  "Carapuce": ["Eau","Tortue","Bleu","Starter","Kanto"],
  "Carabaffe": ["Évolution","Eau","Lunettes","Tortue","Milieu"],
  "Salamèche": ["Feu","Queue","Orange","Starter","Kanto"],
  "Reptincel": ["Feu","Évolution","Griffes","Milieu","Orange"],
  "Dracolosse": ["Dragon","Puissant","Orange","Pseudo","Légendaire"],
  "Dracaufeu": ["Feu","Vol","Starter","Flamme","Iconique"],
  "Mewtwo": ["Clone","Légendaire","Psychique","Laboratoire","Puissant"],
  "Mew": ["Rose","Rare","Originel","Mignon","Mythique"],
  "Kanto": ["Première","Région","Nostalgique","Rouge","Bleu"],
  "Jotho": ["Deuxième","Région","Or","Argent","Classique"],

  // GOT
  "Jon Snow": ["Noir","Bâtard","Mur","Résurrection","Loup"],
  "Aegon Targaryen": ["Vrai","Nom","Secret","Targayren","Héritier"],
  "Daenerys": ["Dragon","Blonde","Reine","Libératrice","Feu"],
  "Rhaenyra": ["Héritière","Dragon","Conflit","Femme","Noire"],
  "Lannister": ["Or","Lion","Dette","Riche","Jumeaux"],
  "Baratheon": ["Cerf","Roi","Robert","Tempête","Noir"],
  "Stark": ["Loup","Nord","Honneur","Hiver","Gris"],
  "Tully": ["Rivière","Poisson","Fidélité","Famille","Bleue"],
  "Trône de Fer": ["Épées","Pouvoir","Convoité","Danger","Acier"],
  "Port Real": ["Capitale","Mer","Politique","Foule","Sud"],
  "Dracarys": ["Feu","Dragon","Ordre","Brûler","Valyrien"],
  "Valar Morghulis": ["Mort","Braavos","Faceless","Salutation","Destin"],
  "Garde de Nuit": ["Noir","Mur","Serment","Froid","Honneur"],
  "Manteau d'or": ["Soldat","Ville","Ordre","Joffrey","Jaune"],
  "La Main du Roi": ["Conseiller","Broche","Pouvoir","Danger","Premier"],
  "Le Conseil Restreint": ["Réunion","Pouvoir","Secret","Trahison","Conseillers"],
  "Westeros": ["Continent","Royaumes","Guerre","Hiver","Carte"],
  "Essos": ["Est","Libre","Cités","Exile","Daenerys"],
  "Winterfell": ["Château","Nord","Stark","Froid","Ancestral"],
  "Peyredragon": ["Île","Volcan","Targaryen","Noir","Forteresse"],
  "Joffrey": ["Cruel","Jeune","Roi","Sadique","Blond"],
  "Ramsay": ["Monstre","Nord","Bolton","Torture","Souriant"],
  "Marcheur Blanc": ["Glace","Mort","Armée","Nuit","Yeux"],
  "Sauvageons": ["Nord","Mur","Libre","Barbare","Libre"],
  "Drogon": ["Noir","Grand","Daenerys","Feu","Dragon"],
  "Viserion": ["Blanc","Mort","Glace","Dragon","Transformé"],
  "Le Limier": ["Cicatrice","Chien","Brutal","Loyal","Feu"],
  "La montagne": ["Géant","Brutal","Zombie","Armure","Fort"],
  "Cersei": ["Blonde","Reine","Vengeance","Vin","Manipulatrice"],
  "Margaery": ["Rose","Douce","Manipulation","Populaire","Jeune"],
  "Arya": ["Épée","Vengeance","Liste","Petite","Masques"],
  "Sansa": ["Rouge","Naïve","Apprentissage","Nord","Survivante"],
  "Alicent": ["Verte","Reine","Mère","Conflit","Rivale"],
  "Valyrien": ["Ancien","Acier","Dragon","Langue","Empire"],
  "Targaryen": ["Dragon","Feu","Argent","Sang","Pouvoir"],
  "Vagar": ["Dragon","Reine","Blanc","Grand","Rhaenyra"],
  "Caraxes": ["Rouge","Serpent","Daemon","Dragon","Étrange"],
  "Velaryon": ["Mer","Argent","Alliés","Bateau","Driftmark"],
  "Deamon": ["Épée","Sombre","Targaryen","Imprévisible","Rebelle"],
  "Aemond": ["Borgne","Vert","Vhagar","Froid","Sérieux"],
  "Eddard Stark": ["Honneur","Tête","Nord","Exécution","Juste"],
  "Robert Baratheon": ["Roi","Gros","Marteau","Alcool","Ancien"],

  // Harry Potter
  "Gryffondor": ["Rouge","Lion","Courage","Or","Brave"],
  "Serdaigle": ["Bleu","Aigle","Intelligence","Bronze","Sagesse"],
  "Serpentard": ["Vert","Serpent","Ambition","Argent","Ruse"],
  "Poufsouffle": ["Jaune","Blaireau","Loyauté","Travail","Doux"],
  "Poudlard": ["Château","École","Magie","Écosse","Mystère"],
  "Pré-au-lard": ["Village","Bonbons","Butterbeer","Visite","Sortie"],
  "Patronus": ["Animal","Lumière","Protection","Souvenir","Charme"],
  "Horcruxe": ["Âme","Fragment","Immortalité","Sombre","Objet"],
  "Expelliarmus": ["Désarmement","Rouge","Harry","Signature","Duel"],
  "Stupefix": ["Paralysie","Rouge","Duel","Simple","Basique"],
  "Avada Kedavra": ["Mort","Vert","Imparable","Maudit","Sombre"],
  "Crucio": ["Torture","Douleur","Impardonnable","Sombre","Cri"],
  "Baguette magique": ["Bois","Noyau","Outil","Choisit","Sort"],
  "Balais volant": ["Quidditch","Ciel","Vitesse","Bois","Vol"],
  "Quidditch": ["Sport","Balais","Vif","Sept","Équipe"],
  "Echec": ["Sorcier","Pièces","Stratégie","Ron","Jeu"],
  "Vif d'or": ["Doré","Rapide","Minuscule","Victoire","Ailes"],
  "Cognard": ["Noir","Violent","Batte","Danger","Frapper"],
  "Choixpeau": ["Chapeau","Tri","Chante","Décision","Vieux"],
  "Cape d'invisibilité": ["Transparent","Cachette","Héritage","Harry","Rare"],
  "Placard sous l'escalier": ["Petit","Sombre","Harry","Dursley","Enfance"],
  "Chambre des secrets": ["Serpent","Basilic","Cachée","Deuxième","Sombre"],
  "Potion de polynectar": ["Transformation","Cheveux","Apparence","Bubulles","Copie"],
  "Potion de chance": ["Chance","Or","Liquide","Felix","Rare"],
  "Détraqueur": ["Noir","Froid","Âme","Prison","Dépression"],
  "Loup-garou": ["Pleine","Lune","Transformation","Lupin","Danger"],
  "Dobby": ["Elfe","Libre","Chaussette","Loyal","Mort"],
  "Créature": ["Elfe","Maison","Servitude","Magie","Domestique"],
  "Mangemort": ["Sombre","Marque","Voldemort","Masque","Serviteur"],
  "Auror": ["Policier","Magie","Sombre","Combat","Ordre"],
  "Harry Potter": ["Cicatrice","Lunettes","Survivant","Éclair","Célèbre"],
  "Neville Londubat": ["Maladroit","Plantes","Courage","Évolution","Rond"],
  "Dumbledore": ["Sage","Barbe","Directeur","Puissant","Secret"],
  "Grindelwald": ["Sombre","Rival","Ancien","Baguette","Européen"],
  "Moldu": ["Non-magique","Ignorant","Normal","Ordinaire","Humain"],
  "Cracmol": ["Mi-magique","Méprisé","Sang","Né","Humain"],
  "Voie 9¾": ["Cachée","Quai","Mur","Train","Passage"],
  "Poudlard Express": ["Train","Rouge","Vapeur","Voyage","Bonbons"],
  "Carte du Marauders": ["Carte","Invisible","Empreintes","Espions","Secrets"],
  "Miroir magique": ["Reflet","Désir","Danger","Piège","Illusion"],
  "Hedwige": ["Blanche","Hibou","Courrier","Fidèle","Harry"],
  "Croûtard": ["Rat","Faux","Trahison","Gris","Peter"],
  "Nagini": ["Serpent","Voldemort","Géant","Horcruxe","Verte"],
  "Le basilic": ["Serpent","Regard","Mortel","Géant","Chambre"],

  // Star Wars
  "Luke": ["Blond","Jedi","Fils","Ferme","Héros"],
  "Anakin": ["Élu","Sombre","Père","Colère","Promesse"],
  "Naboo": ["Planète","Reine","Padmé","Vert","Beau"],
  "Endor": ["Forêt","Ewoks","Lune","Victoire","Vert"],
  "Jedi": ["Sabre","Force","Sagesse","Temple","Lumière"],
  "Sith": ["Sombre","Deux","Passion","Rouge","Maître"],
  "La Force": ["Énergie","Invisible","Pouvoir","Vie","Liant"],
  "Le côté obscur": ["Colère","Puissance","Tentation","Sombre","Chemin"],
  "X-Wing": ["Rouge","Rebelle","Quatre","Ailes","Combat"],
  "TIE Fighter": ["Noir","Empire","Deux","Ailes","Rapide"],
  "L'Empire": ["Noir","Tyranie","Ordre","Stormtrooper","Contrôle"],
  "L'Alliance Rebelle": ["Espoir","Résistance","Étoile","Combat","Liberté"],
  "Étoile de la Mort": ["Sphère","Géant","Laser","Destruction","Empire"],
  "Starkiller": ["Planète","Arme","Premier","Ordre","Détruire"],
  "R2-D2": ["Bleu","Beep","Dôme","Fidèle","Petit"],
  "C-3PO": ["Or","Protocole","Bavard","Humanoïde","Anxieux"],
  "Sabre laser vert": ["Jedi","Maître","Yoda","Luke","Vert"],
  "Sabre laser violet": ["Mace","Unique","Rare","Violet","Maître"],
  "Kashyyyk": ["Wookiee","Forêt","Géant","Chewie","Arbre"],
  "Dagobah": ["Marais","Yoda","Entraînement","Sombre","Isolé"],
  "Tatouïne": ["Désert","Sable","Soleils","Luke","Pauvre"],
  "Jakku": ["Désert","Rey","Épave","Abandonnée","Sable"],
  "Coruscant": ["Capitale","Ville","Sénat","Lumières","Politique"],
  "Ewok": ["Petit","Poilu","Forêt","Mignon","Tribu"],
  "Jawa": ["Désert","Capuche","Droïde","Petit","Marchand"],
  "Dark Maul": ["Tatouage","Deux","Lames","Silence","Rouge"],
  "Compte Doku": ["Cape","Sabre","Courbe","Séparatiste","Ancien"],
  "Sénat Galactique": ["Politique","Discours","Manipulation","Dôme","Votes"],
  "Temple Jedi": ["Formation","Coruscant","Détruit","Ordre","Ancien"],
  "Padawan": ["Apprenti","Tresse","Formation","Jeune","Jedi"],
  "Inquisiteur": ["Chasseur","Sombre","Sabres","Tournant","Empire"],

  // Fallback générique
  "default": ["Mystère","Secret","Caché","Spécial","Unique"],
};

function getBotHintLocal(word, usedHints) {
  const hints = BOT_HINTS[word] || BOT_HINTS["default"];
  const available = hints.filter(h => !usedHints.includes(h));
  const pool = available.length > 0 ? available : hints;
  return pool[Math.floor(Math.random() * pool.length)];
}

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
function UndercoverApp({ onBack }) {
  const [screen, setScreen] = useState("home");
  const [selectedThemeId, setSelectedThemeId] = useState("dbz");
  const [playerCount, setPlayerCount] = useState(5);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhite, setMrWhite] = useState(false);
  const [botCount, setBotCount] = useState(0);
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
    const totalPlayers = playerCount;
    const shuffledChars = shuffle(theme.characters).slice(0, totalPlayers);
    const indices = shuffle(Array.from({ length: totalPlayers }, (_, i) => i));
    const undercoverIndices = indices.slice(0, undercoverCount);
    const mrWhiteIndex = mrWhite ? indices[undercoverCount] : -1;

    // Les bots occupent les dernières positions
    const botStartIndex = totalPlayers - botCount;

    const roles = Array.from({ length: totalPlayers }, (_, i) => {
      const isBot = i >= botStartIndex;
      const role = undercoverIndices.includes(i) ? "undercover"
        : i === mrWhiteIndex ? "mrwhite"
        : "civil";
      const word = role === "undercover" ? pair.undercover
        : role === "mrwhite" ? "???"
        : pair.civil;
      return { name: shuffledChars[i], role, word, isBot };
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
          <HomeScreen theme={theme} selectedThemeId={selectedThemeId} setSelectedThemeId={setSelectedThemeId} onStart={() => setScreen("setup")} onBack={onBack} />
        )}
        {screen === "setup" && (
          <SetupScreen
            theme={theme}
            playerCount={playerCount} setPlayerCount={setPlayerCount}
            undercoverCount={undercoverCount} setUndercoverCount={setUndercoverCount}
            mrWhite={mrWhite} setMrWhite={setMrWhite}
            botCount={botCount} setBotCount={setBotCount}
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
function HomeScreen({ theme, selectedThemeId, setSelectedThemeId, onStart, onBack }) {
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
function SetupScreen({ theme, playerCount, setPlayerCount, undercoverCount, setUndercoverCount, mrWhite, setMrWhite, botCount, setBotCount, onStart, onBack }) {
  const maxUndercover = Math.floor((playerCount - (mrWhite ? 1 : 0)) / 2);
  const safeUC = Math.min(undercoverCount, maxUndercover);
  const humanCount = playerCount - botCount;

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
          <button className="counter-btn" onClick={() => { const n = Math.max(3, playerCount - 1); setPlayerCount(n); setBotCount(Math.min(botCount, n - 1)); }}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: theme.accentText }}>{playerCount}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>joueurs</div>
          </div>
          <button className="counter-btn" onClick={() => setPlayerCount(Math.min(12, playerCount + 1))}>+</button>
        </div>
      </div>

      {/* Bots */}
      <div className="card" style={{ border: "1px solid rgba(100,200,255,0.3)" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#60c8ff", fontSize: 13, letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>🤖 Nombre de bots</div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#666", fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>Les bots génèrent leurs indices via IA</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="counter-btn" onClick={() => setBotCount(Math.max(0, botCount - 1))}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: "#60c8ff" }}>{botCount}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>bot{botCount > 1 ? "s" : ""}</div>
          </div>
          <button className="counter-btn" onClick={() => setBotCount(Math.min(playerCount - 1, botCount + 1))}>+</button>
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
        {playerCount} joueurs • {humanCount} humains • {botCount} bot{botCount > 1 ? "s" : ""} • {safeUC} undercover{safeUC > 1 ? "s" : ""}{mrWhite ? " • 1 Mr. White" : ""}
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
  const isBot = player.isBot;

  function next() {
    if (isLast) onDone();
    else { setCurrentReveal(currentReveal + 1); setShowWord(false); }
  }

  // Auto-skip bots après 1.5s
  useEffect(() => {
    if (isBot) {
      const t = setTimeout(() => next(), 1500);
      return () => clearTimeout(t);
    }
  }, [currentReveal]);

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, paddingTop: 40, minHeight: "100vh" }}>
      {/* Progress */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Joueur {currentReveal + 1} / {players.length}
        </div>
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
          {players.map((p, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 2, flex: 1, maxWidth: 32,
              background: i <= currentReveal ? `linear-gradient(90deg, ${theme.accent}, ${theme.accentAlt})` : "rgba(255,255,255,0.1)"
            }} />
          ))}
        </div>
      </div>

      {/* Player card */}
      <div className="card" style={{ textAlign: "center", padding: 32, border: `1px solid ${isBot ? "rgba(100,200,255,0.3)" : theme.accent + "30"}` }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>
          {isBot ? "🤖" : theme.playerEmojis[currentReveal % theme.playerEmojis.length]}
        </div>
        <h2 style={{ fontSize: 36, margin: 0, color: isBot ? "#60c8ff" : theme.accentText, letterSpacing: 2 }}>{player.name}</h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: "8px 0 0", fontSize: 13, letterSpacing: 1 }}>
          {isBot ? "🤖 Bot — attribution du rôle en cours..." : "Passe le téléphone à ce joueur"}
        </p>
      </div>

      {isBot ? (
        <div className="card" style={{ textAlign: "center", border: "1px solid rgba(100,200,255,0.2)", padding: 20 }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#60c8ff", fontSize: 14, letterSpacing: 1 }}>
            ⚙️ Rôle assigné automatiquement
          </div>
        </div>
      ) : !showWord ? (
        <button onClick={() => setShowWord(true)} style={{
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
          color: "#0a0a1a", border: "none", padding: "16px 32px",
          fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2,
          borderRadius: 8, cursor: "pointer", width: "100%",
          boxShadow: `0 0 20px ${theme.accent}50`, textTransform: "uppercase",
        }}>👁️ VOIR MON MOT</button>
      ) : (
        <div className="word-reveal" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {player.role === "mrwhite" ? (
            <div className="card role-badge-mrwhite" style={{ textAlign: "center", padding: 28 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>❓</div>
              <div style={{ fontSize: 28, letterSpacing: 3, marginBottom: 4 }}>MR. WHITE</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, opacity: 0.8 }}>Tu ne sais rien... bluff !</div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: 40, border: `1px solid ${theme.accent}30` }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Ton mot secret</div>
              <div style={{ fontSize: 42, color: theme.accentText, letterSpacing: 2, fontWeight: "bold", textShadow: `0 0 20px ${theme.accent}80` }}>
                {player.word}
              </div>
            </div>
          )}
          <button onClick={next} style={{
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
  const [botHints, setBotHints] = useState({});
  const [round, setRound] = useState(1);

  function newRound() {
    setBotHints({});
    setRound(r => r + 1);
  }

  const activePlayers = players.filter((_, i) => !eliminated.includes(i));
  const activeUC = activePlayers.filter(p => p.role === "undercover").length;
  const activeCivils = activePlayers.filter(p => p.role === "civil").length;
  const activeMW = activePlayers.filter(p => p.role === "mrwhite").length;

  let gameStatus = null;
  if (activeUC === 0 && activeMW === 0) gameStatus = "civil";
  else if (activeUC >= activeCivils) gameStatus = "undercover";

  function getBotHint(player, index) {
    if (botHints[index]) return;
    const usedHints = Object.values(botHints);
    const hint = player.role === "mrwhite"
      ? ["Peut-être","Intéressant","Hmm","Spécial","Mystérieux","Curieux","Étrange","Disons"][Math.floor(Math.random() * 8)]
      : getBotHintLocal(player.word, usedHints);
    setBotHints(prev => ({ ...prev, [index]: hint }));
  }

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
          const isBot = player.isBot;
          const hint = botHints[i];
          return (
            <div key={i} style={{
              background: isOut ? "rgba(255,255,255,0.02)" : isBot ? "rgba(100,200,255,0.04)" : "rgba(255,255,255,0.06)",
              border: isOut ? "1px solid rgba(255,255,255,0.05)" : isBot ? "1px solid rgba(100,200,255,0.25)" : `1px solid ${theme.accent}30`,
              borderRadius: 12, padding: "14px 18px",
              transition: "all 0.2s",
              opacity: isOut ? 0.35 : 1, filter: isOut ? "grayscale(1)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                onClick={() => !showRoles && (isOut
                  ? setEliminated(prev => prev.filter(x => x !== i))
                  : setEliminated(prev => [...prev, i])
                )}
                style={{ cursor: showRoles ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{isOut ? "💀" : isBot ? "🤖" : theme.playerEmojis[i % theme.playerEmojis.length]}</span>
                  <div>
                    <div style={{ fontSize: 20, letterSpacing: 1, textDecoration: isOut ? "line-through" : "none", color: isOut ? "#666" : isBot ? "#60c8ff" : "#fff" }}>
                      {player.name} {isBot && <span style={{ fontSize: 13, opacity: 0.6 }}>· bot</span>}
                    </div>
                    {showRoles && (
                      <div className="word-reveal" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: player.role === "undercover" ? "#f44336" : player.role === "mrwhite" ? "#ce93d8" : "#4caf50", marginTop: 2 }}>
                        {player.role === "undercover" ? "🕵️ UNDERCOVER" : player.role === "mrwhite" ? "❓ MR. WHITE" : "✅ CIVIL"} — {player.word}
                      </div>
                    )}
                  </div>
                </div>
                {!showRoles && (
                  <div style={{ fontSize: 12, color: isOut ? "#555" : isBot ? "#60c8ff" : theme.accent, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1 }}>
                    {isOut ? "ÉLIMINÉ" : isBot ? "BOT" : "ACTIF"}
                  </div>
                )}
              </div>

              {/* Bot hint section */}
              {isBot && !isOut && (
                <div style={{ marginTop: 10, borderTop: "1px solid rgba(100,200,255,0.1)", paddingTop: 10 }}>
                  {hint ? (
                    <div className="word-reveal" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, color: "#e0f0ff", fontStyle: "italic", textAlign: "center" }}>
                      💬 "{hint}"
                    </div>
                  ) : (
                    <button
                      onClick={() => getBotHint(player, i)}
                      style={{
                        background: "rgba(100,200,255,0.1)",
                        border: "1px solid rgba(100,200,255,0.3)",
                        color: "#60c8ff", borderRadius: 8, padding: "8px 14px",
                        fontFamily: "'Rajdhani', sans-serif", fontSize: 13,
                        letterSpacing: 1, cursor: isLoading ? "wait" : "pointer",
                        width: "100%", textTransform: "uppercase",
                      }}
                    >
                      🤖 Obtenir l'indice du bot
                    </button>
                  )}
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

      {/* Nouvelle manche pour les bots */}
      {players.some(p => p.isBot) && !gameStatus && (
        <BtnSecondary style={{ borderColor: "#60c8ff", color: "#60c8ff" }} onClick={newRound}>
          🤖 NOUVELLE MANCHE (manche {round})
        </BtnSecondary>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <BtnSecondary style={{ flex: 1 }} onClick={onNewGame}>🔄 REJOUER</BtnSecondary>
        <BtnSecondary style={{ flex: 1 }} onClick={onRestart}>🏠 ACCUEIL</BtnSecondary>
      </div>
    </div>
  );
}



// ═══════════════════════════════════════════════════════
// ENCHÈRES — DONNÉES & COMPOSANTS
// ═══════════════════════════════════════════════════════
// ─── DATA ──────────────────────────────────────────────────────────────────────
const SERIES = {
  dbz: {
    id: "dbz",
    label: "Dragon Ball Z",
    emoji: "🔥",
    accent: "#f5a623",
    accentAlt: "#ff6b00",
    accentText: "#ffdd00",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #1a0500 60%, #0d0d2e 100%)",
    characters: [
      { name: "Goku", power: "⚡⚡⚡⚡⚡", desc: "Super Saiyan légendaire", evolution: "Super Saiyan 3" },
      { name: "Vegeta", power: "⚡⚡⚡⚡⚡", desc: "Prince des Saiyans", evolution: "Super Saiyan 2" },
      { name: "Gohan", power: "⚡⚡⚡⚡", desc: "Fils de Goku", evolution: "Super Saiyan 2" },
      { name: "Piccolo", power: "⚡⚡⚡", desc: "Guerrier Namek", evolution: "Namek fusionné" },
      { name: "Trunks", power: "⚡⚡⚡⚡", desc: "Fils de Vegeta du futur", evolution: "Super Saiyan" },
      { name: "Krilin", power: "⚡⚡", desc: "Meilleur ami de Goku", evolution: "Base" },
      { name: "C-18", power: "⚡⚡⚡", desc: "Cyborg redoutable", evolution: "Androïde" },
      { name: "C-17", power: "⚡⚡⚡", desc: "Frère jumeau de C-18", evolution: "Androïde" },
      { name: "Freezer", power: "⚡⚡⚡⚡", desc: "Seigneur de l'univers", evolution: "Forme finale" },
      { name: "Cell", power: "⚡⚡⚡⚡", desc: "Être parfait", evolution: "Forme parfaite" },
      { name: "Buu", power: "⚡⚡⚡⚡⚡", desc: "Majin déchaîné", evolution: "Buu Pur" },
      { name: "Gotenks", power: "⚡⚡⚡⚡", desc: "Fusion de Goten et Trunks", evolution: "Super Saiyan 3" },
      { name: "Vegeto", power: "⚡⚡⚡⚡⚡", desc: "Fusion Goku & Vegeta", evolution: "Super Saiyan" },
      { name: "Gogeta", power: "⚡⚡⚡⚡⚡", desc: "Fusion par Fusion Dance", evolution: "Super Saiyan" },
      { name: "Broly", power: "⚡⚡⚡⚡⚡", desc: "Super Saiyan légendaire", evolution: "Super Saiyan Légendaire" },
      { name: "Bardock", power: "⚡⚡", desc: "Père de Goku", evolution: "Base" },
      { name: "Raditz", power: "⚡⚡", desc: "Frère de Goku", evolution: "Base" },
      { name: "Nappa", power: "⚡⚡", desc: "Guerrier Saiyan d'élite", evolution: "Grande Ape" },
      { name: "Yamcha", power: "⚡", desc: "Ancien rival de Goku", evolution: "Base" },
      { name: "Ten Shin Han", power: "⚡⚡", desc: "Maître des arts martiaux", evolution: "Base" },
      { name: "Janemba", power: "⚡⚡⚡⚡", desc: "Démon maléfique", evolution: "Super Janemba" },
      { name: "Majin Vegeta", power: "⚡⚡⚡⚡", desc: "Vegeta sous contrôle de Babidi", evolution: "Super Saiyan 2 Majin" },
      { name: "Pikkon", power: "⚡⚡⚡", desc: "Guerrier de l'autre monde", evolution: "Base" },
      { name: "Dabura", power: "⚡⚡⚡", desc: "Roi des démons", evolution: "Base" },
    ],
  },
  dbs: {
    id: "dbs",
    label: "Dragon Ball Super",
    emoji: "✨",
    accent: "#38bdf8",
    accentAlt: "#0ea5e9",
    accentText: "#7dd3fc",
    bg: "linear-gradient(135deg, #000510 0%, #050a20 60%, #000510 100%)",
    characters: [
      { name: "Goku Ultra Instinct", power: "⚡⚡⚡⚡⚡", desc: "Maîtrise de l'instinct", evolution: "Ultra Instinct Maîtrisé" },
      { name: "Vegeta Ultra Ego", power: "⚡⚡⚡⚡⚡", desc: "Puissance du dieu", evolution: "Ultra Ego" },
      { name: "Beerus", power: "⚡⚡⚡⚡⚡", desc: "Dieu de la destruction", evolution: "Dieu de la destruction" },
      { name: "Whis", power: "⚡⚡⚡⚡⚡", desc: "Guide angélique", evolution: "Ange" },
      { name: "Zamasu", power: "⚡⚡⚡⚡", desc: "Kaïo immortel corrompu", evolution: "Zamasu Fusionné" },
      { name: "Goku Black", power: "⚡⚡⚡⚡⚡", desc: "Zamasu dans le corps de Goku", evolution: "Super Saiyan Rosé" },
      { name: "Jiren", power: "⚡⚡⚡⚡⚡", desc: "Le plus fort de l'univers 11", evolution: "Pleine Puissance" },
      { name: "Hit", power: "⚡⚡⚡⚡", desc: "Assassin de l'univers 6", evolution: "Base" },
      { name: "Kefla", power: "⚡⚡⚡⚡⚡", desc: "Fusion de Kale et Caulifla", evolution: "Super Saiyan 2" },
      { name: "Toppo", power: "⚡⚡⚡⚡", desc: "Dieu de la destruction en devenir", evolution: "Dieu de la Destruction" },
      { name: "Broly (DBS)", power: "⚡⚡⚡⚡⚡", desc: "Légende qui s'éveille", evolution: "Super Saiyan Légendaire" },
      { name: "Gogeta SS Blue", power: "⚡⚡⚡⚡⚡", desc: "Fusion ultime Super Saiyan Blue", evolution: "Super Saiyan Blue" },
      { name: "Moro", power: "⚡⚡⚡⚡⚡", desc: "Dévoreur de planètes", evolution: "Moro Absorbé" },
      { name: "Granolah", power: "⚡⚡⚡⚡⚡", desc: "Le guerrier le plus fort", evolution: "Cerealien Ultime" },
      { name: "Gas", power: "⚡⚡⚡⚡⚡", desc: "Heeters transformé", evolution: "Forme Finale" },
      { name: "Freezer Black", power: "⚡⚡⚡⚡⚡", desc: "Freezer forme ultime", evolution: "Black Freezer" },
      { name: "Gohan Beast", power: "⚡⚡⚡⚡⚡", desc: "Potentiel libéré ultime", evolution: "Beast" },
      { name: "Cell Max", power: "⚡⚡⚡⚡⚡", desc: "Cell version améliorée", evolution: "Cell Max" },
      { name: "Caulifla", power: "⚡⚡⚡", desc: "Super Saiyan de l'univers 6", evolution: "Super Saiyan 2" },
      { name: "Kale", power: "⚡⚡⚡⚡", desc: "Super Saiyan légendaire U6", evolution: "Super Saiyan Berserk" },
      { name: "Cabba", power: "⚡⚡", desc: "Premier Saiyan de l'univers 6", evolution: "Super Saiyan" },
      { name: "Android 17 (DBS)", power: "⚡⚡⚡⚡", desc: "Vainqueur du tournoi du pouvoir", evolution: "Androïde" },
      { name: "Dyspo", power: "⚡⚡⚡", desc: "Super vitesse de l'univers 11", evolution: "Base" },
      { name: "Vegeto Blue", power: "⚡⚡⚡⚡⚡", desc: "Fusion Super Saiyan Blue", evolution: "Super Saiyan Blue" },
    ],
  },
};


// ─── MAIN APP (MENU) ────────────────────────────────────────────────────────────
export default function App() {
  const [app, setApp] = useState("menu"); // "menu" | "undercover" | "auction"

  if (app === "auction") return <AuctionApp onBack={() => setApp("menu")} />;
  if (app === "undercover") return <UndercoverApp onBack={() => setApp("menu")} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #050005 0%, #0a0015 50%, #050005 100%)",
      fontFamily: "'Bangers', cursive",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      gap: 32,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@500;700&display=swap');
        @keyframes float { from { transform: translateY(0) rotate(0deg); opacity:0.1; } to { transform: translateY(-20px) rotate(10deg); opacity:0.2; } }
        @keyframes glow { 0%,100% { filter: drop-shadow(0 0 8px currentColor); } 50% { filter: drop-shadow(0 0 24px currentColor); } }
        @keyframes slideUp { from { transform: translateY(30px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        .menu-card {
          border-radius: 20px; padding: 28px 24px; cursor: pointer;
          transition: all 0.25s; text-align: center;
          animation: slideUp 0.4s ease forwards;
        }
        .menu-card:hover { transform: translateY(-4px) scale(1.02); }
        .menu-card:active { transform: scale(0.98); }
      `}</style>

      {/* Floating particles */}
      {["🐉","⚡","🔥","✨","💥","🌟","👊"].map((c, i) => (
        <div key={i} style={{
          position: "fixed", left: `${10 + i * 13}%`, top: `${15 + (i % 3) * 25}%`,
          fontSize: `${14 + (i % 3) * 8}px`, opacity: 0.12, pointerEvents: "none",
          animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite alternate`,
        }}>{c}</div>
      ))}

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🎮</div>
        <h1 style={{
          fontSize: 56, letterSpacing: 4, margin: 0, lineHeight: 1,
          background: "linear-gradient(135deg, #f5a623, #ffdd00, #38bdf8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          GAME<br/>HUB
        </h1>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", letterSpacing: 3, fontSize: 13, marginTop: 8, textTransform: "uppercase" }}>
          Choisis ton jeu
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400, zIndex: 1 }}>

        {/* Undercover */}
        <div className="menu-card" style={{
          background: "rgba(245,166,35,0.08)", border: "2px solid rgba(245,166,35,0.4)",
          animationDelay: "0.1s",
        }} onClick={() => setApp("undercover")}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🕵️</div>
          <div style={{ fontSize: 32, letterSpacing: 2, color: "#ffdd00" }}>UNDERCOVER</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#aaa", fontSize: 14, marginTop: 6 }}>
            Jeu de déduction sociale • 3 joueurs min
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
            {["DBZ","Yu-Gi-Oh","Pokémon","Star Wars","GOT","HP"].map(t => (
              <span key={t} style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 6, padding: "2px 8px", fontFamily: "'Rajdhani', sans-serif", fontSize: 11, color: "#f5a623", letterSpacing: 1 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Auction */}
        <div className="menu-card" style={{
          background: "rgba(56,189,248,0.08)", border: "2px solid rgba(56,189,248,0.4)",
          animationDelay: "0.2s",
        }} onClick={() => setApp("auction")}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐉</div>
          <div style={{ fontSize: 32, letterSpacing: 2, color: "#7dd3fc" }}>ENCHÈRES</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#aaa", fontSize: 14, marginTop: 6 }}>
            Achetez vos personnages préférés • 2 joueurs min
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12 }}>
            {["Dragon Ball Z","Dragon Ball Super"].map(t => (
              <span key={t} style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 6, padding: "2px 8px", fontFamily: "'Rajdhani', sans-serif", fontSize: 11, color: "#38bdf8", letterSpacing: 1 }}>{t}</span>
            ))}
          </div>
        </div>

      </div>

      <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#444", fontSize: 12, letterSpacing: 2, zIndex: 1, textAlign: "center" }}>
        D'AUTRES JEUX ARRIVENT BIENTÔT...
      </p>
    </div>
  );
}

// ─── AUCTION APP ───────────────────────────────────────────────────────────────
function AuctionApp({ onBack }) {
  const [screen, setScreen] = useState("setup"); // setup | game | end
  const [selectedSeries, setSelectedSeries] = useState("dbz");
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(["Joueur 1", "Joueur 2"]);
  const [gameData, setGameData] = useState(null);

  const series = SERIES[selectedSeries];

  function updateName(i, val) {
    const n = [...playerNames];
    n[i] = val;
    setPlayerNames(n);
  }

  function startGame() {
    const names = playerNames.slice(0, playerCount);
    const players = names.map(name => ({ name, points: 500, characters: [] }));
    const deck = shuffle([...series.characters]);
    setGameData({ players, deck, currentCard: 0, currentBidder: 0, currentBid: 0, bidHistory: [], phase: "reveal" });
    setScreen("game");
  }

  if (screen === "game") return (
    <AuctionGame
      series={series}
      initialData={gameData}
      onEnd={() => setScreen("end")}
      onBack={onBack}
    />
  );

  // SETUP SCREEN
  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #000510 0%, #050a20 60%, #000510 100%)",
      fontFamily: "'Bangers', cursive", color: "#fff", padding: 24,
      display: "flex", flexDirection: "column", gap: 20, paddingTop: 48,
      maxWidth: 430, margin: "0 auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@500;700&display=swap');
        @keyframes slideUp { from { transform: translateY(30px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        .acard { background: rgba(255,255,255,0.04); border-radius: 16px; padding: 20px; backdrop-filter: blur(10px); animation: slideUp 0.4s ease forwards; }
        .counter-btn { width:44px; height:44px; border-radius:8px; font-size:24px; cursor:pointer; font-family:'Bangers',cursive; transition:all 0.15s; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; }
        .counter-btn:active { transform:scale(0.9); }
        .name-input { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#fff; font-size:16px; font-family:'Rajdhani',sans-serif; width:100%; outline:none; box-sizing:border-box; }
        .name-input:focus { border-color: rgba(56,189,248,0.5); }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#888", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontFamily: "'Bangers', cursive", fontSize: 16 }}>← MENU</button>
        <div>
          <h2 style={{ fontSize: 32, margin: 0, color: "#7dd3fc", letterSpacing: 3 }}>ENCHÈRES</h2>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", margin: 0, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Configuration</p>
        </div>
      </div>

      {/* Series selector */}
      <div className="acard" style={{ border: "1px solid rgba(56,189,248,0.2)" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#38bdf8", fontSize: 13, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>📺 Série</div>
        <div style={{ display: "flex", gap: 10 }}>
          {Object.values(SERIES).map(s => (
            <div key={s.id} onClick={() => setSelectedSeries(s.id)} style={{
              flex: 1, textAlign: "center", padding: "12px 8px", borderRadius: 12, cursor: "pointer",
              background: selectedSeries === s.id ? `${s.accent}20` : "rgba(255,255,255,0.03)",
              border: `2px solid ${selectedSeries === s.id ? s.accent : "rgba(255,255,255,0.1)"}`,
              transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ fontSize: 14, letterSpacing: 1, color: selectedSeries === s.id ? s.accentText : "#aaa", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, color: "#666", marginTop: 2 }}>{s.characters.length} persos</div>
            </div>
          ))}
        </div>
      </div>

      {/* Player count */}
      <div className="acard" style={{ border: "1px solid rgba(56,189,248,0.2)" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#38bdf8", fontSize: 13, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>👥 Nombre de joueurs</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="counter-btn" onClick={() => { const n = Math.max(2, playerCount - 1); setPlayerCount(n); setPlayerNames(prev => prev.slice(0, n).concat(Array.from({length: Math.max(0, n - prev.length)}, (_, i) => `Joueur ${prev.length + i + 1}`))); }}>−</button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 52, lineHeight: 1, color: "#7dd3fc" }}>{playerCount}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>joueurs</div>
          </div>
          <button className="counter-btn" onClick={() => { const n = Math.min(6, playerCount + 1); setPlayerCount(n); setPlayerNames(prev => prev.slice(0, n).concat(Array.from({length: Math.max(0, n - prev.length)}, (_, i) => `Joueur ${prev.length + i + 1}`))); }}>+</button>
        </div>
      </div>

      {/* Player names */}
      <div className="acard" style={{ border: "1px solid rgba(56,189,248,0.2)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#38bdf8", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>✏️ Noms des joueurs</div>
        {Array.from({ length: playerCount }, (_, i) => (
          <input key={i} className="name-input" value={playerNames[i] || ""} onChange={e => updateName(i, e.target.value)} placeholder={`Joueur ${i + 1}`} />
        ))}
      </div>

      {/* Info */}
      <div style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 12, padding: "12px 16px", fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 13, textAlign: "center", letterSpacing: 1 }}>
        500 pts par joueur • 6 personnages max • {series.characters.length} personnages disponibles
      </div>

      <button onClick={startGame} style={{
        background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
        color: "#000", border: "none", padding: "16px 32px",
        fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2,
        borderRadius: 8, cursor: "pointer", width: "100%",
        boxShadow: "0 0 20px rgba(56,189,248,0.4)", textTransform: "uppercase",
      }}>
        🎮 LANCER LES ENCHÈRES
      </button>
    </div>
  );
}

// ─── AUCTION GAME ──────────────────────────────────────────────────────────────
function AuctionGame({ series, initialData, onEnd, onBack }) {
  const [players, setPlayers] = useState(initialData.players);
  const [deck] = useState(initialData.deck);
  const [cardIndex, setCardIndex] = useState(0);
  const [firstBidder, setFirstBidder] = useState(0); // tracks who starts each round
  const [phase, setPhase] = useState("reveal"); // reveal | bidding | sold
  const [currentBid, setCurrentBid] = useState(0);
  const [currentBidder, setCurrentBidder] = useState(null); // index of highest bidder
  const [bidderTurn, setBidderTurn] = useState(0); // whose turn to bid
  const [bidInput, setBidInput] = useState("");
  const [passedPlayers, setPassedPlayers] = useState([]);
  const [log, setLog] = useState([]);
  const [soldTo, setSoldTo] = useState(null);

  const MAX_CHARS = 6;
  const card = deck[cardIndex];

  // Check if game is over: all players have 6 chars OR no more cards
  const gameOver = players.every(p => p.characters.length >= MAX_CHARS) || cardIndex >= deck.length;

  function addLog(msg) {
    setLog(prev => [msg, ...prev].slice(0, 20));
  }

  function activeBidders() {
    return players.map((p, i) => i).filter(i =>
      !passedPlayers.includes(i) && players[i].characters.length < MAX_CHARS
    );
  }

  function startBidding() {
    // Start from firstBidder, find first eligible from that position
    const eligible = players.map((p, i) => i).filter(i => players[i].characters.length < MAX_CHARS);
    const startFrom = eligible.find(i => i >= firstBidder) ?? eligible[0] ?? 0;
    setBidderTurn(startFrom);
    setCurrentBid(0);
    setCurrentBidder(null);
    setPassedPlayers([]);
    setBidInput("");
    setSoldTo(null);
    setPhase("bidding");
    addLog(`🃏 Enchères ouvertes pour ${card.name} !`);
  }

  function placeBid() {
    const amount = parseInt(bidInput);
    if (isNaN(amount) || amount <= currentBid || amount > players[bidderTurn].points) return;
    const playerName = players[bidderTurn].name;
    addLog(`💰 ${playerName} mise ${amount} pts !`);
    setCurrentBid(amount);
    setCurrentBidder(bidderTurn);
    setBidInput("");
    nextBidder(bidderTurn, amount);
  }

  function pass() {
    const playerName = players[bidderTurn].name;
    addLog(`⏭️ ${playerName} passe`);
    const newPassed = [...passedPlayers, bidderTurn];
    setPassedPlayers(newPassed);
    nextBidder(bidderTurn, currentBid, newPassed);
  }

  function nextBidder(currentTurn, bid, passed = passedPlayers) {
    const active = players.map((_, i) => i).filter(i =>
      !passed.includes(i) && players[i].characters.length < MAX_CHARS
    );

    // Only one active bidder left — they win (if they bid, or if no one bid)
    if (active.length === 1 && (bid > 0 || passed.length === players.filter(p => p.characters.length < MAX_CHARS).length - 1)) {
      const winner = active[0];
      if (bid > 0) {
        resolveSale(currentBidder ?? winner, bid);
      } else {
        // Everyone passed, no one bids — skip card
        addLog(`🚫 Personne n'a enchéri, personnage ignoré`);
        nextCard();
      }
      return;
    }

    // If no active bidders left
    if (active.length === 0) {
      if (bid > 0 && currentBidder !== null) {
        resolveSale(currentBidder, bid);
      } else {
        addLog(`🚫 Personne n'a enchéri, personnage ignoré`);
        nextCard();
      }
      return;
    }

    // Find next active bidder after currentTurn
    const idx = active.indexOf(currentTurn);
    const next = active[(idx + 1) % active.length];
    setBidderTurn(next);
  }

  function resolveSale(winnerIndex, amount) {
    const winner = players[winnerIndex];
    addLog(`🏆 ${winner.name} remporte ${card.name} pour ${amount} pts !`);
    setSoldTo(winnerIndex);
    setPhase("sold");
    setPlayers(prev => prev.map((p, i) => {
      if (i !== winnerIndex) return p;
      return { ...p, points: p.points - amount, characters: [...p.characters, { ...card, paid: amount }] };
    }));
  }

  function nextCard() {
    const next = cardIndex + 1;
    setCardIndex(next);
    setPhase("reveal");
    setCurrentBid(0);
    setCurrentBidder(null);
    setPassedPlayers([]);
    setBidInput("");
    setSoldTo(null);
    // Rotate first bidder for next card
    setFirstBidder(prev => (prev + 1) % players.length);
    if (next >= deck.length || players.every(p => p.characters.length >= MAX_CHARS)) {
      onEnd();
    }
  }

  const eligible = players.filter(p => p.characters.length < MAX_CHARS);

  // ── GAME OVER
  if (gameOver) {
    return (
      <div style={{ minHeight: "100vh", background: series.bg, fontFamily: "'Bangers', cursive", color: "#fff", padding: 24, maxWidth: 430, margin: "0 auto" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@500;700&display=swap'); @keyframes slideUp { from { transform:translateY(30px);opacity:0; } to { transform:translateY(0);opacity:1; } } .acard{background:rgba(255,255,255,0.04);border-radius:16px;padding:20px;backdrop-filter:blur(10px);animation:slideUp 0.4s ease forwards;}`}</style>
        <div style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64 }}>🏆</div>
            <h2 style={{ fontSize: 48, margin: 0, color: series.accentText, letterSpacing: 3 }}>FIN DES ENCHÈRES</h2>
          </div>
          {players.map((p, i) => (
            <div key={i} className="acard" style={{ border: `1px solid ${series.accent}40` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 24, letterSpacing: 1, color: series.accentText }}>{p.name}</div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", color: series.accent, fontSize: 18, fontWeight: 700 }}>{p.points} pts restants</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.characters.map((c, j) => (
                  <div key={j} style={{ background: `${series.accent}15`, border: `1px solid ${series.accent}30`, borderRadius: 8, padding: "4px 10px", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: "#ddd" }}>
                    {c.name} <span style={{ color: series.accent }}>({c.paid}pts)</span>
                  </div>
                ))}
                {p.characters.length === 0 && <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#555", fontSize: 13 }}>Aucun personnage</div>}
              </div>
            </div>
          ))}
          <button onClick={onBack} style={{ background: `linear-gradient(135deg, ${series.accent}, ${series.accentAlt})`, color: "#000", border: "none", padding: "16px 32px", fontSize: 22, fontFamily: "'Bangers', cursive", letterSpacing: 2, borderRadius: 8, cursor: "pointer", width: "100%", textTransform: "uppercase" }}>
            🏠 RETOUR AU MENU
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN GAME UI
  return (
    <div style={{ minHeight: "100vh", background: series.bg, fontFamily: "'Bangers', cursive", color: "#fff", maxWidth: 430, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@500;700&display=swap');
        @keyframes slideUp { from { transform:translateY(30px);opacity:0; } to { transform:translateY(0);opacity:1; } }
        @keyframes zoomIn { from { transform:scale(0.7);opacity:0; } to { transform:scale(1);opacity:1; } }
        @keyframes pulse { 0%,100% { box-shadow:0 0 20px ${series.accent}80; } 50% { box-shadow:0 0 40px ${series.accent}; } }
        .acard { background:rgba(255,255,255,0.04); border-radius:16px; padding:20px; backdrop-filter:blur(10px); }
        .bid-input { background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); border-radius:10px; padding:12px 16px; color:#fff; font-size:22px; font-family:'Bangers',cursive; width:100%; outline:none; box-sizing:border-box; text-align:center; letter-spacing:2px; }
        .bid-input:focus { border-color:${series.accent}; }
      `}</style>

      <div style={{ padding: "20px 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#888", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "'Bangers', cursive", fontSize: 14 }}>← MENU</button>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
            Carte {cardIndex + 1} / {Math.min(deck.length, players.length * MAX_CHARS)}
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", color: series.accent, fontSize: 13, letterSpacing: 1 }}>
            {series.emoji} {series.label}
          </div>
        </div>

        {/* Character card */}
        <div className="acard" style={{
          border: `2px solid ${series.accent}60`, textAlign: "center", padding: 32,
          background: `linear-gradient(135deg, rgba(0,0,0,0.4), ${series.accent}08)`,
          animation: "zoomIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>🐉</div>
          <h2 style={{ fontSize: 42, margin: 0, color: series.accentText, letterSpacing: 3 }}>{card.name}</h2>
          <div style={{ fontSize: 24, margin: "8px 0 4px", letterSpacing: 4 }}>{card.power}</div>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#aaa", margin: "0 0 12px", fontSize: 15 }}>{card.desc}</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ background: `${series.accent}20`, border: `1px solid ${series.accent}50`, borderRadius: 8, padding: "4px 12px", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: series.accentText, letterSpacing: 1 }}>
              ✨ {card.evolution}
            </span>
          </div>
        </div>

        {/* Players scores */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {players.map((p, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 80, background: bidderTurn === i && phase === "bidding" ? `${series.accent}20` : "rgba(255,255,255,0.04)",
              border: `1px solid ${bidderTurn === i && phase === "bidding" ? series.accent : "rgba(255,255,255,0.1)"}`,
              borderRadius: 10, padding: "8px 10px", textAlign: "center",
              opacity: passedPlayers.includes(i) ? 0.4 : 1,
              transition: "all 0.2s",
              animation: soldTo === i ? "pulse 0.5s ease" : "none",
            }}>
              <div style={{ fontSize: 14, letterSpacing: 1, color: bidderTurn === i && phase === "bidding" ? series.accentText : "#ccc", marginBottom: 2 }}>
                {p.name} {passedPlayers.includes(i) ? "✗" : bidderTurn === i && phase === "bidding" ? "👆" : ""}
              </div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", color: series.accent, fontWeight: 700, fontSize: 18 }}>{p.points}pts</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#666", fontSize: 11 }}>{p.characters.length}/{MAX_CHARS} persos</div>
            </div>
          ))}
        </div>

        {/* Phase: reveal */}
        {phase === "reveal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "slideUp 0.3s ease" }}>
            <div style={{ textAlign: "center", background: `${series.accent}10`, border: `1px solid ${series.accent}30`, borderRadius: 12, padding: "10px 16px", fontFamily: "'Rajdhani', sans-serif" }}>
              <span style={{ color: "#888", fontSize: 13, letterSpacing: 1, textTransform: "uppercase" }}>Commence à miser : </span>
              <span style={{ color: series.accentText, fontSize: 18, fontWeight: 700 }}>👆 {players[firstBidder]?.name}</span>
            </div>
            <button onClick={startBidding} style={{
              background: `linear-gradient(135deg, ${series.accent}, ${series.accentAlt})`,
              color: "#000", border: "none", padding: "18px 32px",
              fontSize: 24, fontFamily: "'Bangers', cursive", letterSpacing: 2,
              borderRadius: 8, cursor: "pointer", width: "100%",
              boxShadow: `0 0 20px ${series.accent}50`, textTransform: "uppercase",
            }}>
              🔨 LANCER LES ENCHÈRES
            </button>
            <button onClick={nextCard} style={{
              background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.15)",
              padding: "12px", fontSize: 16, fontFamily: "'Bangers', cursive", letterSpacing: 1,
              borderRadius: 8, cursor: "pointer", width: "100%", textTransform: "uppercase",
            }}>
              ⏭️ PASSER CE PERSONNAGE
            </button>
          </div>
        )}

        {/* Phase: bidding */}
        {phase === "bidding" && (
          <div className="acard" style={{ border: `1px solid ${series.accent}40`, animation: "slideUp 0.3s ease", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Enchère actuelle</div>
              <div style={{ fontSize: 48, color: currentBid > 0 ? series.accentText : "#555", letterSpacing: 2 }}>
                {currentBid > 0 ? `${currentBid} pts` : "—"}
              </div>
              {currentBidder !== null && (
                <div style={{ fontFamily: "'Rajdhani', sans-serif", color: series.accent, fontSize: 13 }}>par {players[currentBidder].name}</div>
              )}
            </div>

            <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 14 }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", color: series.accentText, fontSize: 16, letterSpacing: 1, marginBottom: 10, textAlign: "center" }}>
                👆 Tour de {players[bidderTurn]?.name} ({players[bidderTurn]?.points} pts disponibles)
              </div>
              <input
                className="bid-input"
                type="number"
                min={currentBid + 1}
                max={players[bidderTurn]?.points}
                value={bidInput}
                onChange={e => setBidInput(e.target.value)}
                placeholder={`> ${currentBid} pts`}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button onClick={placeBid} style={{
                  flex: 2, background: `linear-gradient(135deg, ${series.accent}, ${series.accentAlt})`,
                  color: "#000", border: "none", padding: "14px", fontSize: 20,
                  fontFamily: "'Bangers', cursive", letterSpacing: 2, borderRadius: 8, cursor: "pointer", textTransform: "uppercase",
                }}>💰 MISER</button>
                <button onClick={pass} style={{
                  flex: 1, background: "rgba(255,255,255,0.06)", color: "#aaa",
                  border: "1px solid rgba(255,255,255,0.15)", padding: "14px", fontSize: 20,
                  fontFamily: "'Bangers', cursive", letterSpacing: 1, borderRadius: 8, cursor: "pointer", textTransform: "uppercase",
                }}>PASSER</button>
              </div>
            </div>
          </div>
        )}

        {/* Phase: sold */}
        {phase === "sold" && soldTo !== null && (
          <div className="acard" style={{ textAlign: "center", border: "2px solid #4caf50", background: "rgba(76,175,80,0.1)", animation: "zoomIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
            <div style={{ fontSize: 32, color: "#a5d6a7", letterSpacing: 2 }}>{players[soldTo].name}</div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 16, marginTop: 4 }}>
              remporte <span style={{ color: series.accentText }}>{card.name}</span> pour <span style={{ color: "#4caf50" }}>{currentBid} pts</span>
            </div>
            <button onClick={nextCard} style={{
              background: "linear-gradient(135deg, #4caf50, #2e7d32)",
              color: "#fff", border: "none", padding: "14px 32px",
              fontSize: 20, fontFamily: "'Bangers', cursive", letterSpacing: 2,
              borderRadius: 8, cursor: "pointer", width: "100%", marginTop: 16, textTransform: "uppercase",
            }}>➡️ PERSONNAGE SUIVANT</button>
          </div>
        )}

        {/* Log */}
        {log.length > 0 && (
          <div className="acard" style={{ border: "1px solid rgba(255,255,255,0.08)", maxHeight: 160, overflowY: "auto" }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", color: "#888", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Historique</div>
            {log.map((entry, i) => (
              <div key={i} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: i === 0 ? "#fff" : "#666", padding: "2px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {entry}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
