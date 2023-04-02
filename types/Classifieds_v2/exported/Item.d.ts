/*Converter fn for later use
.sort((a,b) => a.id -b.id).map(f => JSON.stringify(f)).join(' | ')
*/

export type ItemOrigin =
    | { id: '0'; name: 'Timed Drop' }
    | { id: '1'; name: 'Achievement' }
    | { id: '2'; name: 'Purchased' }
    | { id: '3'; name: 'Traded' }
    | { id: '4'; name: 'Crafted' }
    | { id: '5'; name: 'Store Promotion' }
    | { id: '6'; name: 'Gifted' }
    | { id: '7'; name: 'Support Granted' }
    | { id: '8'; name: 'Found in Crate' }
    | { id: '9'; name: 'Earned' }
    | { id: '10'; name: 'Third-Party Promotion' }
    | { id: '11'; name: 'Wrapped Gift' }
    | { id: '12'; name: 'Halloween Drop' }
    | { id: '13'; name: 'Steam Purchase' }
    | { id: '14'; name: 'Foreign Item' }
    | { id: '15'; name: 'CD Key' }
    | { id: '16'; name: 'Collection Reward' }
    | { id: '17'; name: 'Preview Item' }
    | { id: '18'; name: 'Steam Workshop Contribution' }
    | { id: '19'; name: 'Periodic score reward' }
    | { id: '20'; name: 'MvM Badge completion reward' }
    | { id: '21'; name: 'MvM Squad surplus reward' }
    | { id: '22'; name: 'Recipe output' }
    | { id: '23'; name: 'Quest Drop' }
    | { id: '24'; name: 'Quest Loaner Item' }
    | { id: '25'; name: 'Trade-Up' }
    | { id: '26'; name: 'Viral Competitive Beta Pass Spread' }
    | { id: '27'; name: 'CYOA Blood Money Purchase' }
    | { id: '28'; name: 'War Paint' }
    | { id: '29'; name: 'Untradable Free Contract Reward' };

export type CharacterClass =
    | 'Scout'
    | 'Soldier'
    | 'Pyro'
    | 'Demoman'
    | 'Heavy'
    | 'Engineer'
    | 'Medic'
    | 'Sniper'
    | 'Spy';
export type Slot =
    | 'melee'
    | 'primary'
    | 'secondary'
    | 'pda'
    | 'pda2'
    | 'building'
    | 'misc'
    | 'taunt'
    | 'action'
    | 'utility';

export type ItemQuality =
    | { id: 0; name: 'Normal'; color: '#B2B2B2' }
    | { id: 1; name: 'Genuine'; color: '#4D7455' }
    | { id: 3; name: 'Vintage'; color: '#476291' }
    | { id: 5; name: 'Unusual'; color: '#8650AC' }
    | { id: 6; name: 'Unique'; color: '#FFD700' }
    | { id: 7; name: 'Community'; color: '#70B04A' }
    | { id: 8; name: 'Valve'; color: '#A50F79' }
    | { id: 9; name: 'Self-Made'; color: '#70B04A' }
    | { id: 11; name: 'Strange'; color: '#CF6A32' }
    | { id: 13; name: 'Haunted'; color: '#38F3AB' }
    | { id: 14; name: "Collector's"; color: '#830000' }
    | { id: 15; name: 'Decorated Weapon'; color: '#fafafa' };

export type Sheen =
    | { id: 1; name: 'Team Shine' }
    | { id: 2; name: 'Deadly Daffodil' }
    | { id: 3; name: 'Manndarin' }
    | { id: 4; name: 'Mean Green' }
    | { id: 5; name: 'Agonizing Emerald' }
    | { id: 6; name: 'Villainous Violet' }
    | { id: 7; name: 'Hot Rod' };

export type Killstreaker =
    | { id: 2002; name: 'Fire Horns' }
    | { id: 2003; name: 'Cerebral Discharge' }
    | { id: 2004; name: 'Tornado' }
    | { id: 2005; name: 'Flames' }
    | { id: 2006; name: 'Singularity' }
    | { id: 2007; name: 'Incinerator' }
    | { id: 2008; name: 'Hypno-Beam' };

