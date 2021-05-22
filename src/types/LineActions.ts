/**
 * line 按鈕「 postback 」事件
 */
export type LinePostbackAction = {
  type: 'postback';
  label: String;
  data: String;
};

/**
 * line 按鈕「 url 」事件
 */
export type LineUrlAction = {
  type: 'uri';
  label: String;
  uri: String;
};

/**
 * line 按鈕「 phone 」事件
 */
export type LinePhoneAction = {
  type: 'uri';
  label: String;
  uri: String;
};
