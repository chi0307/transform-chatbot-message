import { Action, FacebookAction } from '../types';

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

export { transformToFacebookActions };
