import { Message, FacebookMessage } from '../types';
import { transformToFacebookActions } from './transformFacebookActions';

/**
 * 將「共用訊息格式」轉換成「 facebook 專用訊息格式」
 * @param message 共用訊息格式
 * @returns facebook 專用訊息格式
 */
const transformToFacebookMessage = (message: Message) => {
  let facebookMessage: FacebookMessage | null = null;
  switch (message.type) {
    case 'text': {
      facebookMessage = {
        text: message.text,
      };
      break;
    }

    case 'image': {
      facebookMessage = {
        attachment: {
          type: 'image',
          payload: {
            url: message.imageUrl,
          },
        },
      };
      break;
    }

    case 'video': {
      facebookMessage = {
        attachment: {
          type: 'video',
          payload: {
            url: message.videoUrl,
          },
        },
      };
      break;
    }

    case 'audio': {
      facebookMessage = {
        attachment: {
          type: 'audio',
          payload: {
            url: message.audioUrl,
          },
        },
      };
      break;
    }

    case 'button': {
      facebookMessage = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: message.text,
            buttons: transformToFacebookActions(message.buttons),
          },
        },
      };
      break;
    }

    case 'carousel': {
      const elements = message.columns.map((column) => {
        return {
          title: column.title || column.text,
          subtitle: column.title && column.text ? column.text : undefined,
          image_url: column.imageUrl || undefined,
          buttons: transformToFacebookActions(column.buttons),
        };
      });

      facebookMessage = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements,
          },
        },
      };
      break;
    }
  }

  return facebookMessage;
};

/**
 * 將「共用訊息格式」轉換成「 facebook 專用訊息格式」
 * @param messages Array<共用訊息格式>
 * @returns Array<facebook 專用訊息格式>
 */
const transformToFacebookMessages = (messages: Array<Message>) => {
  const facebookMessages: Array<FacebookMessage> = [];
  for (const message of messages) {
    const facebookMessage = transformToFacebookMessage(message);
    if (facebookMessage) {
      facebookMessages.push(facebookMessage);
    }
  }
  return facebookMessages;
};

export { transformToFacebookMessage, transformToFacebookMessages };