export type KillstreakTier =
    | { id: 0; name: 'None' }
    | { id: 1; name: 'Standard' }
    | { id: 2; name: 'Specialized' }
    | { id: 3; name: 'Professional' };

export type Paint =
    | { id: 5027; name: 'Indubitably Green'; color: '#729e42' }
    | { id: 5028; name: "Zepheniah's Greed"; color: '#424f3b' }
    | { id: 5029; name: "Noble Hatter's Violet"; color: '#51384a' }
    | { id: 5030; name: 'Color No. 216-190-216'; color: '#d8bed8' }
    | { id: 5031; name: 'A Deep Commitment to Purple'; color: '#7d4071' }
    | { id: 5032; name: 'Mann Co. Orange'; color: '#cf7336' }
    | { id: 5033; name: 'Muskelmannbraun'; color: '#a57545' }
    | { id: 5034; name: 'Peculiarly Drab Tincture'; color: '#c5af91' }
    | { id: 5035; name: 'Radigan Conagher Brown'; color: '#694d3a' }
    | { id: 5036; name: 'Ye Olde Rustic Colour'; color: '#7c6c57' }
    | { id: 5037; name: 'Australium Gold'; color: '#e7b53b' }
    | { id: 5038; name: 'Aged Moustache Grey'; color: '#7e7e7e' }
    | { id: 5039; name: 'An Extraordinary Abundance of Tinge'; color: '#e6e6e6' }
    | { id: 5040; name: 'A Distinctive Lack of Hue'; color: '#141414' }
    | { id: 5046; name: 'Team Spirit'; color: '#b8383b' }
    | { id: 5051; name: 'Pink as Hell'; color: '#ff69b4' }
    | { id: 5052; name: 'A Color Similar to Slate'; color: '#2f4f4f' }
    | { id: 5053; name: 'Drably Olive'; color: '#808000' }
    | { id: 5054; name: 'The Bitter Taste of Defeat and Lime'; color: '#32cd32' }
    | { id: 5055; name: "The Color of a Gentlemann's Business Pants"; color: '#f0e68c' }
    | { id: 5056; name: 'Dark Salmon Injustice'; color: '#e9967a' }
    | { id: 5060; name: "Operator's Overalls"; color: '#483838' }
    | { id: 5061; name: 'Waterlogged Lab Coat'; color: '#a89a8c' }
    | { id: 5062; name: 'Balaclavas Are Forever'; color: '#3b1f23' }
    | { id: 5063; name: 'An Air of Debonair'; color: '#654740' }
    | { id: 5064; name: 'The Value of Teamwork'; color: '#803020' }
    | { id: 5065; name: 'Cream Spirit'; color: '#c36c2d' }
    | { id: 5076; name: "A Mann's Mint"; color: '#bcddb3' }
    | { id: 5077; name: 'After Eight'; color: '#2d2d24' };

export type WearTier =
    | { id: 1; name: 'Factory New'; short: 'FN' }
    | { id: 2; name: 'Minimal Wear'; short: 'MW' }
    | { id: 3; name: 'Field-Tested'; short: 'FT' }
    | { id: 4; name: 'Well-Worn'; short: 'WW' }
    | { id: 5; name: 'Battle Scarred'; short: 'BS' };

export type Rarity =
    | { id: 0; name: 'Stock'; color: '#6A6156' }
    | { id: 1; name: 'Civilian'; color: '#B0C3D9' }
    | { id: 2; name: 'Freelance'; color: '#5E98D9' }
    | { id: 3; name: 'Mercenary'; color: '#4B69FF' }
    | { id: 4; name: 'Commando'; color: '#8847FF' }
    | { id: 5; name: 'Assassin'; color: '#D32CE6' }
    | { id: 6; name: 'Elite'; color: '#EB4B4B' }
    | { id: 7; name: 'Immortal'; color: '#E4AE39' }
    | { id: 99; name: ''; color: '#FFD700' };

