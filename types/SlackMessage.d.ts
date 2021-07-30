import { SlackAction } from './SlackAction';

/**
 * slack 文字訊息
 */
type SlackTextMessage = {
  type: 'section';
  text: {
    type: 'plain_text';
    text: String;
  };
};

/**
 * slack 圖片訊息
 */
type SlackImageMessage = {
  type: 'image';
  image_url: String;
  alt_text: String;
};

/**
 * slack 影片訊息
 */
type SlackVideoMessage = {
  type: 'section';
  text: {
    type: 'mrkdwn';
    text: String;
  };
};

/**
 * slack 聲音訊息
 */
type SlackAudioMessage = {
  type: 'section';
  text: {
    type: 'mrkdwn';
    text: String;
  };
};

/**
 * slack 標題訊息元素
 */
type SlackHeaderMessage = {
  type: 'header';
  text: {
    type: 'plain_text';
    text: String;
  };
};

/**
 * slack 按鈕事件訊息元素
 */
type SlackActionMessage = {
  type: 'actions';
  elements: Array<SlackAction>;
};

/**
 * slack 按鈕訊息
 */
type SlackButtonMessage = Array<SlackHeaderMessage | SlackTextMessage | SlackActionMessage>;

/**
 * slack 文字、圖片訊息元素
 */
type SlackTextImageMessage = {
  type: 'section';
  text: {
    type: 'plain_text';
    text: String;
  };
  accessory: {
    type: 'image';
    image_url: String;
    alt_text: String;
  };
};

type SlackDividerMessage = {
  type: 'divider';
};

/**
 * slack 輪播訊息
 */
type SlackCarouselMessage = Array<
  SlackHeaderMessage | SlackTextImageMessage | SlackTextMessage | SlackActionMessage | SlackDividerMessage
>;

type SlackMessage =
  | SlackTextMessage
  | SlackImageMessage
  | SlackVideoMessage
  | SlackAudioMessage
  | SlackHeaderMessage
  | SlackActionMessage
  | SlackTextImageMessage
  | SlackDividerMessage;
type SlackMessages = Array<SlackMessage>;

export {
  SlackMessages,
  SlackMessage,
  SlackTextMessage,
  SlackImageMessage,
  SlackVideoMessage,
  SlackAudioMessage,
  SlackButtonMessage,
  SlackCarouselMessage,
};
