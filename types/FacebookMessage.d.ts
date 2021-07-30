import { FacebookAction } from './FacebookAction';

/**
 * facebook 文字訊息
 */
type FacebookTextMessage = {
  text: String;
};

/**
 * facebook 圖片訊息
 */
type FacebookImageMessage = {
  attachment: {
    type: 'image';
    payload: {
      url: String;
    };
  };
};

/**
 * facebook 影片訊息
 */
type FacebookVideoMessage = {
  attachment: {
    type: 'video';
    payload: {
      url: String;
    };
  };
};

/**
 * facebook 聲音訊息
 */
type FacebookAudioMessage = {
  attachment: {
    type: 'audio';
    payload: {
      url: String;
    };
  };
};

/**
 * facebook 按鈕訊息
 */
type FacebookButtonMessage = {
  attachment: {
    type: 'template';
    payload: {
      template_type: 'button';
      text: String;
      buttons: Array<FacebookAction>;
    };
  };
};

/**
 * facebook 輪播訊息
 */
type FacebookCarouselMessage = {
  attachment: {
    type: 'template';
    payload: {
      template_type: 'generic';
      elements: Array<{
        title: String;
        subtitle?: String;
        image_url?: String;
        buttons: Array<FacebookAction>;
      }>;
    };
  };
};

type FacebookMessage =
  | FacebookTextMessage
  | FacebookImageMessage
  | FacebookVideoMessage
  | FacebookAudioMessage
  | FacebookButtonMessage
  | FacebookCarouselMessage;
type FacebookMessages = Array<FacebookMessage>;

export {
  FacebookMessages,
  FacebookMessage,
  FacebookTextMessage,
  FacebookImageMessage,
  FacebookVideoMessage,
  FacebookAudioMessage,
  FacebookButtonMessage,
  FacebookCarouselMessage,
};
