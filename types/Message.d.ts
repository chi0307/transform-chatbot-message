import { Action } from './Action';

/**
 * 共用文字訊息
 */
type TextMessage = {
  type: 'text';
  text: String;
};

/**
 * 共用圖片訊息
 */
type ImageMessage = {
  type: 'image';
  imageUrl: String;
  previewImageUrl: String;
};

/**
 * 共用影片訊息
 */
type VideoMessage = {
  type: 'video';
  videoUrl: String;
  previewImageUrl: String;
};

/**
 * 共用聲音訊息
 */
type AudioMessage = {
  type: 'audio';
  audioUrl: String;
  duration: Number;
};

/**
 * 共用按鈕訊息
 */
type ButtonMessage = {
  type: 'button';
  altText: String;
  title?: String;
  text: String;
  buttons: Array<Action>;
};

/**
 * 共用輪播訊息
 */
type CarouselMessage = {
  type: 'carousel';
  altText: String;
  columns: Array<{
    title: String;
    text: String;
    imageUrl?: String;
    buttons: Array<Action>;
  }>;
};

type Message = TextMessage | ImageMessage | VideoMessage | AudioMessage | ButtonMessage | CarouselMessage;
type Messages = Array<Message>;

export { Messages, Message, TextMessage, ImageMessage, VideoMessage, AudioMessage, ButtonMessage, CarouselMessage };
