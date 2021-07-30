/**
 * line 按鈕「 postback 」事件
 */
type LinePostbackAction = {
  type: 'postback';
  label: String;
  data: String;
  displayText?: String;
};

/**
 * line 按鈕「 url 」事件
 */
type LineUrlAction = {
  type: 'uri';
  label: String;
  uri: String;
};

/**
 * line 按鈕「 phone 」事件
 */
type LinePhoneAction = {
  type: 'uri';
  label: String;
  uri: String;
};

type LineAction = LinePostbackAction | LineUrlAction | LinePhoneAction;

export { LineAction, LinePostbackAction, LineUrlAction, LinePhoneAction };