export type Spell =
    | {
          id: 'weapon-SPELL: Halloween death ghosts';
          spellId: 'SPELL: Halloween death ghosts';
          name: 'Exorcism';
          type: 'weapon';
      }
    | {
          id: 'standard-SPELL: Halloween voice modulation';
          spellId: 'SPELL: Halloween voice modulation';
          name: 'Voices from Below';
          type: 'standard';
      }
    | {
          id: 'weapon-SPELL: Halloween pumpkin explosions';
          spellId: 'SPELL: Halloween pumpkin explosions';
          name: 'Pumpkin Bombs';
          type: 'weapon';
      }
    | {
          id: 'weapon-SPELL: Halloween green flames';
          spellId: 'SPELL: Halloween green flames';
          name: 'Halloween Fire';
          type: 'weapon';
      }
    | {
          id: 'footsteps-1';
          spellId: '1';
          name: 'Team Spirit Footprints';
          type: 'footsteps';
          defindex: 8914;
          color: '#dddd00';
      }
    | {
          id: 'footsteps-2';
          spellId: '2';
          name: 'Headless Horseshoes';
          type: 'footsteps';
          defindex: 8920;
          color: '#8b00ff';
      }
    | {
          id: 'footsteps-3100495';
          spellId: '3100495';
          name: 'Corpse Gray Footprints';
          type: 'footsteps';
          defindex: 8916;
          color: '#2f4f4f';
      }
    | {
          id: 'footsteps-5322826';
          spellId: '5322826';
          name: 'Violent Violet Footprints';
          type: 'footsteps';
          defindex: 8917;
          color: '#ff77ff';
      }
    | {
          id: 'footsteps-8208497';
          spellId: '8208497';
          name: 'Bruised Purple Footprints';
          type: 'footsteps';
          defindex: 8919;
          color: '#2600ff';
      }
    | {
          id: 'footsteps-8421376';
          spellId: '8421376';
          name: 'Gangreen Footprints';
          type: 'footsteps';
          defindex: 8915;
          color: '#9900';
      }
    | {
          id: 'footsteps-13595446';
          spellId: '13595446';
          name: 'Rotten Orange Footprints';
          type: 'footsteps';
          defindex: 8918;
          color: '#ff6400';
      }
    | { id: 'paint-0'; spellId: '0'; name: 'Die Job'; type: 'paint'; defindex: 8901; color: '#ff' }
    | { id: 'paint-1'; spellId: '1'; name: 'Chromatic Corruption'; type: 'paint'; defindex: 8902; color: '#ff0000' }
    | {
          id: 'paint-2';
          spellId: '2';
          name: 'Putrescent Pigmentation';
          type: 'paint';
          defindex: 8900;
          color: '#ff00';
      }
    | { id: 'paint-3'; spellId: '3'; name: 'Spectral Spectrum'; type: 'paint'; defindex: 8903; color: '#ff7f00' }
    | { id: 'paint-4'; spellId: '4'; name: 'Sinister Staining'; type: 'paint'; defindex: 8904; color: '#ffff00' };

