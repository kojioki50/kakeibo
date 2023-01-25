# 家計簿アプリ
react,nodejs,mongodbで家計簿を管理するためのアプリです。
- react
- Node
- Mongodb
- Tailwind CSS - [Cheat Sheet](https://flowbite.com/tools/tailwind-cheat-sheet/)


## Available Scripts

### `npm start`

server/app.mjsを起動します。
フロントはbuildフォルダを取得するようにserver/app.mjsに記述しています。
srcフォルダを変更した際は一度npm buildをしてからnpm startして下さい。
データベースの作成しないとデータの登録はできません。
server/helpers/db.mjsと下記サイトを参照して設定を行なってください。
(https://www.mongodb.com/)
(https://mongoosejs.com/)


#### 実行環境
- react 18.2.0
- node 18.12.1
- mongodb 4.11.0