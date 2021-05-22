import { PostbackAction, UrlAction, PhoneAction } from './Actions';

type Action = PostbackAction | UrlAction | PhoneAction;

/**
 * 共用文字訊息
 */
export type TextMessage = {
  type: 'text';
  text: String;
};

/**
 * 共用圖片訊息
 */
export type ImageMessage = {
  type: 'image';
  imageUrl: String;
  previewImageUrl: String;
};

/**
 * 共用影片訊息
 */
export type VideoMessage = {
  type: 'video';
  videoUrl: String;
  previewImageUrl: String;
};

/**
 * 共用聲音訊息
 */
export type AudioMessage = {
  type: 'audio';
  audioUrl: String;
  duration: Number;
};

/**
 * 共用按鈕訊息
 */
export type ButtonMessage = {
  type: 'button';
  altText: String;
  title?: String;
  text: String;
  buttons: Array<Action>;
};

/**
 * 共用輪播訊息
 */
export type CarouselMessage = {
  type: 'carousel';
  altText: String;
  columns: Array<{
    title: String;
    text: String;
    imageUrl?: String;
    buttons: Array<Action>;
  }>;
};
