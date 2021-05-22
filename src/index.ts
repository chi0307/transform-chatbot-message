import { TextMessage, ImageMessage, VideoMessage, AudioMessage, ButtonMessage, CarouselMessage } from './types/Message';
import {
  LineTextMessage,
  LineImageMessage,
  LineVideoMessage,
  LineAudioMessage,
  LineButtonMessage,
  LineCarouselMessage,
} from './types/LineMessage';
import {
  FacebookTextMessage,
  FacebookImageMessage,
  FacebookVideoMessage,
  FacebookAudioMessage,
  FacebookButtonMessage,
  FacebookCarouselMessage,
} from './types/FacebookMessage';
import { transformToLineActions, transformToFacebookActions } from './transformActions';

type Message = TextMessage | ImageMessage | VideoMessage | AudioMessage | ButtonMessage | CarouselMessage;

type LineMessage =
  | LineTextMessage
  | LineImageMessage
  | LineVideoMessage
  | LineAudioMessage
  | LineButtonMessage
  | LineCarouselMessage;

type FacebookMessage =
  | FacebookTextMessage
  | FacebookImageMessage
  | FacebookVideoMessage
  | FacebookAudioMessage
  | FacebookButtonMessage
  | FacebookCarouselMessage;

/**
 * 將「共用訊息格式」轉換成「 line 專用訊息格式」
 * @param message 共用訊息格式
 * @returns line 專用訊息格式
 */
const transformToLineMessage = (message: Message) => {
  let lineMessage: LineMessage | null = null;

  switch (message.type) {
    case 'text': {
      lineMessage = {
        type: 'text',
        text: message.text,
      };
      break;
    }

    case 'image': {
      lineMessage = {
        type: 'image',
        originalContentUrl: message.imageUrl,
        previewImageUrl: message.previewImageUrl,
      };
      break;
    }

    case 'video': {
      lineMessage = {
        type: 'video',
        originalContentUrl: message.videoUrl,
        previewImageUrl: message.previewImageUrl,
      };
      break;
    }

    case 'audio': {
      lineMessage = {
        type: 'audio',
        originalContentUrl: message.audioUrl,
        duration: message.duration,
      };
      break;
    }

    case 'button': {
      lineMessage = {
        type: 'template',
        altText: message.altText,
        template: {
          type: 'buttons',
          title: message.title,
          text: message.text,
          actions: transformToLineActions(message.buttons),
        },
      };
      break;
    }

    case 'carousel': {
      const columns = message.columns.map((column) => {
        return {
          title: column.title,
          text: column.text,
          thumbnailImageUrl: column.imageUrl,
          actions: transformToLineActions(column.buttons),
        };
      });

      lineMessage = {
        type: 'template',
        altText: message.altText,
        template: {
          type: 'carousel',
          columns,
        },
      };
      break;
    }
  }

  return lineMessage;
};

/**
 * 將「共用訊息格式」轉換成「 line 專用訊息格式」
 * @param messages Array<共用訊息格式>
 * @returns Array<line 專用訊息格式>
 */
const transformToLineMessages = (messages: Array<Message>) => {
  const lineMessages: Array<LineMessage> = [];
  for (const message of messages) {
    const lineMessage = transformToLineMessage(message);
    if (lineMessage) {
      lineMessages.push(lineMessage);
    }
  }
  return lineMessages;
};

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
          title: column.title,
          subtitle: column.text,
          image_url: column.imageUrl,
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

export { transformToLineMessage, transformToLineMessages, transformToFacebookMessage, transformToFacebookMessages };
