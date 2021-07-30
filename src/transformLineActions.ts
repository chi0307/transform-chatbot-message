import { Action, LineAction } from '../types';

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

export { transformToLineActions };
