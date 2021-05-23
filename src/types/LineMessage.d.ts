import { LineAction } from './LineAction';

/**
 * line 文字訊息
 */
type LineTextMessage = {
  type: 'text';
  text: String;
};

/**
 * line 圖片訊息
 */
type LineImageMessage = {
  type: 'image';
  originalContentUrl: String;
  previewImageUrl: String;
};

/**
 * line 影片訊息
 */
type LineVideoMessage = {
  type: 'video';
  originalContentUrl: String;
  previewImageUrl: String;
};

/**
 * line 聲音訊息
 */
type LineAudioMessage = {
  type: 'audio';
  originalContentUrl: String;
  duration: Number;
};

/**
 * line 按鈕訊息
 */
type LineButtonMessage = {
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
type LineCarouselMessage = {
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

type LineMessage =
  | LineTextMessage
  | LineImageMessage
  | LineVideoMessage
  | LineAudioMessage
  | LineButtonMessage
  | LineCarouselMessage;
type LineMessages = Array<LineMessage>;

export {
  LineMessages,
  LineMessage,
  LineTextMessage,
  LineImageMessage,
  LineVideoMessage,
  LineAudioMessage,
  LineButtonMessage,
  LineCarouselMessage,
};
