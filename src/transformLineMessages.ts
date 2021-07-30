import { Message, LineMessage } from '../types';
import { transformToLineActions } from './transformLineActions';

/**
 * 將「共用訊息格式」轉換成「 line 專用訊息格式」
 * @param message 共用訊息格式
 * @param param1.flex Button、carousel 訊息是否使用 flex (default: false)
 * @returns line 專用訊息格式
 */
const transformToLineMessage = (message: Message, { flex = false } = {}) => {
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
      if (flex) {
        let contents: Array<{
          type: 'text';
          text: String;
          wrap: true;
          offsetTop: String;
          weight?: String;
        }> = [
          {
            type: 'text',
            text: message.text,
            wrap: true,
            offsetTop: 'sm',
          },
        ];
        if (message.title) {
          contents.unshift({
            type: 'text',
            text: message.title,
            wrap: true,
            offsetTop: 'sm',
            weight: 'bold',
          });
        }

        lineMessage = {
          type: 'flex',
          altText: message.altText,
          contents: {
            type: 'bubble',
            size: 'kilo',
            body: {
              type: 'box',
              layout: 'vertical',
              contents,
              backgroundColor: '#F7F7F7',
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              contents: transformToLineActions(message.buttons).map((action) => ({
                type: 'button',
                action,
                height: 'sm',
              })),
            },
          },
        };
      } else {
        lineMessage = {
          type: 'template',
          altText: message.altText,
          template: {
            type: 'buttons',
            title: message.title || undefined,
            text: message.text,
            actions: transformToLineActions(message.buttons),
          },
        };
      }
      break;
    }

    case 'carousel': {
      if (flex) {
        lineMessage = {
          type: 'flex',
          altText: message.altText,
          contents: {
            type: 'carousel',
            contents: message.columns.map((column) => {
              let hero:
                | {
                    type: 'image';
                    url: String;
                    size: String;
                    aspectMode: String;
                    aspectRatio: String;
                  }
                | undefined;
              if (column.imageUrl) {
                hero = {
                  type: 'image',
                  url: column.imageUrl,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '1.51:1',
                };
              }

              let contents: Array<{
                type: 'text';
                text: String;
                wrap: true;
                offsetTop: String;
                weight?: String;
              }> = [];
              if (column.title) {
                contents.push({
                  type: 'text',
                  text: column.title,
                  wrap: true,
                  offsetTop: 'sm',
                });
              }
              if (column.text) {
                contents.push({
                  type: 'text',
                  text: column.text,
                  wrap: true,
                  offsetTop: 'sm',
                });
              }
              if (contents.length >= 2) {
                contents[0].weight = 'blod';
              }

              return {
                type: 'bubble',
                size: 'kilo',
                hero,
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents,
                  borderColor: '#EEEEEE',
                  borderWidth: '1px',
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: transformToLineActions(column.buttons).map((action) => ({
                    type: 'button',
                    action,
                    height: 'sm',
                  })),
                },
              };
            }),
          },
        };
      } else {
        const columns = message.columns.map((column) => {
          return {
            title: column.title && column.text ? column.title : undefined,
            text: column.text || column.title,
            thumbnailImageUrl: column.imageUrl || undefined,
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
      }
      break;
    }
  }

  return lineMessage;
};

/**
 * 將「共用訊息格式」轉換成「 line 專用訊息格式」
 * @param messages Array<共用訊息格式>
 * @param param1.flex Button、carousel 訊息是否使用 flex (default: false)
 * @returns Array<line 專用訊息格式>
 */
const transformToLineMessages = (messages: Array<Message>, { flex = false } = {}) => {
  const lineMessages: Array<LineMessage> = [];
  for (const message of messages) {
    const lineMessage = transformToLineMessage(message, { flex });
    if (lineMessage) {
      lineMessages.push(lineMessage);
    }
  }
  return lineMessages;
};

export { transformToLineMessage, transformToLineMessages };
