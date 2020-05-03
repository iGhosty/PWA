import { db } from "../services/firebase";

export function readChats() {
  let tomb = [];
  db.ref("chats").on("value", snapshot => {
    snapshot.forEach(snap => {
      tomb.push(snap.val())
    });
    return tomb;
  });
}

export function writeChats(message) {
  return db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid
  });
}
