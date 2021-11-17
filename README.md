# 我的餐廳清單
使用 Node.js + Express 打造的餐廳清單，方便使用者管理個人餐廳列表。能夠登入系統，確保個人隱私。可以對自己建立的餐廳進行瀏覽、新增、修改、刪除，也可以搜尋或排序餐廳列表。

## 產品功能
### 餐廳系統
1. **使用者可以在首頁看到所有餐廳與它們的簡單資料：**
    - 餐廳照片、餐廳名稱、餐廳分類、餐廳評分
2. **使用者可以再點進去看餐廳的詳細資訊：**
    - 類別、地址、電話、描述、圖片
3. **使用者可以透過搜尋餐廳名稱來找到特定的餐廳**

4. **使用者可以瀏覽、新增、修改、刪除一家餐廳**

5. **使用者可以依字母順序、地區或類型進行排序**

### 使用者認證系統
1. **使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼**
2. **使用者也可以透過 Facebook Login 直接登入**

3. **使用者的密碼經加密存入資料庫**

4. **使用者必須登入才能使用餐廳清單**

5. **使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息**

## 環境建置與需求
*   Node.js

## 安裝與執行步驟 (installation and execution)
1. 打開你的 terminal，Clone 此專案至本機電腦
`git clone https://github.com/dream184/alphacamp2-3_HW_restaurant`
2. 開啟終端機(Terminal)，進入存放此專案的資料夾
`cd restaurantList`
3. 安裝 npm 套件
`在 Terminal 輸入 npm install 指令`
4. 安裝 nodemon 套件
`在 Terminal 輸入 npm install nodemon 指令`
5.設定環境變數
`將根目錄的.env.example改成.env`
6. 建立種子資料
`npm run seed`
7. 啟動伺服器，執行 app.js 檔案
`在 Terminal 輸入 nodemon app.js 指令`
8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
`Express is listening on http://localhost:3000`
9. 輸入 SEED_USER 帳號密碼即可登入
`
    name: 'user1'
    email: 'user1@example.com'
    password: '12345678'

    name: 'user1'
    email: 'user2@example.com'
    password: '12345678'
`

## Contributor - 專案開發人員
* [李仕堡](https://github.com/dream184)
