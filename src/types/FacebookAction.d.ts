/**
 * facebook 按鈕「 postback 」事件
 */
type FacebookPostbackAction = {
  type: 'postback';
  title: String;
  payload: String;
};

/**
 * facebook 按鈕「 url 」事件
 */
type FacebookUrlAction = {
  type: 'web_url';
  title: String;
  url: String;
};

/**
 * facebook 按鈕「 phone 」事件
 */
type FacebookPhoneAction = {
  type: 'phone_number';
  title: String;
  payload: String;
};

type FacebookAction = FacebookPostbackAction | FacebookUrlAction | FacebookPhoneAction;

export { FacebookAction, FacebookPostbackAction, FacebookUrlAction, FacebookPhoneAction };
