import { LinePostbackAction, LineUrlAction, LinePhoneAction } from './LineActions';

type LineAction = LinePostbackAction | LineUrlAction | LinePhoneAction;

/**
 * line 文字訊息
 */
export type LineTextMessage = {
  type: 'text';
  text: String;
};

/**
 * line 圖片訊息
 */
export type LineImageMessage = {
  type: 'image';
  originalContentUrl: String;
  previewImageUrl: String;
};

/**
 * line 影片訊息
 */
export type LineVideoMessage = {
  type: 'video';
  originalContentUrl: String;
  previewImageUrl: String;
};

/**
 * line 聲音訊息
 */
export type LineAudioMessage = {
  type: 'audio';
  originalContentUrl: String;
  duration: Number;
};

/**
 * line 按鈕訊息
 */
export type LineButtonMessage = {
  type: 'template';
  altText: String;
  template: {
    type: 'buttons';
    title?: String;
    text: String;
    actions: Array<LineAction>;
  };
};

/**
 * line 輪播訊息
 */
export type LineCarouselMessage = {
  type: 'template';
  altText: String;
  template: {
    type: 'carousel';
    columns: Array<{
      title?: String;
      text: String;
      thumbnailImageUrl?: String;
      actions: Array<LineAction>;
    }>;
  };
};
