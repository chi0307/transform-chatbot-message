import { Message, SlackMessage, SlackButtonMessage, SlackCarouselMessage } from '../types';
import { transformToSlackActions } from './transformSlackActions';

const transformToSlackMessage = (message: Message): SlackMessage | SlackButtonMessage | SlackCarouselMessage => {
  let slackMessage: SlackMessage | SlackButtonMessage | SlackCarouselMessage | null = null;
  switch (message.type) {
    case 'text': {
      slackMessage = {
        type: 'section',
        text: {
          type: 'plain_text',
          text: message.text,
        },
      };
      break;
    }

    case 'image': {
      slackMessage = {
        type: 'image',
        image_url: message.imageUrl,
        alt_text: ' ',
      };
      break;
    }

    case 'video': {
      slackMessage = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message.videoUrl,
        },
      };
      break;
    }

    case 'audio': {
      slackMessage = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message.audioUrl,
        },
      };
      break;
    }

    case 'button': {
      slackMessage = [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: message.text,
          },
        },
        {
          type: 'actions',
          elements: transformToSlackActions(message.buttons),
        },
      ];
      if (message.title) {
        slackMessage = [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: message.title,
            },
          },
          ...slackMessage,
        ];
      }
      break;
    }

    case 'carousel': {
      const elements: Array<SlackCarouselMessage> = message.columns.map((column) => {
        let element: SlackCarouselMessage = [
          {
            type: 'actions',
            elements: transformToSlackActions(column.buttons),
          },
        ];

        const textColumn: {
          type: 'section';
          text: {
            type: 'plain_text';
            text: String;
          };
          accessory?: {
            type: 'image';
            image_url: String;
            alt_text: String;
          };
        } = {
          type: 'section',
          text: {
            type: 'plain_text',
            text: column.text || column.title,
          },
        };
        if (column.imageUrl) {
          textColumn.accessory = {
            type: 'image',
            image_url: column.imageUrl,
            alt_text: ' ',
          };
        }
        element.unshift(textColumn);

        if (column.title && column.text) {
          element.unshift({
            type: 'header',
            text: {
              type: 'plain_text',
              text: column.title,
            },
          });
        }
        return element;
      });

      slackMessage = elements.reduce((array, element) => {
        if (array.length) {
          array = array.concat({
            type: 'divider',
          });
        }
        array = array.concat(element);
        return array;
      }, []);
      break;
    }
  }
  return slackMessage;
};

/**
 * 將「共用訊息格式」轉換成「 slack 專用訊息格式」
 * @param messages Array<共用訊息格式>
 * @returns Array<slack 專用訊息格式>
 */
const transformToSlackMessages = (messages: Array<Message>) => {
  let slackMessages: Array<SlackMessage> = [];
  for (const message of messages) {
    const slackMessage = transformToSlackMessage(message);
    if (Array.isArray(slackMessage)) {
      slackMessages = [...slackMessages, ...slackMessage];
    } else if (slackMessage) {
      slackMessages.push(slackMessage);
    }
  }
  return slackMessages;
};

export { transformToSlackMessages };
