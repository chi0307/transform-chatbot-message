import { FacebookPostbackAction, FacebookUrlAction, FacebookPhoneAction } from './FacebookActions';

type FacebookAction = FacebookPostbackAction | FacebookUrlAction | FacebookPhoneAction;

/**
 * facebook 文字訊息
 */
export type FacebookTextMessage = {
  text: String;
};

/**
 * facebook 圖片訊息
 */
export type FacebookImageMessage = {
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
export type FacebookVideoMessage = {
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
export type FacebookAudioMessage = {
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
export type FacebookButtonMessage = {
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
export type FacebookCarouselMessage = {
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
