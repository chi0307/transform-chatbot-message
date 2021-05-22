# FB、Line 共用 chatbot 模板

透過共用模板，會將以下 json 轉成 FB、Line 各自的訊息格式。

---

## 使用方式

```js
const {
  transformToLineMessage,
  transformToLineMessages,
  transformToFacebookMessage,
  transformToFacebookMessages,
} = require('@chi0307/transform-chatbot-message');

let message = {
  type: 'text',
  text: 'Hello World!!',
};

let facebookMessage = transformToFacebookMessage(message);
let lineMessage = transformToLineMessage(message);

// 將 Messsage 進行推播
```

---

## 文字訊息

```typescript
{
  "type": "text",
  "text": String
}
```

| 欄位 | 說明     | Line 限制 | FB 限制   |
| ---- | -------- | --------- | --------- |
| text | 文字訊息 | 5000 字元 | 2000 字元 |

---

## 圖片訊息

```typescript
{
  "type": "image",
  "imageUrl": String,
  "previewImageUrl": String
}
```

| 欄位            | 說明         | Line 限制                                                                                | FB 限制                                           |
| --------------- | ------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------- |
| imageUrl        | 圖片網址     | 網址長度 1000 字元<br>HTTPS over TLS 1.2 or later<br>JPEG or PNG<br>Max file size: 10 MB | Max file size: 25 MB<br>fetched within 10 seconds |
| previewImageUrl | 預覽圖片網址 | 網址長度 1000 字元<br>HTTPS over TLS 1.2 or later<br>JPEG or PNG<br>Max file size: 1 MB  | 不適用                                            |

---

## 影片訊息

```typescript
{
  "type": "video",
  "videoUrl": String,
  "previewImageUrl": String
}
```

| 欄位            | 說明         | Line 限制                                                                               | FB 限制                                           |
| --------------- | ------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| videoUrl        | 影片網址     | 網址長度 1000 字元<br>HTTPS over TLS 1.2 or later<br>mp4<br>Max file size: 200 MB       | Max file size: 25 MB<br>fetched within 75 seconds |
| previewImageUrl | 影片縮圖網址 | 網址長度 1000 字元<br>HTTPS over TLS 1.2 or later<br>JPEG or PNG<br>Max file size: 1 MB | 不適用                                            |

---

## 聲音訊息

```typescript
{
  "type": "audio",
  "audioUrl": String,
  "duration": Number
}
```

| 欄位     | 說明     | Line 限制                                                                         | FB 限制                                           |
| -------- | -------- | --------------------------------------------------------------------------------- | ------------------------------------------------- |
| audioUrl | 聲音網址 | 網址長度 1000 字元<br>HTTPS over TLS 1.2 or later<br>m4a<br>Max file size: 200 MB | Max file size: 25 MB<br>fetched within 10 seconds |
| duration | 聲音長度 | 聲音檔案長度 (milliseconds)                                                       | 不適用                                            |

---

## 按鈕訊息

```typescript
{
  "type": "button",
  "altText": String,
  "title"?: String,
  "text": String,
  "buttons": Array<Action>
}
```

| 欄位    | 說明                      | Line 限制          | FB 限制   |
| ------- | ------------------------- | ------------------ | --------- |
| altText | 預覽文字訊息              | 400 字元           | 不適用    |
| title   | 訊息標題 (Optional)       | 40 字元 (Optional) | 不適用    |
| text    | 訊息內文                  | 160 字元           | 640 字元  |
| buttons | [按鈕事件](#按鈕事件)陣列 | 最多 4 個          | 最多 3 個 |

---

## 輪播訊息

```typescript
{
  "type": "carousel",
  "altText": String,
  "columns": Array<{
    "title": String,
    "text": String,
    "imageUrl"?: String,
    "buttons": Array<Action>,
  }>
}
```

| 欄位            | 說明                      | Line 限制                                                                                                                                            | FB 限制            |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| altText         | 預覽文字訊息              | 400 字元                                                                                                                                             | 不適用             |
| columns         | 輪播陣列                  | 最多 10 個                                                                                                                                           | 最多 10 個         |
| column.title    | 單一區塊標題              | 40 字元 (Optional)                                                                                                                                   | 80 字元            |
| column.text     | 單一區塊內文              | 120 字元 (no image or title) <br> 60 字元 (message with an image or title)                                                                           | 80 字元 (Optional) |
| column.imageUrl | 單一區塊圖片 (Optional)   | 網址長度 1000 字元<br>HTTPS over TLS 1.2 or later<br>JPEG or PNG <br>Aspect ratio: 1:1.51<br>Max width: 1024px<br>Max file size: 10 MB<br>(Optional) | (Optional)         |
| buttons         | [按鈕事件](#按鈕事件)陣列 | 最多 3 個                                                                                                                                            | 最多 3 個          |

---

## 按鈕事件

### 回覆訊息 (PostBack)

```typescript
{
  type: 'postback',
  title: String,
  data: String
}
```

| 欄位  | 說明                                |
| ----- | ----------------------------------- |
| title | 按鈕文字                            |
| data  | 回覆內容，需使用 webhook 接收並處理 |

---

### 打開網頁 (Url)

```typescript
{
  type: 'url',
  title: String,
  url: String
}
```

| 欄位  | 說明           |
| ----- | -------------- |
| title | 按鈕文字       |
| url   | 點擊後開啟網頁 |

---

### 打電話 (Phone)

```typescript
{
  type: 'phone',
  title: String,
  number: String
}
```

| 欄位  | 說明                                                         | 範例          |
| ----- | ------------------------------------------------------------ | ------------- |
| title | 按鈕文字                                                     |               |
| url   | 點擊後打電話<br>電話格式必須是 +<COUNTRY_CODE><PHONE_NUMBER> | +886912345678 |
