/**
 * slack 按鈕「 postback 」事件
 */
type SlackPostbackAction = {
  type: 'button';
  text: {
    type: 'plain_text';
    text: String;
  };
  action_id: String;
};

/**
 * slack 按鈕「 url 」事件
 */
type SlackUrlAction = {
  type: 'button';
  text: {
    type: 'plain_text';
    text: String;
  };
  url: String;
};

/**
 * slack 按鈕「 phone 」事件
 */
type SlackPhoneAction = {
  type: 'button';
  text: {
    type: 'plain_text';
    text: String;
  };
  url: String;
};

type SlackAction = SlackPostbackAction | SlackUrlAction | SlackPhoneAction;

export { SlackAction, SlackPostbackAction, SlackUrlAction, SlackPhoneAction };