export type StrangePart =
    | { id: 1; name: 'Ubers' }
    | { id: 2; name: 'Kill Assists' }
    | { id: 3; name: 'Sentry Kills' }
    | { id: 4; name: 'Sodden Victims' }
    | { id: 5; name: 'Spies Shocked' }
    | { id: 6; name: 'Heads Taken' }
    | { id: 7; name: 'Humiliations' }
    | { id: 8; name: 'Gifts Given' }
    | { id: 9; name: 'Deaths Feigned' }
    | { id: 10; name: 'Scouts Killed' }
    | { id: 11; name: 'Snipers Killed' }
    | { id: 12; name: 'Soldiers Killed' }
    | { id: 13; name: 'Demomen Killed' }
    | { id: 14; name: 'Heavies Killed' }
    | { id: 15; name: 'Pyros Killed' }
    | { id: 16; name: 'Spies Killed' }
    | { id: 17; name: 'Engineers Killed' }
    | { id: 18; name: 'Medics Killed' }
    | { id: 19; name: 'Buildings Destroyed' }
    | { id: 20; name: 'Projectiles Reflected' }
    | { id: 21; name: 'Headshot Kills' }
    | { id: 22; name: 'Airborne Enemy Kills' }
    | { id: 23; name: 'Gib Kills' }
    | { id: 24; name: 'Buildings Sapped' }
    | { id: 25; name: 'Tickle Fights Won' }
    | { id: 26; name: 'Opponents Flattened' }
    | { id: 27; name: 'Kills Under A Full Moon' }
    | { id: 28; name: 'Dominations' }
    | { id: 30; name: 'Revenges' }
    | { id: 31; name: 'Posthumous Kills' }
    | { id: 32; name: 'Teammates Extinguished' }
    | { id: 33; name: 'Critical Kills' }
    | { id: 34; name: 'Kills While Explosive-Jumping' }
    | { id: 36; name: 'Sappers Removed' }
    | { id: 37; name: 'Cloaked Spies Killed' }
    | { id: 38; name: 'Medics Killed That Have Full ÜberCharge' }
    | { id: 39; name: 'Robots Destroyed' }
    | { id: 40; name: 'Giant Robots Destroyed' }
    | { id: 44; name: 'Kills While Low Health' }
    | { id: 45; name: 'Kills During Halloween' }
    | { id: 46; name: 'Robots Killed During Halloween' }
    | { id: 47; name: 'Defender Kills' }
    | { id: 48; name: 'Submerged Enemy Kills' }
    | { id: 49; name: 'Kills While Invuln ÜberCharged' }
    | { id: 50; name: 'Food Items Eaten' }
    | { id: 51; name: 'Banners Deployed' }
    | { id: 58; name: 'Seconds Cloaked' }
    | { id: 59; name: 'Health Dispensed to Teammates' }
    | { id: 60; name: 'Teammates Teleported' }
    | { id: 61; name: 'Tanks Destroyed' }
    | { id: 62; name: 'Long-Distance Kills' }
    | { id: 64; name: 'Points Scored' }
    | { id: 65; name: 'Double Donks' }
    | { id: 66; name: 'Teammates Whipped' }
    | { id: 67; name: 'Kills during Victory Time' }
    | { id: 68; name: 'Robot Scouts Destroyed' }
    | { id: 74; name: 'Robot Spies Destroyed' }
    | { id: 77; name: 'Taunt Kills' }
    | { id: 78; name: 'Unusual-Wearing Player Kills' }
    | { id: 79; name: 'Burning Player Kills' }
    | { id: 80; name: 'Killstreaks Ended' }
    | { id: 81; name: 'Freezecam Taunt Appearances' }
    | { id: 82; name: 'Damage Dealt' }
    | { id: 83; name: 'Fires Survived' }
    | { id: 84; name: 'Allied Healing Done' }
    | { id: 85; name: 'Point Blank Kills' }
    | { id: 86; name: 'Wrangled Sentry Kills' }
    | { id: 87; name: 'Kills' }
    | { id: 88; name: 'Full Health Kills' }
    | { id: 89; name: 'Taunting Player Kills' }
    | { id: 90; name: 'Carnival Kills' }
    | { id: 91; name: 'Carnival Underworld Kills' }
    | { id: 92; name: 'Carnival Games Won' }
    | { id: 93; name: 'Not Crit nor MiniCrit Kills' }
    | { id: 94; name: 'Player Hits' }
    | { id: 95; name: 'Assists' }
    | { id: 96; name: 'Contracts Completed' }
    | { id: 98; name: 'Contract Points' }
    | { id: 99; name: 'Contract Bonus Points' }
    | { id: 100; name: 'Times Performed' }
    | { id: 101; name: 'Kills and Assists during Invasion Event' }
    | { id: 102; name: 'Kills and Assists on 2Fort Invasion' }
    | { id: 103; name: 'Kills and Assists on Probed' }
    | { id: 104; name: 'Kills and Assists on Byre' }
    | { id: 105; name: 'Kills and Assists on Watergate' }
    | { id: 106; name: 'Souls Collected' }
    | { id: 107; name: 'Merasmissions Completed' }
    | { id: 108; name: 'Halloween Transmutes Performed' }
    | { id: 109; name: 'Power Up Canteens Used' }
    | { id: 110; name: 'Contract Points Earned' }
    | { id: 111; name: 'Contract Points Contributed To Friends' };
