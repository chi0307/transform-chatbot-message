/**
 * 共用按鈕「 postback 」事件
 */
type PostbackAction = {
  type: 'postback';
  title: String;
  data: String;
};

/**
 * 共用按鈕「 url 」事件
 */
type UrlAction = {
  type: 'url';
  title: String;
  url: String;
};

/**
 * 共用按鈕「 phone 」事件
 */
type PhoneAction = {
  type: 'phone';
  title: String;
  number: String;
};

type Action = PostbackAction | UrlAction | PhoneAction;

export { Action, PostbackAction, UrlAction, PhoneAction };
