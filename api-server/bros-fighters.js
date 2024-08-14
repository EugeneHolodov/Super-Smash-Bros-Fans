const db = require("./db");

const fighters = [
  {
    description:
      "Mario is an all-around fighter who uses his wide variety of techniques to respond to any situation. In Super Smash Bros. Ultimate, he shows up in his Wedding tux and his Builder outfit, and Cappy even makes an appearance!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/mario/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/mario/ss_movie1_en.jpg",
    },
    name: "Mario",
    youtube: "https://www.youtube.com/watch?v=INk1W8OujQI&t=1s",
    order: "1",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "His charged punch is one of the strongest attacks in the game! In Super Smash Bros. Ultimate, his Final Smash has been updated from Konga Beat to a flurry of punches!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/donkey_kong/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/donkey_kong/ss_movie1_en.jpg",
    },
    name: "Donkey Kong",
    youtube: "https://www.youtube.com/watch?v=K7IsUGeFXP0&t=3s",
    order: "2",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/donkeykong_en.png",
      name: "donkeykong",
    },
  },
  {
    description:
      "Link has been redesigned to match his appearance in The Legend of Zelda: Breath of the Wild. He can now pick up arrows he's fired, and his bombs have been upgraded to remote bombs, so you can set them off when the timing is just right!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/link/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/link/ss_movie1_en.jpg",
    },
    name: "Link",
    youtube: "https://www.youtube.com/watch?v=kfeUdBi67G4&t=1s",
    order: "3",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/zelda_en.png",
      name: "zelda",
    },
  },
  {
    description:
      "With her Charge Shot, Missile, and Bomb, Samus has three different projectiles to keep her opponents in check from a distance. When fully charged up, her Charge Shot is quite powerful. For her Final Smash, she launches a wide laser beam that can be moved up and down!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/samus/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/samus/ss_movie1_en.jpg",
    },
    name: "Samus",
    youtube: "https://www.youtube.com/watch?v=I9tcvSeemVo",
    order: "4",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/metroid_en.png",
      name: "metroid",
    },
  },
  {
    description:
      "Dark Samus joins the battle as Samus's echo fighter. With floatier movement, she's a little different from Samus--and she doesn't roll when dodging or jumping. If you look closely, you can see that her bombs and missiles look a little different, too.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/dark_samus/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/dark_samus/ss_movie1_en.jpg",
    },
    name: "Dark Samus",
    youtube: "https://www.youtube.com/watch?v=sXG-oI6VChg",
    order: "4e",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/metroid_en.png",
      name: "metroid",
    },
  },
  {
    description:
      "Yoshi is all about egg-related moves, like throwing eggs, swallowing opponents and turning them into eggs, or turning into an egg and charging toward an opponent. With a high jump, recovery is a piece of cake for Yoshi! And for his Final Smash, a Yoshi army stampedes through the stage.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/yoshi/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/yoshi/ss_movie1_en.jpg",
    },
    name: "Yoshi",
    youtube: "https://www.youtube.com/watch?v=bQsMQankmEs",
    order: "5",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/yoshi_en.png",
      name: "Yoshi",
    },
  },
  {
    description:
      "Kirby's ability to copy other fighters is totally unique! While he is light and can be launched easily, he can also jump up to five times in the air, so he has great recovery. Look for his new Stone transformation, too.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/kirby/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/kirby/ss_movie1_en.jpg",
    },
    name: "Kirby",
    youtube: "https://www.youtube.com/watch?v=1FPJs_c3qY4",
    order: "6",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/kirby_en.png",
      name: "kirby",
    },
  },
  {
    description:
      "He made his first appearance in Star Fox, released in 1993. Fox is the leader of the mercenary group Star Fox. He cares about his team and has a strong sense of justice. Fun fact: Star Fox was the first game for the Super Nintendo Entertainment System™ that featured 3D graphics.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/fox/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/fox/ss_movie1_en.jpg",
    },
    name: "Fox",
    youtube: "https://www.youtube.com/watch?v=Arw6c0dJHAE&t=1s",
    order: "7",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/starfox_en.png",
      name: "star-fox",
    },
  },
  {
    description:
      "This fierce fighter uses electric moves like Thunder Jolt and Thunder. Pikachu Libre is one of the alternate costumes and you can tell she's female by the shape of her tail.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/pikachu/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/pikachu/ss_movie1_en.jpg",
    },
    name: "Pikachu",
    youtube: "https://www.youtube.com/watch?v=7LfEvnLc3mI",
    order: "8",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    description:
      'He can jump higher than his brother, Mario. His Up Special, Super Jump Punch, will gain maximum damage and launching power when hitting the opponent right at the start. It truly is a "Special" move. He also uses his new Poltergust for his throw!',
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/luigi/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/luigi/ss_movie1_en.jpg",
    },
    name: "Luigi",
    youtube: "https://www.youtube.com/watch?v=LlNXKM3sHWU",
    order: "9",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      'Ness has a variety of moves, from long-range attacks using psychic powers known as "PSI," to short-range attacks with his bat and yo-yo.  Ness can also unleash PK Thunder, a guided attack that can launch him like a rocket or help him recover!',
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ness/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ness/ss_movie1_en.jpg",
    },
    name: "Ness",
    youtube: "https://www.youtube.com/watch?v=jtlUHmonMGQ",
    order: "10",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mother_en.png",
      name: "earth-boud",
    },
  },
  {
    description:
      "A fighter that possesses both speed and power! But in exchange, he is frequently left open. Being able to successfully land his neutral special, Falcon Punch, can greatly influence the battle in multiplayer matches.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/captain_falcon/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/captain_falcon/ss_movie1_en.jpg",
    },
    name: "Captain Falcon",
    youtube: "https://www.youtube.com/watch?v=ayUTQsO6d1E",
    order: "11",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/f-zero_en.png",
      name: "Fzero",
    },
  },
  {
    description:
      "Jigglypuff can jump 5 times in the air and can move faster in the air than on the ground. Use Jigglypuff's great aerial ability to overwhelm your opponent! If you manage to land the down special Rest, you can powerfully launch your opponent.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/jigglypuff/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/jigglypuff/ss_movie1_en.jpg",
    },
    name: "Jigglypuff",
    youtube: "https://www.youtube.com/watch?v=IlojAAwCfoA",
    order: "12",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    description:
      "THE super princess. Watch out for her powerful kicks while she's airborne. Using her down special, she picks vegetables and throws them at her opponents. Sometimes she even gets items...like a Bob-omb!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/peach/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/peach/ss_movie1_en.jpg",
    },
    name: "Peach",
    youtube: "https://www.youtube.com/watch?v=ETVQLZV7J8g",
    order: "13",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "Her basic move set is the same as Peach's, but this princess has her own unique personality. She's known for being upbeat, energetic, and a bit of a tomboy.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/daisy/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/daisy/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=YyzJnpX2ZcY",
    name: "Daisy",
    order: "13e",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "Who's the greatest nemesis of all!? It's King Bowser! In Super Smash Bros. his power and weight make him a reliable fighter. Use his Fire Breath to keep opponents at bay, then use his damaging attacks to launch them off the stage! He transforms into Giga Bowser for his Final Smash and delivers a super powerful punch!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/bowser/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/bowser/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=liuwszyDhXM",
    name: "Bowser",
    order: "14",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "Back in the battle after a ten-year absence! There are two of them, so does that make them twice as strong as other fighters?",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ice_climbers/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ice_climbers/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=FUzcsIjn4LY",
    name: "Ice Climbers",
    order: "15",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/iceclimber_en.png",
      name: "Ice-climber",
    },
  },
  {
    description:
      "Now Sheik joins the battle wearing the Sheikah costume from The Legend of Zelda: Breath of the Wild. Keep the pressure on your opponent by using his speedy dash to quickly close in on (or get away from) your opponent!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/sheik/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/sheik/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=cCQXBEiARns",
    name: "Sheik",
    order: "16",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/zelda_en.png",
      name: "zelda",
    },
  },
  {
    description:
      "You might recognize Zelda's look from The Legend of Zelda: A Link Between Worlds game. In battle she uses magical moves to reflect and teleport, and for her Final Smash, she seals her opponents away in the Triforce of Wisdom. If an opponent has 100% damage or more, they will be instantly KO'd!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/zelda/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/zelda/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=fMDgFn3qQ_c",
    name: "Zelda",
    order: "17",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/zelda_en.png",
      name: "zelda",
    },
  },
  {
    description:
      "He has more attack and launch power than Mario, but his jump and recovery is not as good. Pro tip: You can repeatedly press the B button when using his down special, Dr. Tornado, to float a bit!",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/dr_mario/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/dr_mario/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=w0qVpaEtEF4",
    name: "Dr. Mario",
    order: "18",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "Pichu is back after 17 years! Pichu's electric attacks have greater range and do more damage than its other attack types—but they also damage Pichu.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/pichu/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/pichu/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=9ZD89yfBCyE",
    name: "Pichu",
    order: "19",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    description: "",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/falco/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/falco/ss_movie1_en.jpg",
    },
    youtube: "",
    name: "Falco",
    order: "20",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/starfox_en.png",
      name: "star-fox",
    },
  },
  {
    description:
      "Marth is an exceptional swordfighter with a long reach. He'll do the most damage with attacks using the tip of his sword, so spacing is an important factor.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/marth/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/marth/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=icuBIlBPYj0",
    name: "Marth",
    order: "21",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    description:
      "Lucina is Marth's echo fighter, so she shares most of her standard and special attacks with Marth. However, while Marth's attacks are more powerful when made with the tip of his blade, Lucina's attacks just as powerful whether you use the tip or the base of the sword.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/lucina/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/lucina/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=vQqvKaCne4k",
    name: "Lucina",
    order: "21e",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    description:
      "He's back after 17 years! Young Link is faster than Link but he's also lighter, making him easier to launch.",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/young_link/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/young_link/ss_movie1_en.jpg",
    },
    youtube: "https://www.youtube.com/watch?v=qpzDPfCzB7g",
    name: "Young Link",
    order: "22",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/zelda_en.png",
      name: "zelda",
    },
  },
  {
    name: "Ganondorf",
    order: "23",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ganondorf/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ganondorf/ss_movie1_en.jpg",
    },
    description:
      "His new design matches his appearance in The Legend of Zelda: Ocarina of Time! Now he uses his sword for all his smash attacks. He's a bit slimmer then he was before, but his Warlock Punch is devastating! For his final smash he transforms into Ganon, The Demon King and quickly charges forward.",
    youtube: "https://www.youtube.com/watch?v=Q7pzoLQlrsM",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/zelda_en.png",
      name: "zelda",
    },
  },
  {
    name: "Mewtwo",
    order: "24",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/mewtwo/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/mewtwo/ss_movie1_en.jpg",
    },
    description:
      "A Legendary Pokémon known for its technical moves. Use Confusion or Disable as a diversion, then land a Shadow Ball! For its Final Smash, Mewtwo transforms into Mega Mewtwo Y and fires a projectile that freezes and launches the opponent!",
    youtube: "https://www.youtube.com/watch?v=BcCpZHVIv9Q",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    name: "Roy",
    order: "25",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/roy/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/roy/ss_movie1_en.jpg",
    },
    description:
      "Get up close and personal for major damage! Unlike Marth, Roy's attacks are more powerful the closer you get to the base of his blade. For his Final Smash, his sword bursts into flame and sends anyone caught in the blast flying.",
    youtube: "https://www.youtube.com/watch?v=FtDn6HBn_Qk",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    name: "Chrom",
    order: "25e",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/chrom/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/chrom/ss_movie1_en.jpg",
    },
    description:
      "The protagonist of Fire Emblem Awakening joins the battle as Roy's echo fighter. His Final Smash is Awakening Aether. Like Aether in the original game, this move has Chrom charge toward his opponent, slashing with his sword.",
    youtube: "https://www.youtube.com/watch?v=733o521fbdE",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    name: "Mr. Game & Watch",
    order: "26",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/mr_game_and_watch/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/mr_game_and_watch/ss_movie1_en.jpg",
    },
    description:
      "When using his side special, Judge, this fighter pulls out a hammer and the numbers 1-9 are displayed. If you pull off a 9 attack, it will really knock the opponent back. His Final Smash turns him into an octopus that can pull opponents off the stage!",
    youtube: "https://www.youtube.com/watch?v=Ic0xR07DhSY",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/gamewatch_en.png",
      name: "game-watch",
    },
  },
  {
    name: "Meta Knight",
    order: "27",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/meta_knight/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/meta_knight/ss_movie1_en.jpg",
    },
    description:
      "This fighter not only has tons of quick moves, he can perform a midair jump five times! All his special moves have a recovery aspect, so use them at the right time. His Final Smash is Darkness Illusion, which unleashes a fast series of aerial attacks.",
    youtube: "https://www.youtube.com/watch?v=A99IYmm50RY",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/kirby_en.png",
      name: "kirby",
    },
  },
  {
    name: "Pit",
    order: "28",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/pit/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/pit/ss_movie1_en.jpg",
    },
    description:
      "Pit is a well-balanced, well-rounded character with a defensive special that nullifies long distance attacks and excellent recovery. And did we mention he rides a chariot of light in his Final Smash? He's a great choice for new players!",
    youtube: "https://www.youtube.com/watch?v=M_Pszs9I7S4",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/palutena_en.png",
      name: "kid-icarus",
    },
  },
  {
    name: "Dark Pit",
    order: "28e",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/dark_pit/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/dark_pit/ss_movie1_en.jpg",
    },
    description:
      "Dark Pit is Pit's echo fighter. His abilities are mostly the same as Pit's, but his hair and clothes are different colors, he summons different weapons, and celebrates victory to a different tune.",
    youtube: "https://www.youtube.com/watch?v=q2hJjyP8FGA",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/palutena_en.png",
      name: "kid-icarus",
    },
  },
  {
    name: "Zero Suit Samus",
    order: "29",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/zero_suit_samus/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/zero_suit_samus/ss_movie1_en.jpg",
    },
    description:
      "Although not as powerful as Samus, her speed is exceptional! Her Paralyzer not only has the ability to stun opponents, but it can also turn into a whip. For her Final Smash, she dons her suit and fires a powerful laser!",
    youtube: "https://www.youtube.com/watch?v=Y4PTxiq11Fk",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/metroid_en.png",
      name: "metroid",
    },
  },
  {
    name: "Wario",
    order: "30",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/wario/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/wario/ss_movie1_en.jpg",
    },
    description:
      "Wario has unique attacks, like using his Wario Bike and releasing noxious gas. He can jump higher than normal by leaping from his bike, which comes in handy when recovering. For his Final Smash, he turns into Wario-Man and creates copies of himself for an all-out attack!",
    youtube: "https://www.youtube.com/watch?v=4lK7zkTInNA",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/wario_en.png",
      name: "wario",
    },
  },
  {
    name: "Snake",
    order: "31",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/snake/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/snake/ss_movie1_en.jpg",
    },
    description:
      "Back by popular demand, Snake brings a ranged fighting style unlike any other fighter in the game. His Final Smash locks onto an opponent and fires five homing missiles.",
    youtube: "https://www.youtube.com/watch?v=7NLKrPYYQt0",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/metalgear_en.png",
      name: "metal-gear",
    },
  },
  {
    name: "Ike",
    order: "32",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ike/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ike/ss_movie1_en.jpg",
    },
    description:
      "Ike's side smash attack is extremely powerful, but it leaves him open, so you'll need to read your opponent's moves carefully. You can choose between his Path of Radiance and Radiant Dawn costumes.",
    youtube: "https://www.youtube.com/watch?v=-aV6h3jWO6c",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    name: "Pokémon Trainer",
    order: "33-35",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/pokemon_trainer/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/pokemon_trainer/ss_movie1_en.jpg",
    },
    description:
      "The trainer returns with Squirtle, Ivysaur, and Charizard. You can choose to play as a male or female trainer!",
    youtube: "https://www.youtube.com/watch?v=dYpf9FoPN_M",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    name: "Diddy Kong",
    order: "36",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/diddy_kong/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/diddy_kong/ss_movie1_en.jpg",
    },
    description:
      "Donkey Kong's trusty partner Diddy Kong uses his light weight and agility to get around quickly! For his Final Smash, Diddy takes to the air with his Rocketbarrel while firing his popguns. The final hit is seriously powerful!",
    youtube: "https://www.youtube.com/watch?v=AjywYr-fuqY",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/donkeykong_en.png",
      name: "donkeykong",
    },
  },
  {
    name: "Lucas",
    order: "37",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/lucas/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/lucas/ss_movie1_en.jpg",
    },
    description:
      "Like Ness, Lucas is a young boy who uses PSI powers. Some of their PSI moves share the same names, but since Lucas has different abilities, the moves may work differently. Be sure to try them out! For his Final Smash, he calls down a shower of meteors along with Kumatora and Boney.",
    youtube: "https://www.youtube.com/watch?v=GWjfyyGNL8c",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mother_en.png",
      name: "earth-boud",
    },
  },
  {
    name: "Sonic",
    order: "38",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/sonic/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/sonic/ss_movie1_en.jpg",
    },
    description:
      "This speedy fighter has a lot of rush-type attacks. His final smash, Super Sonic, lets him fly around the stage at an incredible speed!",
    youtube: "https://www.youtube.com/watch?v=138MW7zOw0M",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/sonic_en.png",
      name: "sonic",
    },
  },
  {
    name: "King Dedede",
    order: "39",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/king_dedede/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/king_dedede/ss_movie1_en.jpg",
    },
    description:
      "He's not very fast, but he's one of few heavyweight fighters with great recovery.  Apparently, a defeat by Kirby inspired him to train hard to learn a move called Hovering, which allows him to float after taking a deep breath.",
    youtube: "https://www.youtube.com/watch?v=bikxqlRPN64",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/kirby_en.png",
      name: "kirby",
    },
  },
  {
    name: "Olimar",
    order: "40",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/olimar/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/olimar/ss_movie1_en.jpg",
    },
    description:
      "Captain Olimar battles by issuing commands to various types of Pikmin under his control. Pikmin come in different colors that correspond to different abilities. Olimar's alternate appearance lets you play as Alph!",
    youtube: "https://www.youtube.com/watch?v=AFHgO8rMzcg",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pikmin_en.png",
      name: "pikmin",
    },
  },
  {
    name: "Lucario",
    order: "41",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/lucario/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/lucario/ss_movie1_en.jpg",
    },
    description:
      "Lucario is the only fighter whose attack power increases as it takes damage. A fighter that truly shines when in a pinch, choose Lucario for a thrilling battle.",
    youtube: "https://www.youtube.com/watch?v=7gfpUgrLEwo",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    name: "R.O.B.",
    order: "42",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/rob/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/rob/ss_movie1_en.jpg",
    },
    description:
      "He has two powerful projectiles: Robo Beam and Gyro, along with a very effective recovery. The 1P color in the North American version of the game is a light gray, and the 2P is red and white, but this is reversed in the Japanese version.",
    youtube: "https://www.youtube.com/watch?v=NqL7m9CuGD0",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/famicomrobot_en.png",
      name: "rob",
    },
  },
  {
    name: "Toon Link",
    order: "43",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/toon_link/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/toon_link/ss_movie1_en.jpg",
    },
    description:
      "He's smaller and faster than Link. His bombs explode with a unique anime-style. For his Final Smash, he emits light from his left hand and any opponents hit by it are trapped in the Triforce, subject to a punishing gauntlet of attacks.",
    youtube: "https://www.youtube.com/watch?v=62uBiZfw9w0",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/zelda_en.png",
      name: "zelda",
    },
  },
  {
    name: "Wolf",
    order: "44",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/wolf/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/wolf/ss_movie1_en.jpg",
    },
    description:
      "The leader of the Star Wolf mercenary team makes his grand return after 10 years! He puts his sharp claws to good use in wild attacks, and his Final Smash is an all-out attack by Team Star Wolf! If Fox or Falco is in the battle, you may hear a unique line of dialog.",
    youtube: "https://www.youtube.com/watch?v=YLG2LGY95f4",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/starfox_en.png",
      name: "star-fox",
    },
  },
  {
    name: "Villager",
    order: "45",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/villager/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/villager/ss_movie1_en.jpg",
    },
    description:
      "This fighter attacks using skills from daily life in the village, such as planting, growing, and cutting down trees. They can also use items like nets, slingshots, and turnips. The Villager can also put items or incoming projectiles in a pocket to use later.",
    youtube: "https://www.youtube.com/watch?v=wY_wCijU1Pk",
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/doubutsu_en.png",
      name: "animal-crossing",
    },
  },
  {
    description:
      "Mega Man's standard and special moves use weapons copied from the bosses he's fought throughout the Mega Man series, so he has more projectiles than any other fighter. His Final Smash now features Proto Man and Bass!",
    youtube: "https://www.youtube.com/watch?v=m4632ulEnNc",
    name: "Mega Man",
    order: "46",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/mega_man/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/mega_man/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/rockman_en.png",
      name: "mega-man",
    },
  },
  {
    description:
      "A fighter that attacks with healthy moves like stretching and yoga poses. You can pick between male and female versions. Charging up Sun Salutation all the way recovers a bit of health!",
    youtube: "https://www.youtube.com/watch?v=kJbHRv4nCBw",
    name: "Wii Fit Trainer",
    order: "47",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/wii_fit_trainer/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/wii_fit_trainer/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/wii_fit_en.png",
      name: "wii-fit",
    },
  },
  {
    description:
      "Luma mimicks Rosalina's attacks. Luma also increases Rosalina's reach and can even take a hit for her! If Rosalina gets hit, Luma gets very flustered and flutters both hands.",
    youtube: "https://www.youtube.com/watch?v=JX2mySkglVU",
    name: "Rosalina & Luma",
    order: "48",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/rosalina_and_luma/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/rosalina_and_luma/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "As a boxer, Little Mac fights with his fists alone—no kicks! When his Power Meter fills up, he can use a special KO Uppercut, which can really turn a battle around. For his Final Smash, he turns into Giga Mac and pummels the opponent with a furious rush of punches!",
    youtube: "https://www.youtube.com/watch?v=vBM09wj8xwE",
    name: "Little Mac",
    order: "49",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/little_mac/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/little_mac/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/punch_out_en.png",
      name: "punch-out",
    },
  },
  {
    description:
      "A ninja-like fighter that battles with moves like the Water Shuriken. Greninja can use a log for clever counterattacks, and this Pokémon can even stick to walls. During its Final Smash, it turns into Ash-Greninja...!?",
    youtube: "https://www.youtube.com/watch?v=rMCn8NuATaE",
    name: "Greninja",
    order: "50",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/greninja/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/greninja/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
  {
    description:
      "You can choose from the three types of Mii Fighter and select from a set of three specials for each type. You can also choose one of 12 voice options!",
    youtube: "https://www.youtube.com/watch?v=qdSKO-mc2n8",
    name: "Mii Fighters",
    order: "51-53",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/mii_fighter/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/mii_fighter/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mii_en.png",
      name: "mii",
    },
  },

  {
    description:
      "With her wings and staff, this goddess's attacks cover a wide range. With her up smash, neutral special, and side special, she can create a ranged attack in almost every direction except for directly beneath her! Keep the pressure on your opponents from a distance with ranged attacks!",
    youtube: "https://www.youtube.com/watch?v=0yD_B4ZkdME",
    name: "Palutena",
    order: "54",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/palutena/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/palutena/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/palutena_en.png",
      name: "kid-icarus",
    },
  },
  {
    description:
      "This fighter appears in both his classic form and his form with hands and legs. He has many unique special moves, such as using a trampoline or a fire hydrant. For his Final Smash, he grows into a giant Super PAC-MAN, chomping and launching his opponents!",
    youtube: "https://www.youtube.com/watch?v=NPzo-TuH0C0",
    name: "Pac-Man",
    order: "55",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/pac_man/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/pac_man/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pacman_en.png",
      name: "pac-man",
    },
  },
  {
    description:
      "A fighter that wields the Levin Sword and four different Tomes! Like in the original game, these weapons can only be used a certain number of times, so keep a close eye on the battle situation. Both the male and female versions of Robin are available, so you can choose your favorite.",
    youtube: "https://www.youtube.com/watch?v=QBxtnTgUwcM",
    name: "Robin",
    order: "56",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/robin/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/robin/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    description:
      "He is the only fighter that can change his status during battle. His sword, the Monado, allows him to switch between five modes—Jump, Speed, Shield, Buster and Smash—which change his abilities for a short time. Fun fact: Shulk's eighth color variation puts him in a pair of swimming trunks!",
    youtube: "https://www.youtube.com/watch?v=XWeR6XmzZyI",
    name: "Shulk",
    order: "57",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/shulk/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/shulk/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/xenoblade_en.png",
      name: "xenoblade",
    },
  },
  {
    description:
      "The Jr. Clown Car this little fella rides in takes less damage when attacked than Bowser Jr. himself—so try to stay in the car when taking damage. The different color variations are the Koopalings!",
    youtube: "https://www.youtube.com/watch?v=fZ2dm9EoJfE",
    name: "Bowser Jr.",
    order: "58",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/bowser_jr/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/bowser_jr/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/mario_en.png",
      name: "mario",
    },
  },
  {
    description:
      "This duo excels at long-range attacks, like kicking exploding cans and throwing clay pigeons. For their Final Smash, three games from the Light Gun Series team up: Duck Hunt, Hogan's Alley, and Wild Gunman!",
    youtube: "https://www.youtube.com/watch?v=anhjSVXYL6E",
    name: "Duck Hunt",
    order: "59",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/duck_hunt/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/duck_hunt/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/duckhunt_en.png",
      name: "duck-hunt",
    },
  },
  {
    description:
      "Ryu is a special character—you can use directional command inputs to trigger his special moves. Executing moves like his Hadoken and Shoryuken using the command inputs from the original game will raise their power. You can even use a Shakunetsu Hadoken by inputting ←↙↓↘→ then tapping the attack button while facing right!",
    youtube: "https://www.youtube.com/watch?v=9LAjpoI-ap8",
    name: "Ryu",
    order: "60",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ryu/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ryu/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/streetfighter_en.png",
      name: "street-fighter",
    },
  },
  {
    description:
      "Ken joins the battle as Ryu's Echo Fighter! Their differences are carried over from the original game: Ken's Hadoken is shaped differently, his strong Shoryuken has flames, and he moves a bit faster. He has two final smashes: Shinryuken and Shippu Jinraikyaku.",
    youtube: "https://www.youtube.com/watch?v=9_tQRugeXik",
    name: "Ken",
    order: "60e",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ken/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ken/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/streetfighter_en.png",
      name: "street-fighter",
    },
  },
  {
    description:
      "He's the protagonist of Final Fantasy VII. You can also select his Advent Children outfit. Charging up his Limit Gauge increases his special move abilities! Land a powerful hit!",
    youtube: "https://www.youtube.com/watch?v=hccjmuujoD4",
    name: "Cloud",
    order: "61",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/cloud/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/cloud/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/finalfantasy_en.png",
      name: "final-fantasy",
    },
  },
  {
    description:
      "Corrin was available as a downloadable fighter in the previous version of Super Smash Bros. This fighter uses all kinds of attacks, like Torrential Roar and Dragon Fang Shot. Players can choose male or female versions!",
    youtube: "https://www.youtube.com/watch?v=7B4w2Tsy9PE",
    name: "Corrin",
    order: "62",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/corrin/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/corrin/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/fireemblem_en.png",
      name: "fire-emblem",
    },
  },
  {
    description:
      "An Umbra Witch who equips guns on her arms and legs, Bayonetta has mastered the beautiful but brutal Bullet Arts fighting style. She can even slow down her opponents with Witch Time!",
    youtube: "https://www.youtube.com/watch?v=oYe8HpzYebg",
    name: "Bayonetta",
    order: "63",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/bayonetta/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/bayonetta/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/bayonetta_en.png",
      name: "bayonetta",
    },
  },
  {
    description:
      "Attacks with a variety of weapons. Covering opponents with ink leads to more and more damage—plus these Inklings are really fashionable!",
    youtube: "https://www.youtube.com/watch?v=O4-7-bJWUsc",
    name: "Inkling",
    order: "64",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/inkling/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/inkling/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/splatoon_en.png",
      name: "splatoon",
    },
  },
  {
    description:
      "Joining the battle from the storied Metroid series, Ridley's long tail and sharp claws let him unleash a torrent of devastating attacks. His Final Smash is a powerful stream of plasma breath intense enough to bring down Samus's starship.",
    youtube: "https://www.youtube.com/watch?v=EDi1Zf_vJsY",
    name: "Ridley",
    order: "65",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/ridley/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/ridley/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/metroid_en.png",
      name: "metroid",
    },
  },
  {
    description:
      "The protagonist of Castlevania. He uses his holy whip, Vampire Killer, to perform a smash attack with long reach. He also uses projectiles like an axe, holy water, and cross.",
    youtube: "https://www.youtube.com/watch?v=RY7WL-n1atg",
    name: "Simon",
    order: "66",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/simon/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/simon/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/dracula_en.png",
      name: "castlevania",
    },
  },
  {
    description:
      "Richter from the Castlevania series joins the battle as Simon's echo fighter! His basic attacks are the same as Simon's, but with subtle variations. In addition to that, his holy water is a different color.",
    youtube: "https://www.youtube.com/watch?v=ELrWbGScgwU",
    name: "Richter",
    order: "66e",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/richter/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/richter/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/dracula_en.png",
      name: "castlevania",
    },
  },
  {
    description:
      "With long-distance special moves like the Blunderbuss, and counter moves like Stomach Attack, he is a versatile fighter. His Final Smash, Blast-O-Matic, was apparently a weapon created to destroy DK Island...",
    youtube: "https://www.youtube.com/watch?v=pKcXgSV8PTE",
    name: "King K. Rool",
    order: "67",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/king_k_rool/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/king_k_rool/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/donkeykong_en.png",
      name: "donkeykong",
    },
  },

  {
    description:
      'Isabelle joins the battle from Animal Crossing: New Leaf! She uses various trinkets from around the village to battle. Her side special, ""Fishing Rod,"" not only allows her to snag and bring opponents closer, it can also be used as a recovery move.',
    youtube: "https://www.youtube.com/watch?v=ML8fn3eInnc",
    name: "Isabelle",
    order: "68",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/isabelle/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/isabelle/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/doubutsu_en.png",
      name: "animal-crossing",
    },
  },
  {
    description:
      "A fighter with many special moves that appear to come from the world of pro wrestling. Incineroar has many moves from its original game, like Darkest Lariat, Cross Chop, and Revenge. Its Final Smash is Max Malicious Moonsault. Let the Z-Power explode and deliver a powerful blow!",
    youtube: "https://www.youtube.com/watch?v=eE6Agn9d89U",
    name: "Incineroar",
    order: "69",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/incineroar/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/incineroar/ss_movie1_en.jpg",
    },
    series: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/logo/pokemon_en.png",
      name: "pokemon",
    },
  },
];

