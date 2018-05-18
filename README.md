# Consent Manager (PolicyBannerWithGTM)
## 日本語 (English at the bottom )
こちらは、Webサイトなどでクッキーのパーミッションを取るためのバナー表示を行うコンセントマネージャーと呼ばれるものです。
Google Tag Managerとも連携しており、許可をした人にだけ、特定のタグを出すということも可能です。
こちらをベースに少しカスタマイズをしていただくことで、よりかんたんに対応ができるのではないかと思います。

Webで事業を提供する企業がより、消費者を安心させる情報の取り扱いと提供につながると良いなと思います。

このソフトウェアは MIT License　です。
Copyright (c) 2018 effort science co.,ltd.

 <使い方>
  1. "plcy_ja.js" というjsファイルを取得して、許可を必要とする全ページに埋め込んでください。
      ex) <script src="./plcy_ja.js"></script>

  2. 必要ならカスタマイズが可能です。
     このJSタグでは全変数に"plcy_"というPrefixを設定しており、他の変数と競合するのを避けています。

    * plcy_url_cookie_policy (任意)
      こちらはCookie PolicyやプライバシーポリシーページのURLを設定してください。
      空白にした場合、リンク自体を表示しないことも可能です。

    * plcy_message (以下、必須)
      表示したい許認可メッセージを入力してください。

    * plcy_button_name
      「Cookie使用許可」などボタンの名称を任意で変更してください。

    * plcy_button_color
      ボタンの色を決めてください。ヘキサ表現（'#000000'）や定義済み名称（'black'）、rgbaなど自由に設定してみてください。

    * plcy_border_color
      こちらはボーダー（枠線）の色です。

    * plcy_back_color
      バナーの背景の色です。デフォルトは黒っぽく透明な色にしていますが、サイトに合わせて変えても良いと思います。

    * plcy_font_color
      フォントカラーです。デフォルトは白です。

  3. [GTMにて(任意)]　Google Tag Manager ("GTM")にてデータレイヤー（DataLayer）変数を作成してください。
      変数名に、'plcyIsAccepted'、デフォルト値に '0'を設定してください。（こちらに、データをプッシュして起動判定するため間違えると稼働しません）

  4. [GTMにて(任意)] トリガーメニューから進み、カスタムイベントを作成してください。
      イベント名に'eventPolicyAccepted' を設定してください。（こちらを、javascriptから起動しますので間違えないでください。）
      トリガーの名称はなんでも構いません。

  5. [GTMにて(任意)] ４で作成したトリガーを発火コントロールをしたいタグに紐づけてください。
      既存でトリガー（All Pageなど）に設定している場合、GTMでは追加すると「または」になるので、きちんと削除することを忘れないでください。

  6. [htmlページにて任意] 必要なら、許可を行うまで起動させたくないボタンや機能を制御できます。
      Cookie の 'plcyIsAccepted'を読み込み判定を行なってください

      ex) JQueryを使った事例

```JavaScript
      if (typeof plcy_isAccepted === "undefined"){
        var plcy_isAccepted = 0;
      }
      $(function(){
        $('#input_btn').click(function(e){
          e.preventDefault();
          plcy_isAccepted = plcy_getCookie('plcyIsAccepted');
          if (plcy_isAccepted >0){
            alert('はい、あなたは許可されています。');  //ここを書き換えてください。
          }else{
            alert('恐縮ですが、ご利用前に、許可するを押してください。');   //ここを書き換えてください。
          }
        })
      });
```

## English
This software is enable to show "Getting Cookie Permission Bar" and get accept.
If you want to start some tools like Google Analytics or some tools after getting cookie permissions from users.
You can make it easily to use this software.

- This software is MIT License.
- Copyright (c) 2018 effort science co.,ltd.

 <Getting Start>
  1. Please load this js files in your html file.
      ex) <script src="./plcy_ja.js"></script>
  2. Please Customize the data if you like.
     We use "plcy_" strings as prefix to avoid coflict variables you use in your site.

    * plcy_url_cookie_policy (Optional)
      Please write the URL link for privacy policy page or cookie policy page.
      If this is blank , it's OK , this system don't show the link.

    * plcy_message (Mandatory)
      Set message you want to show.

    * plcy_button_name
      Set button name users push when they accept.

    * plcy_button_color
      Set button color like '#000000' or 'black' as you like.

    * plcy_border_color
      Set button border line.

    * plcy_back_color
      Please set background color of permission banner.

    * plcy_font_color
      Set font color.

  3. [In GTM] Create DataLayer Valriable in Google Tag Manager ("GTM").
      Set 'plcyIsAccepted' for Varibale name and 0 for default value.

  4. [In GTM] Make custom event from Trigger menu.
      You should set it 'eventPolicyAccepted' as event name.

  5. [In GTM] Set the trigger you created in No.4 into Tag you want to control.

  6. If you want to stop use some features in your site before permission,
      Please use the cookie named 'plcyIsAccepted'.

      ex) the case with jQuery

```JavaScript
      if (typeof plcy_isAccepted === "undefined"){
        var plcy_isAccepted = 0;
      }
      $(function(){
        $('#input_btn').click(function(e){
          e.preventDefault();
          plcy_isAccepted = plcy_getCookie('plcyIsAccepted');
          if (plcy_isAccepted >0){
            alert('Yes , you can use our tool! ');
          }else{
            alert('Please give us permission to use your cookies !')
          }
        })
      });
```

That's all.
