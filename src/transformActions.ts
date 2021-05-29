import { Action } from './types/Action';
import { LineAction } from './types/LineAction';
import { FacebookAction } from './types/FacebookAction';

/**
 * 將「共用按鈕事件格式」轉換成「 line 按鈕事件格式」
 * @param actions Array<共用按鈕事件格式>
 * @returns Array<line 按鈕事件格式>
 */
const transformToLineActions = (actions: Array<Action>) => {
  const lineActions: Array<LineAction> = [];
  for (const action of actions) {
    let lineAction: LineAction | null = null;
    switch (action.type) {
      case 'postback': {
        lineAction = {
          type: 'postback',
          label: action.title,
          displayText: action.title,
          data: action.data,
        };
        break;
      }
      case 'url': {
        lineAction = {
          type: 'uri',
          label: action.title,
          uri: action.url,
        };
        break;
      }
      case 'phone': {
        lineAction = {
          type: 'uri',
          label: action.title,
          uri: `tel:${action.number}`,
        };
        break;
      }
    }
    if (lineAction) {
      lineActions.push(lineAction);
    }
  }
  return lineActions;
};

/**
 * 將「共用按鈕事件格式」轉換成「 facebook 按鈕事件格式」
 * @param actions Array<共用按鈕事件格式>
 * @returns Array<facebook 按鈕事件格式>
 */
const transformToFacebookActions = (actions: Array<Action>) => {
  const facebookActions: Array<FacebookAction> = [];
  for (const action of actions) {
    let facebookAction: FacebookAction | null = null;
    switch (action.type) {
      case 'postback': {
        facebookAction = {
          type: 'postback',
          title: action.title,
          payload: action.data,
        };
        break;
      }
      case 'url': {
        facebookAction = {
          type: 'web_url',
          title: action.title,
          url: action.url,
        };
        break;
      }
      case 'phone': {
        facebookAction = {
          type: 'phone_number',
          title: action.title,
          payload: action.number,
        };
        break;
      }
    }
    if (facebookAction) {
      facebookActions.push(facebookAction);
    }
  }
  return facebookActions;
};

export { transformToLineActions, transformToFacebookActions };
