/**
 * facebook 按鈕「 postback 」事件
 */
export type FacebookPostbackAction = {
  type: 'postback';
  title: String;
  payload: String;
};

/**
 * facebook 按鈕「 url 」事件
 */
export type FacebookUrlAction = {
  type: 'web_url';
  title: String;
  url: String;
};

/**
 * facebook 按鈕「 phone 」事件
 */
export type FacebookPhoneAction = {
  type: 'phone_number';
  title: String;
  payload: String;
};
