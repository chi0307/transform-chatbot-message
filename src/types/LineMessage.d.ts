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

type LineButtonFlexMessage = {
  type: 'flex';
  altText: String;
  contents: {
    type: 'bubble';
    size: String;
    body: {
      type: 'box';
      layout: 'vertical';
      contents: Array<{
        type: 'text';
        text: String;
        wrap: true;
        offsetTop: String;
        weight?: String;
      }>;
      backgroundColor: String;
    };
    footer: {
      type: 'box';
      layout: 'vertical';
      contents: Array<{
        type: 'button';
        height: String;
        action: LineAction;
      }>;
    };
  };
};

type LineCarouselFlexMessage = {
  type: 'flex';
  altText: String;
  contents: {
    type: 'carousel';
    contents: Array<{
      type: 'bubble';
      size: String;
      hero?: {
        type: 'image';
        url: String;
        size: String;
        aspectMode: String;
        aspectRatio: String;
      };
      body: {
        type: 'box';
        layout: 'vertical';
        contents: Array<{
          type: 'text';
          text: String;
          wrap: true;
          offsetTop: String;
          weight?: String;
        }>;
        borderColor: String;
        borderWidth: String;
      };
      footer: {
        type: 'box';
        layout: 'vertical';
        contents: Array<{
          type: 'button';
          height: String;
          action: LineAction;
        }>;
      };
    }>;
  };
};

type LineMessage =
  | LineTextMessage
  | LineImageMessage
  | LineVideoMessage
  | LineAudioMessage
  | LineButtonMessage
  | LineCarouselMessage
  | LineButtonFlexMessage
  | LineCarouselFlexMessage;
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
  LineButtonFlexMessage,
  LineCarouselFlexMessage,
};
