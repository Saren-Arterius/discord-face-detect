# discord-face-detect
for when you hate human faces on your discord server

1. `download-images.sh` for searching all messages in a guild/server containing attachments. For offset > 5000 the api will fail, need to refine search manually
2. edit `index.js` and replace channel mapping with the ones revelant to your server
3. `$ npm i && npm start` for seperating all json (please manually create folders) from the search results, and export wget commands to `commands.txt`
4. `$ cat commands.txt | parallel` to actually download all the images
5. `$ 'ls' */*.jpg | parallel "convert {} {}"` to clean jpeg images and seperating gif frames. Remove non photos manually.
6. `$ pip install deepface && python3 main.py` to start seperating photos containing faces to `./faces`
