// ═══════════════════════════════════════════════════════════════
// STARCHIP PROCEDURAL NAME GENERATOR
// Edit the word pools below to customize ship names!
//
// Shapes & Colors & Temperaments: indexed 0–15
// Weapons, Passives, Maneuvers: keyed by string (e.g. 'shotgun')
//
// The generator picks 1 adjective from one trait's pool
// + 1 noun from a different trait's pool.
// Same card stats always produce the same name (seeded RNG).
// ═══════════════════════════════════════════════════════════════

const SHIP_NAME_BANK = {

  // ─── SHAPES (design index 0–15) ───────────────────────────
  shape: [
    // 0: FIGHTER
    { adj: ['Battle','Valiant','Militant','Warborn','Armed','Combat','Defiant','Iron'],
      noun: ['Warrior','Centurion','Gladiator','Champion','Vanguard','Sentinel','Warden','Soldier'] },
    // 1: LEAF
    { adj: ['Verdant','Organic','Living','Budding','Wild','Natural','Rooted','Floral'],
      noun: ['Sapling','Thorn','Petal','Blossom','Sprout','Bramble','Fern','Ivy'] },
    // 2: BOMBER
    { adj: ['Heavy','Explosive','Rumbling','Massive','Hulking','Loaded','Booming','Dense'],
      noun: ['Payload','Ordnance','Demolisher','Crater','Bombard','Warhead','Siege','Arsenal'] },
    // 3: ARROW
    { adj: ['Swift','Piercing','Sleek','Keen','Streaking','Darting','Fleet','Sharp'],
      noun: ['Bolt','Javelin','Quarrel','Spear','Dart','Lance','Needle','Shaft'] },
    // 4: HEART
    { adj: ['Blazing','Burning','Pulsing','Vital','Fierce','Passionate','Driven','Brave'],
      noun: ['Ember','Core','Flame','Spark','Pulse','Beacon','Forge','Crucible'] },
    // 5: JET
    { adj: ['Sonic','Roaring','Supersonic','Screaming','Afterburn','Turbo','Express','Mach'],
      noun: ['Comet','Streak','Contrail','Burner','Throttle','Afterglow','Turbine','Thruster'] },
    // 6: MONSTER
    { adj: ['Fearsome','Monstrous','Savage','Feral','Ravenous','Primal','Bestial','Dread'],
      noun: ['Behemoth','Leviathan','Titan','Hydra','Chimera','Kraken','Goliath','Wyrm'] },
    // 7: EDGE
    { adj: ['Angular','Serrated','Jagged','Bladed','Honed','Cutting','Edged','Whetted'],
      noun: ['Shard','Blade','Razor','Cleaver','Scalpel','Wedge','Splinter','Barb'] },
    // 8: GHOST
    { adj: ['Spectral','Phantom','Hollow','Haunted','Ethereal','Fading','Silent','Unseen'],
      noun: ['Wraith','Specter','Phantom','Shade','Apparition','Revenant','Banshee','Wisp'] },
    // 9: POINT
    { adj: ['Precise','Focused','Pinpoint','Acute','Narrow','Exact','Fine','Tipped'],
      noun: ['Spire','Apex','Vertex','Needle','Spike','Pinnacle','Stiletto','Prong'] },
    // 10: TWISTER
    { adj: ['Spinning','Spiraling','Whirling','Cyclonic','Rotating','Twisted','Gyrating','Coiling'],
      noun: ['Vortex','Tornado','Maelstrom','Spiral','Cyclone','Tempest','Whirlwind','Funnel'] },
    // 11: SURVIVOR
    { adj: ['Enduring','Resilient','Hardened','Scarred','Tested','Unbroken','Gritty','Tenacious'],
      noun: ['Remnant','Holdout','Bastion','Bulwark','Anchor','Pillar','Relic','Veteran'] },
    // 12: HAWK
    { adj: ['Predatory','Soaring','Keen-Eyed','Swooping','Raptor','Hunting','Taloned','Circling'],
      noun: ['Falcon','Raptor','Talon','Eagle','Osprey','Harrier','Kestrel','Merlin'] },
    // 13: FRIGATE
    { adj: ['Imposing','Naval','Broadside','Armored','Seafaring','Flagship','Decked','Gallant'],
      noun: ['Frigate','Dreadnought','Corvette','Galleon','Cruiser','Destroyer','Brigantine','Armada'] },
    // 14: CRESCENT
    { adj: ['Lunar','Curved','Waning','Arcing','Crescent','Horned','Bowed','Sweeping'],
      noun: ['Eclipse','Moonrise','Crescent','Scythe','Sickle','Arc','Halo','Corona'] },
    // 15: ENFORCER
    { adj: ['Ruthless','Unyielding','Stern','Ironclad','Formidable','Commanding','Absolute','Rigid'],
      noun: ['Marshal','Enforcer','Arbiter','Warden','Judge','Inquisitor','Constable','Regent'] },
  ],

  // ─── COLORS (color index 0–15) ────────────────────────────
  color: [
    // 0: RED
    { adj: ['Crimson','Scarlet','Bloodied','Ruby','Infernal','Smoldering','Molten','Searing'],
      noun: ['Inferno','Blaze','Furnace','Magma','Cinder','Volcano','Pyre','Flare'] },
    // 1: GREEN
    { adj: ['Emerald','Verdant','Mossy','Jade','Lush','Overgrown','Toxic','Jungle'],
      noun: ['Canopy','Thicket','Grove','Moss','Jungle','Glade','Marsh','Vine'] },
    // 2: BLUE
    { adj: ['Cobalt','Azure','Glacial','Deep','Oceanic','Frozen','Cerulean','Sapphire'],
      noun: ['Abyss','Glacier','Depths','Tide','Frost','Riptide','Iceberg','Current'] },
    // 3: ORANGE
    { adj: ['Amber','Smoldering','Russet','Copper','Autumn','Harvest','Scorched','Tawny'],
      noun: ['Sunset','Bonfire','Hearth','Lantern','Campfire','Ember','Kiln','Dusk'] },
    // 4: PINK
    { adj: ['Rosy','Blushing','Coral','Flushed','Dawn','Pastel','Vibrant','Neon'],
      noun: ['Aurora','Bloom','Blush','Petal','Dawn','Rosette','Orchid','Dahlia'] },
    // 5: CYAN
    { adj: ['Electric','Frigid','Aqua','Neon','Shimmering','Teal','Luminous','Glinting'],
      noun: ['Circuit','Current','Plasma','Signal','Conduit','Filament','Prism','Relay'] },
    // 6: LIME
    { adj: ['Acid','Caustic','Toxic','Venomous','Corrosive','Volatile','Reactive','Bitter'],
      noun: ['Catalyst','Toxin','Reagent','Venom','Acid','Enzyme','Solvent','Compound'] },
    // 7: CORAL
    { adj: ['Warm','Tropical','Sunlit','Coastal','Radiant','Glowing','Burnished','Balmy'],
      noun: ['Lagoon','Reef','Atoll','Shoal','Tideway','Grotto','Cove','Sandbar'] },
    // 8: PURPLE
    { adj: ['Royal','Mystic','Regal','Arcane','Imperial','Sovereign','Ancient','Noble'],
      noun: ['Throne','Crown','Scepter','Monarch','Dynasty','Dominion','Empire','Sanctum'] },
    // 9: WHITE
    { adj: ['Pale','Blinding','Pristine','Stark','Pure','Radiant','Bleached','Ivory'],
      noun: ['Haze','Zenith','Void','Blank','Frost','Glare','Bone','Chalk'] },
    // 10: YELLOW
    { adj: ['Solar','Blazing','Golden','Sizzling','Brilliant','Luminous','Flashing','Dazzling'],
      noun: ['Sunburst','Lightning','Flash','Flicker','Spark','Ray','Beam','Photon'] },
    // 11: MAGENTA
    { adj: ['Vivid','Exotic','Intense','Fluorescent','Lurid','Fierce','Pulsing','Ultraviolet'],
      noun: ['Prism','Anomaly','Mirage','Illusion','Paradox','Enigma','Glitch','Rift'] },
    // 12: SKY
    { adj: ['Soaring','Aerial','Boundless','Cloudborn','Windswept','Drifting','Open','High'],
      noun: ['Horizon','Stratosphere','Gust','Zephyr','Altitude','Updraft','Breeze','Summit'] },
    // 13: GOLD
    { adj: ['Gilded','Precious','Lustrous','Opulent','Gleaming','Resplendent','Ornate','Regal'],
      noun: ['Treasure','Bullion','Ingot','Doubloon','Sovereign','Fortune','Hoard','Tribute'] },
    // 14: SILVER
    { adj: ['Chrome','Quicksilver','Polished','Mercurial','Tempered','Sterling','Bright','Mirrored'],
      noun: ['Mercury','Mirror','Alloy','Nickel','Steel','Tinsel','Plate','Edge'] },
    // 15: VIOLET
    { adj: ['Twilight','Shadowed','Dusky','Deep','Crepuscular','Amethyst','Midnight','Nebular'],
      noun: ['Nebula','Dusk','Twilight','Shadow','Nightfall','Eventide','Umbra','Gloaming'] },
  ],

  // ─── WEAPONS (19 — keyed by WEAPON_DEFS key) ─────────────
  weapon: {
    basic:        { adj: ['Steady','Reliable','Standard','Proven','Trusted','Classic','Veteran','Stock'],          noun: ['Standard','Sidearm','Workhorse','Staple','Mainline','Baseline','Foundation','Bedrock'] },
    shotgun:      { adj: ['Buckshot','Scattergun','Close-Range','Boomstick','Wide','Pelting','Thundering','Blasting'], noun: ['Scatter','Buckshot','Slug','Shredder','Boomstick','Pelter','Ripper','Buster'] },
    grenade:      { adj: ['Explosive','Detonating','Fragmenting','Shrapnel','Bursting','Incendiary','Volatile','Cluster'], noun: ['Grenade','Mortar','Shell','Mine','Bomblet','Fragment','Canister','Shrapnel'] },
    triple:       { adj: ['Triple','Three-Barreled','Tri-Fire','Spreading','Fanning','Multi-Shot','Widening','Broad'], noun: ['Trident','Trifecta','Trilogy','Triplet','Trio','Triumvirate','Triangle','Treble'] },
    homing:       { adj: ['Tracking','Seeking','Locked','Guided','Pursuing','Homing','Stalking','Targeting'],     noun: ['Missile','Seeker','Hunter','Interceptor','Tracker','Predator','Stalker','Pursuer'] },
    alternating:  { adj: ['Twin','Dual','Paired','Double','Mirrored','Parallel','Coupled','Tandem'],              noun: ['Barrage','Volley','Salvo','Broadside','Cascade','Battery','Fusillade','Crossfire'] },
    flamethrower: { adj: ['Scorching','Blazing','Hellfire','Searing','Charring','Napalm','Blistering','White-Hot'], noun: ['Dragon','Inferno','Hellfire','Firestorm','Immolation','Blaze','Conflagration','Furnace'] },
    sniper:       { adj: ['Distant','Marksman','Telescopic','Long-Range','Silent','Patient','Lethal','Clinical'],  noun: ['Marksman','Sharpshooter','Longshot','Deadeye','Crosshair','Scope','Bullseye','Caliber'] },
    chaotic:      { adj: ['Chaotic','Erratic','Unhinged','Frenzied','Random','Scrambled','Turbulent','Glitched'], noun: ['Havoc','Chaos','Mayhem','Frenzy','Scramble','Disorder','Pandemonium','Entropy'] },
    scrap:        { adj: ['Jagged','Junked','Cobbled','Makeshift','Salvaged','Patchwork','Rusty','Improvised'],    noun: ['Junkyard','Scrapheap','Wreckage','Salvage','Debris','Shrapnel','Rubble','Refuse'] },
    snake:        { adj: ['Serpentine','Slithering','Winding','Coiling','Viper','Fanged','Venomous','Sinuous'],    noun: ['Serpent','Viper','Cobra','Sidewinder','Mamba','Asp','Fang','Python'] },
    gatling:      { adj: ['Relentless','Drumming','Unceasing','Hammering','Grinding','Rattling','Chattering','Pelting'], noun: ['Gatling','Minigun','Chaingun','Turret','Hailstorm','Buzzsaw','Jackhammer','Grinder'] },
    boomerang:    { adj: ['Returning','Curved','Arcing','Looping','Sweeping','Orbiting','Recurving','Hooking'],    noun: ['Boomerang','Arc','Hook','Return','Orbit','Curveball','Sling','Ricochet'] },
    doublehelix:  { adj: ['Helical','Twisting','Intertwined','Spiraling','Braided','Weaving','Entwined','Woven'], noun: ['Helix','Strand','Spiral','Braid','Weave','Double','Corkscrew','Twist'] },
    cyclone:      { adj: ['Whirling','Storming','Gusting','Howling','Raging','Swirling','Blustering','Churning'], noun: ['Gale','Typhoon','Hurricane','Squall','Monsoon','Twister','Dustdevil','Sirocco'] },
    crossshot:    { adj: ['Converging','Crossing','Flanking','Pincer','Intersecting','Angled','Bracketing','Opposing'], noun: ['Crossfire','Pincer','Scissors','Intersect','Junction','Nexus','Vertex','Crux'] },
    lightning:    { adj: ['Voltaic','Crackling','Thunderous','Arcing','Surging','Galvanic','Shocking','Charged'],  noun: ['Thunder','Bolt','Shock','Surge','Arc','Jolt','Discharge','Capacitor'] },
    concussive:   { adj: ['Concussive','Shattering','Rupturing','Fracturing','Splintering','Cracking','Quaking','Rending'], noun: ['Shockwave','Impact','Tremor','Rupture','Fracture','Quake','Breaker','Rift'] },
    drone:        { adj: ['Swarming','Autonomous','Networked','Buzzing','Droning','Orbiting','Hovering','Linked'], noun: ['Swarm','Hive','Fleet','Cluster','Brood','Colony','Network','Array'] },
  },

  // ─── PASSIVES (25 — keyed by PASSIVE_DEFS key) ───────────
  passive: {
    scrapRepair:  { adj: ['Patched','Welded','Riveted','Hammered','Bolted','Mended','Scavenged','Reinforced'],    noun: ['Patchwork','Scrapyard','Weld','Rivet','Salvage','Repair','Tinker','Anvil'] },
    bioHull:      { adj: ['Regenerating','Organic','Symbiotic','Adaptive','Growing','Mutating','Healing','Evolving'], noun: ['Organism','Symbiont','Parasite','Colony','Growth','Mutation','Membrane','Cocoon'] },
    nitro:        { adj: ['Boosted','Supercharged','Nitrous','Turbocharged','Afterburning','Redlining','Injected','Ramjet'], noun: ['Rocket','Booster','Dragster','Nitro','Overdrive','Accelerant','Propellant','Thrust'] },
    gyro:         { adj: ['Stabilized','Balanced','Centered','Calibrated','Steady','Level','Tuned','Aligned'],     noun: ['Gyroscope','Compass','Pendulum','Balance','Fulcrum','Axis','Stabilizer','Equilibrium'] },
    shield:       { adj: ['Shielded','Fortified','Armored','Protected','Guarded','Warded','Plated','Reinforced'],  noun: ['Shield','Barrier','Rampart','Aegis','Buckler','Phalanx','Fortress','Citadel'] },
    piercing:     { adj: ['Piercing','Penetrating','Perforating','Punching','Impaling','Skewering','Lancing','Boring'], noun: ['Harpoon','Lancet','Rapier','Stiletto','Awl','Spike','Skewer','Impaler'] },
    fierce:       { adj: ['Fierce','Ferocious','Vicious','Brutal','Savage','Ruthless','Wrathful','Furious'],       noun: ['Fury','Wrath','Rage','Carnage','Havoc','Slaughter','Rampage','Onslaught'] },
    hitInvuln:    { adj: ['Phasing','Dimensional','Displaced','Shifting','Warping','Flickering','Temporal','Unstable'], noun: ['Phase','Dimension','Rift','Warp','Shift','Blink','Flicker','Glitch'] },
    scope:        { adj: ['Far-Seeing','Eagle-Eyed','Watchful','Vigilant','Hawkeyed','Scoped','Magnified','Scanning'], noun: ['Outlook','Vista','Lookout','Perch','Watchtower','Observatory','Spyglass','Sentry'] },
    titanium:     { adj: ['Titanium','Hardened','Tempered','Annealed','Forged','Plated','Dense','Alloyed'],        noun: ['Anvil','Ingot','Plate','Alloy','Carbide','Tungsten','Bastion','Bulkhead'] },
    stealth:      { adj: ['Hidden','Cloaked','Invisible','Lurking','Masked','Covert','Stealthy','Shrouded'],       noun: ['Shadow','Phantom','Ghost','Specter','Cloak','Veil','Mirage','Shroud'] },
    sparkDrive:   { adj: ['Sparking','Energized','Supercharged','Amped','Wired','Overclocked','Powered','Igniting'], noun: ['Dynamo','Generator','Spark','Capacitor','Amplifier','Transformer','Reactor','Coil'] },
    drillbore:    { adj: ['Boring','Drilling','Tunneling','Grinding','Burrowing','Excavating','Penetrating','Gouging'], noun: ['Auger','Drill','Borer','Excavator','Tunneler','Grinder','Digger','Piercer'] },
    iceRounds:    { adj: ['Frozen','Icy','Subzero','Glacial','Frosted','Frigid','Arctic','Bitter'],               noun: ['Avalanche','Blizzard','Permafrost','Icicle','Snowdrift','Hailstone','Tundra','Frostbite'] },
    jamRounds:    { adj: ['Jamming','Disrupting','Interfering','Scrambling','Garbling','Blocking','Fouling','Clogging'], noun: ['Jammer','Scrambler','Disruptor','Interference','Static','Noise','Blocker','Dampener'] },
    incendiary:   { adj: ['Burning','Smoldering','Fiery','Ashen','Charred','Flaming','Fuming','Ignited'],         noun: ['Wildfire','Cinderstorm','Ashfall','Burnout','Brushfire','Firebrand','Blister','Scorch'] },
    obliterator:  { adj: ['Obliterating','Annihilating','Devastating','Ruinous','Cataclysmic','Apocalyptic','Dooming','Ravaging'], noun: ['Oblivion','Annihilation','Devastation','Ruin','Cataclysm','Apocalypse','Doomsday','Extinction'] },
    absorber:     { adj: ['Consuming','Devouring','Draining','Hungering','Absorbing','Nullifying','Voracious','Ravenous'], noun: ['Abyss','Maw','Void','Singularity','Vacuum','Siphon','Drain','Nullifier'] },
    detonator:    { adj: ['Detonating','Volatile','Unstable','Triggered','Primed','Armed','Ticking','Hair-Trigger'], noun: ['Detonator','Bomb','Charge','Primer','Fuse','Trigger','Payload','Ignition'] },
    stunShock:    { adj: ['Stunning','Paralyzing','Numbing','Freezing','Locking','Seizing','Binding','Disabling'], noun: ['Stun','Paralysis','Lockdown','Seizure','Freeze','Gridlock','Clamp','Snare'] },
    override:     { adj: ['Hijacked','Overridden','Corrupted','Hacked','Subverted','Infected','Compromised','Breached'], noun: ['Virus','Exploit','Malware','Backdoor','Rootkit','Trojan','Worm','Override'] },
    cryoCoolant:  { adj: ['Rapid-Cycling','Quick-Loading','Fast-Chambered','Oiled','Greased','Streamlined','Efficient','Smooth'], noun: ['Piston','Cylinder','Crankshaft','Flywheel','Camshaft','Clockwork','Mechanism','Engine'] },
    flagship:     { adj: ['Grand','Towering','Mighty','Colossal','Supreme','Capital','Paramount','Monumental'],    noun: ['Flagship','Colossus','Titan','Juggernaut','Dreadnought','Mammoth','Fortress','Monument'] },
    blindRounds:  { adj: ['Blinding','Dazzling','Glaring','Flashing','Searing','Brilliant','Strobing','Radiant'], noun: ['Flashbang','Glare','Strobe','Flare','Blindside','Whiteout','Sunspot','Starburst'] },
    bouncyShot:   { adj: ['Ricocheting','Bouncing','Deflecting','Rebounding','Caroming','Skipping','Glancing','Angled'], noun: ['Ricochet','Bounce','Rebound','Carom','Deflection','Pinball','Billiard','Springback'] },
  },

  // ─── MANEUVERS (16 — keyed by MANEUVER_DEFS key) ─────────
  maneuver: {
    hyperSpeed:       { adj: ['Warping','Lightspeed','Hypersonic','Blurring','Teleporting','Phasing','Vanishing','Instant'], noun: ['Warp','Hyperspace','Lightspeed','Flash','Blink','Jump','Leap','Streak'] },
    barrelRoll:       { adj: ['Rolling','Acrobatic','Tumbling','Looping','Aerobatic','Nimble','Flipping','Deft'],  noun: ['Barrel','Roll','Loop','Corkscrew','Tumble','Somersault','Cartwheel','Aileron'] },
    quickTurn:        { adj: ['Agile','Snapping','Pivoting','Darting','Jinking','Dodging','Feinting','Evasive'],   noun: ['Pivot','Jink','Dodge','Feint','Sidestep','Cutback','Switchback','Snap'] },
    turretMode:       { adj: ['Entrenched','Fortified','Anchored','Locked','Planted','Rooted','Immovable','Dug-In'], noun: ['Turret','Bunker','Pillbox','Emplacement','Stronghold','Outpost','Redoubt','Bastion'] },
    serpentine:       { adj: ['Weaving','Zigzagging','Snaking','Undulating','Strafing','Sidestepping','Eluding','Slinking'], noun: ['Serpent','Zigzag','Slalom','Weave','Slink','Sway','Serpentine','Meander'] },
    panic:            { adj: ['Panicked','Frantic','Desperate','Hysterical','Manic','Crazed','Delirious','Unhinged'], noun: ['Panic','Frenzy','Hysteria','Rampage','Tantrum','Outburst','Meltdown','Breakdown'] },
    rapidFire:        { adj: ['Rapid','Staccato','Machinegun','Frantic','Blistering','Sustained','Unrelenting','Pounding'], noun: ['Barrage','Drumfire','Hailstorm','Onslaught','Blitz','Torrent','Deluge','Firestorm'] },
    spinOut:          { adj: ['Spiraling','Careening','Fishtailing','Drifting','Skidding','Swerving','Sliding','Veering'], noun: ['Spinout','Drift','Skid','Fishtail','Swerve','Slide','Whiplash','Tailspin'] },
    reverse:          { adj: ['Backward','Retreating','Reversed','Contrary','Inverse','Mirrored','Counter','Retrograde'], noun: ['Reversal','Retreat','Backtrack','Recoil','Regression','Fallback','Withdrawal','Rearguard'] },
    smokescreen:      { adj: ['Obscured','Hazy','Fogbound','Misty','Smoky','Veiled','Clouded','Murky'],           noun: ['Fog','Smokescreen','Haze','Mist','Murk','Smog','Cloud','Shroud'] },
    doubleTeam:       { adj: ['Mirrored','Cloned','Doubled','Split','Duplicated','Twinned','Copied','Echoed'],     noun: ['Doppelganger','Clone','Double','Decoy','Twin','Echo','Replica','Impostor'] },
    dumpDebris:       { adj: ['Littering','Dumping','Jettisoned','Trailing','Scattered','Discarded','Ejected','Strewn'], noun: ['Debris','Jetsam','Flotsam','Wake','Trail','Litter','Driftwood','Chaff'] },
    reflectorShields: { adj: ['Reflecting','Mirroring','Rebounding','Reversing','Glinting','Deflecting','Gleaming','Polished'], noun: ['Reflector','Mirror','Prism','Shield','Deflector','Lens','Facet','Surface'] },
    repulsor:         { adj: ['Repelling','Blasting','Shoving','Pulsing','Pushing','Expelling','Ejecting','Forceful'], noun: ['Repulsor','Pushback','Shockwave','Gust','Blast','Pulse','Thrust','Wave'] },
    shockPulse:       { adj: ['Pulsing','Shockwave','Radiating','Emanating','Rippling','Throbbing','Resonant','Quaking'], noun: ['Pulse','Shockwave','Ripple','Tremor','Quake','Resonance','Emanation','Vibration'] },
    mineField:        { adj: ['Trapped','Mined','Rigged','Laid','Lurking','Buried','Concealed','Scattered'],       noun: ['Minefield','Trap','Snare','Ambush','Pitfall','Deadfall','Hazard','Tripwire'] },
  },

  // ─── TEMPERAMENTS (temperament index 0–15) ────────────────
  temperament: [
    // 0: Berserker
    { adj: ['Berserk','Raging','Frenzied','Furious','Rabid','Wrathful','Bloodthirsty','Rampaging'],
      noun: ['Berserker','Fury','Rage','Rampage','Carnage','Havoc','Massacre','Mayhem'] },
    // 1: Sniper
    { adj: ['Patient','Calculated','Deliberate','Measured','Methodical','Precise','Surgical','Unhurried'],
      noun: ['Marksman','Deadeye','Sharpshooter','Sniper','Assassin','Hunter','Predator','Stalker'] },
    // 2: Soldier
    { adj: ['Disciplined','Regimented','Trained','Professional','Drilled','Ordered','Dutiful','Loyal'],
      noun: ['Trooper','Legionnaire','Infantry','Militia','Brigade','Battalion','Regiment','Platoon'] },
    // 3: Brawler
    { adj: ['Brawling','Scrappy','Bruising','Rough','Rowdy','Pugnacious','Belligerent','Combative'],
      noun: ['Brawler','Slugger','Bruiser','Scrapper','Pugilist','Boxer','Roughneck','Ruffian'] },
    // 4: Dancer
    { adj: ['Graceful','Elegant','Fluid','Flowing','Lithe','Nimble','Poised','Supple'],
      noun: ['Dancer','Waltz','Pirouette','Ballet','Tango','Minuet','Arabesque','Flourish'] },
    // 5: Tactician
    { adj: ['Strategic','Cunning','Shrewd','Calculating','Devious','Crafty','Scheming','Wily'],
      noun: ['Strategist','Gambit','Ploy','Scheme','Checkmate','Stratagem','Ruse','Endgame'] },
    // 6: Scrapper
    { adj: ['Tenacious','Stubborn','Relentless','Dogged','Gritty','Persistent','Unyielding','Scrappy'],
      noun: ['Underdog','Scrapper','Survivor','Fighter','Wildcat','Mongrel','Stray','Outcast'] },
    // 7: Bruiser
    { adj: ['Hulking','Towering','Crushing','Bludgeoning','Thundering','Stomping','Smashing','Walloping'],
      noun: ['Bruiser','Tank','Juggernaut','Enforcer','Brute','Ogre','Colossus','Heavyweight'] },
    // 8: Ghost
    { adj: ['Ghostly','Invisible','Vanishing','Fleeting','Intangible','Elusive','Untouchable','Incorporeal'],
      noun: ['Ghost','Phantom','Specter','Shadow','Wraith','Spirit','Shade','Haunt'] },
    // 9: Wildcard
    { adj: ['Chaotic','Unpredictable','Random','Volatile','Erratic','Unstable','Reckless','Impulsive'],
      noun: ['Wildcard','Joker','Maverick','Rogue','Rebel','Anarchist','Gamble','Dice'] },
    // 10: Bombardier
    { adj: ['Bombing','Carpet-Bombing','Pounding','Hammering','Raining','Shelling','Strafing','Pelting'],
      noun: ['Bombardier','Airstrike','Sortie','Barrage','Bombing','Salvo','Cannonade','Fusillade'] },
    // 11: Razor
    { adj: ['Lethal','Surgical','Deadly','Razor-Sharp','Fatal','Incisive','Keen','Merciless'],
      noun: ['Razor','Scalpel','Stiletto','Blade','Edge','Lancet','Rapier','Katana'] },
    // 12: Acrobat
    { adj: ['Nimble','Agile','Athletic','Acrobatic','Limber','Springy','Flexible','Light-Footed'],
      noun: ['Acrobat','Gymnast','Tumbler','Contortionist','Trapeze','Parkour','Stunt','Daredevil'] },
    // 13: Guardian
    { adj: ['Protective','Watchful','Vigilant','Steadfast','Stalwart','Devoted','Unwavering','Resolute'],
      noun: ['Guardian','Protector','Keeper','Defender','Sentinel','Custodian','Shield','Safeguard'] },
    // 14: Everyman
    { adj: ['Average','Common','Ordinary','Plain','Simple','Modest','Humble','Everyday'],
      noun: ['Nomad','Wanderer','Drifter','Traveler','Pilgrim','Vagabond','Rover','Ranger'] },
    // 15: Enforcer
    { adj: ['Imposing','Heavy-Handed','Authoritative','Dominating','Oppressive','Commanding','Overbearing','Intimidating'],
      noun: ['Enforcer','Warden','Overseer','Taskmaster','Dictator','Tyrant','Overlord','Commander'] },
  ],
};


