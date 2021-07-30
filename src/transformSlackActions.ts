import { Action, SlackAction } from '../types';

/**
 * 將「共用按鈕事件格式」轉換成「 slack 按鈕事件格式」
 * @param actions Array<共用按鈕事件格式>
 * @returns Array<slack 按鈕事件格式>
 */
const transformToSlackActions = (actions: Array<Action>) => {
  const slackActions: Array<SlackAction> = [];
  for (const action of actions) {
    let lineAction: SlackAction | null = null;
    switch (action.type) {
      case 'postback': {
        lineAction = {
          type: 'button',
          text: {
            type: 'plain_text',
            text: action.title,
          },
          action_id: action.data,
        };
        break;
      }
      case 'url': {
        lineAction = {
          type: 'button',
          text: {
            type: 'plain_text',
            text: action.title,
          },
          url: action.url,
        };
        break;
      }
      case 'phone': {
        lineAction = {
          type: 'button',
          text: {
            type: 'plain_text',
            text: action.title,
          },
          url: `tel://${action.number}`,
        };
        break;
      }
    }
    if (lineAction) {
      slackActions.push(lineAction);
    }
  }
  return slackActions;
};

export { transformToSlackActions };
