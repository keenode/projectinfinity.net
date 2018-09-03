# Project Infinity

This is a tick-based rogue-like role-playing game that I was developing. For the frontend, I am using ReactJS, Redux, and PixiJS. For the backend: ExpressJS, MongoDB, Socket.io, and PassportJS to handle auth via local or Google accounts. 

This game is far from complete, but it features auth, creation of new accounts, deleting characters, and moving characters on the world map. Players can press the `Enter` key to chat. Both world updates (i.e. character movement) and chat messages update live between all connected clients via websockets. All world updates are stored in-memory (for faster processing) on the server then written to the DB every so often for long-term storage. 

## Screenshots

![pi-1](https://user-images.githubusercontent.com/427374/44966964-1a84d900-aef3-11e8-9f1a-6911c82117a4.jpg)

![pi-2](https://user-images.githubusercontent.com/427374/44966967-1f498d00-aef3-11e8-8ae7-30ed11ab40b2.jpg)

![pi-3](https://user-images.githubusercontent.com/427374/44966973-240e4100-aef3-11e8-9640-0002fd720995.jpg)
