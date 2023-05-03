# prisma 勉強用

1. ディレクトリを用意して、vscode で開く

   ```sh
   mkdir prisma-tutorial-js
   code prisma-tutorial-js
   ```

2. 環境を準備

   ```sh
   touch server.js
   npm init -y
   npm i prisma express nodemon @prisma/client
   ```

3. server.js に express server 起動するところを書く

   - `PORT` は被らないように適当に指定する（今回は `8001`）
   - start を nodemon に書き換えておく
   - `npm start` でサーバーを起動する

4. postgresql を docker で起動する

   - docker-compose.yml を作成し　`docker-compose up -d` を実行
   - `PORT` は被らないように適当に指定する（今回は `5437`）
   - user_name: `postgres`
   - password: `postgres`
   - db_name: `app`

5. prisma の準備

   - `npx prisma init` を実行
   - .env の`DATABASE_URL` を書き換える

6. schema を定義する

   - prisma/schema.prisma に model を追加
   - 今回は以下のテーブル構成とする

     ```mermaid
     erDiagram
     Post ||--o{ Comment: "1つの投稿は0以上のコメントを持つ"

     Post {
        Int id PK
        String title "投稿タイトル"
        String body "投稿内容"
        DateTime created_at
        DateTime deleted_at
     }

     Comment {
        Int id PK
        Int postId FK
        String comment "コメント内容"
        DateTime created_at
        DateTime deleted_at
     }
     ```

7. マイグレーションをする

   ```
   npx prisma migrate dev --name init
   ```
