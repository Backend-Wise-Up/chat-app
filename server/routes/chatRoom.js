import express from 'express';
// controllers
import chatRoom from '../controllers/chatRoom.js';

const router = express.Router();

router
  .get('/', chatRoom.getRecentConversation)
  .get('/:roomId', chatRoom.getConversationByRoomId)
  .post('/initiate', chatRoom.initiate)
  .get('/chats', chatRoom.chats)
  .post('/:roomId/message', chatRoom.postMessage)
  .post('/message/:messageId', chatRoom.replyMessage)
  .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)

export default router;
