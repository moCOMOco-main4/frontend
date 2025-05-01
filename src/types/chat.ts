export type ChatRoom = {
  roomId: string; //채팅방 id
  postId: number; //게시글 id
  postTitle: string; //게시글 명
  latestMessage: string; //최근메시지
  latestTime: string; //최근메시지 전송시간
  unreadCount: number; //안읽은 메시지
  participants: string[]; //참여자 리스트
};