const anotherBros = [
  {
    description: "",
    youtube: "",
    name: "Piranha Plant",
    order: "70",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/piranha_plant/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/piranha_plant/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Joker",
    order: "71",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/joker/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/joker/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Hero",
    order: "72",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/hero/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/hero/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Banjo & Kazooie",
    order: "73",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/banjo_and_kazooie/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/banjo_and_kazooie/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Terry",
    order: "74",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/terry/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/terry/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Byleth",
    order: "75",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/byleth/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/byleth/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Min Min",
    order: "76",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/min_min/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/min_min/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Steve",
    order: "77",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/steve/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/steve/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Sephiroth",
    order: "78",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/sephiroth/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/sephiroth/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Pyra & Mythra",
    order: "79",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/pyra_and_mythra/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/pyra_and_mythra/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Kazuya",
    order: "80",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/kazuya/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/kazuya/ss_movie1_en.jpg",
    },
  },
  {
    description: "",
    youtube: "",
    name: "Sora",
    order: "81",
    images: {
      icon: "https://www.smashbros.com/assets_v2/img/fighter/sora/main.png",
      portrait:
        "https://www.smashbros.com/assets_v2/img/fighter/sora/ss_movie1_en.jpg",
    },
  },
];

function insertFighters() {
  db.serialize(() => {
    db.get("SELECT COUNT(*) AS count FROM fighters", (err, row) => {
      if (err) {
        console.error("Could not check fighters count", err);
        return;
      }

      if (row.count === 0) {
        const stmt = db.prepare(`INSERT INTO fighters (
          name, description, icon, portrait, youtube, series_icon, series_name, "order"
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

        fighters.forEach((fighter) => {
          stmt.run(
            fighter.name,
            fighter.description,
            fighter.images.icon,
            fighter.images.portrait,
            fighter.youtube,
            fighter.series.icon,
            fighter.series.name,
            fighter.order
          );
        });

        stmt.finalize();
        console.log("Data inserted successfully");
      } else {
        console.log("Data already exists, no need to insert");
      }
    });
  });
}

module.exports = insertFighters;