// ─── SEEDED RNG (don't need to edit below this line) ────────

function _nameGenSeed(d, c, wk, pk, mk, t) {
  let h = 2166136261;
  h ^= d; h = Math.imul(h, 16777619); h = h >>> 0;
  h ^= c; h = Math.imul(h, 16777619); h = h >>> 0;
  h ^= t; h = Math.imul(h, 16777619); h = h >>> 0;
  const str = wk + ':' + pk + ':' + mk;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
    h = h >>> 0;
  }
  return h;
}

function _nameGenRand(seed, iteration) {
  let h = seed + iteration * 374761393;
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  h = (h ^ (h >>> 16)) >>> 0;
  return h;
}

// generateShipName(designIdx, colorIdx, weaponKey, passiveKey, maneuverKey, temperamentIdx)
function generateShipName(d, c, wk, pk, mk, t) {
  const seed = _nameGenSeed(d, c, wk, pk, mk, t);
  const pools = [
    SHIP_NAME_BANK.shape[d],
    SHIP_NAME_BANK.color[c],
    SHIP_NAME_BANK.weapon[wk],
    SHIP_NAME_BANK.passive[pk],
    SHIP_NAME_BANK.maneuver[mk],
    SHIP_NAME_BANK.temperament[t],
  ].filter(p => p);

  if (pools.length < 2) return 'Unknown Ship';

  const adjPoolIdx = _nameGenRand(seed, 0) % pools.length;
  const adjPool = pools[adjPoolIdx].adj;
  const adj = adjPool[_nameGenRand(seed, 1) % adjPool.length];

  let nounPoolIdx = _nameGenRand(seed, 2) % pools.length;
  if (nounPoolIdx === adjPoolIdx) nounPoolIdx = (nounPoolIdx + 1) % pools.length;
  const nounPool = pools[nounPoolIdx].noun;
  const noun = nounPool[_nameGenRand(seed, 3) % nounPool.length];

  return adj + ' ' + noun;
}
