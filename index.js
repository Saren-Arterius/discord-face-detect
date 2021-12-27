import fs from 'mz/fs';
import path from 'path';

const names = {
  '774730336797851730': 'makefriends',
  '773971431775666227': 'chatting_zh',
  '773971386099564575': 'chatting_en',
  '884813508808679444': 'social',
  '773958226067718164': 'meme_sfw',
  '774927323811020820': 'meme_nsfw',
  '773961483793072158': 'art',
  '773961333539864596': 'fursuit',
  '773959047291469826': 'nsfw',
  '876065374389547059': 'commission',
  '773956159693389887': 'games',
  '774751561754214431': 'games_voicetext',
  '774704224247742515': 'voicetext'
};

(async () => {
  let allJsons = [];
  let folders = await fs.readdir('search');
  for (let f of folders) {
    let jsons = await fs.readdir(`search/${f}`);
    for (let json of jsons) {
      let p = path.resolve(`search/${f}/${json}`)
      allJsons.push(p)
    }
  }
  let commands = [];
  for (let json of allJsons) {
    console.log(json)
    let data = await fs.readFile(json);
    data = JSON.parse(data);
    for (let m of data.messages) {
      for (let m2 of m) {
        let cn = names[m2.channel_id] ? names[m2.channel_id] : 'threads';
        let base = `images/${cn}/${m2.timestamp}_${m2.author.username}_${m2.id}`;
        let out1 = JSON.stringify(m2, null, 2);
        await fs.writeFile(`${base}.json`, out1);
        for (let i = 0; i < m2.attachments.length; i++) {
          let att = m2.attachments[i];
          commands.push(`wget '${att.url}' -O '${base}-${i}.jpg'`)
          // console.log({m2, att})
        }
      }
    }
  }
  await fs.writeFile('commands.txt', commands.join('\n'));
})();