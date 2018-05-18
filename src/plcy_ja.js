/**
  GTM PolicyBanner
   Google TagManager (GTM)を利用して、クッキー利用許可のないタグを発火しないことができます。

   <利用方法>
    1. このJSファイルを制御したい全てのページで読み込んでください。　<script src="./plcy_ja.js"></script>
    2. plcy_xxxx の変数に渡すデータをカスタマイズしてください。
    3. GTM 「変数」で　データレイヤー変数を作成し、'plcyIsAccepted':0 としてください
    4. GTM 「トリガー」でカスタムイベントを追加し、イベント名を'eventPolicyAccepted' にしてください。
    5. 発火をコントロールしたいタグのトリガーに、上記4で作ったカスタムイベントを指定してください。

**/

//以下の変数は自由にカスタマイズ可能です。
var plcy_url_cookie_policy = ''; //CookieポリシーページのURLを記入。空欄の場合はリンクが表示されません。
//表示されるメッセージをカスタマイズしてください。
var plcy_message = '当サイトでは、クッキーを利用したサービス提供を行なっております。"クッキー利用を許可する"を押して頂いた場合、当サイトの利便性の向上、分析による改善を行うため、ファーストパーティ・サードパーティーのCookieをデバイスに保存することに許諾を頂いたことになります。';
var plcy_button_name = 'クッキー利用を許可する'; //ボタンの名称を決めてください。
var plcy_button_color = 'lightgreen'; //ボタンの色を決めてください。
var plcy_border_color = 'lightgreen'; //ボタンの線を決めてください。
var plcy_back_color = 'rgba(27,27,27,0.8)';    //メッセージバナーの背景色を指定してください。
var plcy_font_color = 'white';        //メッセージバナーの文字色を指定してください。

var plcy_getCookie = function (c_name){
    var st="";
    var ed="";
    if(document.cookie.length>0){

        st=document.cookie.indexOf(c_name + "=");
        if(st!=-1){
            st=st+c_name.length+1;
            ed=document.cookie.indexOf(";",st);
            if(ed==-1) ed=document.cookie.length;
            return unescape(document.cookie.substring(st,ed));
        }
    }
    return "";
}
var plcy_isAccepted = plcy_getCookie('plcyIsAccepted');

function plcy_setCookie(c_name,value,expiredays){
    var path = location.pathname;
    var paths = new Array();
    paths = path.split("/");
    if(paths[paths.length-1] != ""){
        paths[paths.length-1] = "";
        path = paths.join("/");
    }
    var extime = new Date().getTime();
    var cltime = new Date(extime + (60*60*24*1000*expiredays));
    var exdate = cltime.toUTCString();
    var s="";
    s += c_name +"="+ escape(value);
    s += "; path="+ path;
    if(expiredays){
        s += "; expires=" +exdate+"; ";
    }else{
        s += "; ";
    }

    document.cookie=s;
}

var plcy_html = '<div id="plcy_view" style="bottom: 0px; background-color:'+plcy_back_color+' !important; position:fixed; width:100%; border:none; z-index:8000; min-height:50px;" >'+
  '<div style="height:10px;">'+
    '<div style="height:20px; right:10px; top: 50%; margin-top: -16px; position: absolute; width: 20px;">'+
      '<a href="javascript: void(0);" title="Close Banner" onclick="plcy_close_banner()" style="padding:5px; background-color:gray; border-radius:5px; margin-left:5px; line-height:initial;">×</a>'+
    '</div></div><div>'+
    '<div style="margin-right:300px; margin-left:50px; padding-top:6px;">'+
      '<p style="color:'+plcy_font_color+';">'+plcy_message+
      (plcy_url_cookie_policy?'<a href="'+ plcy_url_cookie_policy +'" target="_blank">Cookie Policy</a>':'')+
      '</p>'+
    '</div>'+
    '<div class="clearfix"></div>'+
    '<div style="position:absolute; right:30px; top:50%; margin-top: -16px;">'+
      '<div style="float: right; margin-right; margin-bottom:10px; line-height:initial;">'+
        '<div style="background-color: '+plcy_button_color+' !important; border-color:'+plcy_border_color+' !important; cursor:pointer; padding: 5px; border-radius:5px;">'+
          '<a href="javascript: void(0);" onclick="plcy_accepted()">'+plcy_button_name+'</a>'+
        '</div>'+
      '</div></div></div>'+
    '<div style="padding-bottom:10px;"></div>'+
  '</div></div>';

function appendHtml(el, str) {
  var div = document.createElement('div');
  div.id = 'plcy_banner';
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

function plcy_close_banner(){
  document.getElementById('plcy_view').style.display = "none";
}

function plcy_accepted(){
  if (typeof plcy_isAccepted == "undefined"){
    var plcy_isAccepted = 1;
  }else{
    plcy_isAccepted = 1;
  }
  if (typeof dataLayer != "undefined"){
    dataLayer.push({'plcyIsAccepted':1,event: 'eventPolicyAccepted' });
  }
  plcy_setCookie('plcyIsAccepted',1,365);
  plcy_close_banner();
}

if (!plcy_isAccepted){
  appendHtml(document.body, plcy_html);
}else{
  if (typeof dataLayer != "undefined"){
    dataLayer.push({'plcyIsAccepted':1,event: 'eventPolicyAccepted' });
  }
  var plcy_isAccepted = 1;
}
