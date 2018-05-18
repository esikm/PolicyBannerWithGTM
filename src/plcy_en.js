/**
  This software is MIT License.
  Copyright (c) 2018 effort science co.,ltd.

  GTM PolicyBanner
    This software is enable to show "Getting Cookie Permission Bar" and get accept.
    If you want to start some tools like Google Analytics or some tools after getting cookie permissions from users.

    You can make it easily to use this software.

   <Usage>
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
        Please use the 'plcy_isAccepted'.
        This variable will be set 0 befor permission , 1 after permission.

        ex) the case with JQuery
        if (typeof plcy_isAccepted === "undefined"){
          var plcy_isAccepted = 0;
        }
        $(function(){
          $('#input_btn').click(function(e){
            e.preventDefault();
            if (plcy_isAccepted >0){
              alert('Yes , you can use our tool! ');
            }else{
              alert('Please give us permission to use your cookies !')
            }
          })
        });

    That's all.
**/


var plcy_url_cookie_policy = './policy.html';
var plcy_message = 'We are using first party / third party cookie in our site to serve , anlyze and improve our service. If you push "accept " , it means you accept to store our cookies in your device.';
var plcy_button_name = 'Accept All Cookies';
var plcy_button_color = 'lightgreen';
var plcy_border_color = 'lightgreen';
var plcy_back_color = 'rgba(27,27,27,0.8)';
var plcy_font_color = 'white';

function plcy_getCookie(c_name){
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
var plcyIsAccepted = plcy_getCookie('plcyIsAccepted');

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

if (!plcyIsAccepted){
  appendHtml(document.body, plcy_html);
}else{
  if (typeof dataLayer != "undefined"){
    dataLayer.push({'plcyIsAccepted':1,event: 'eventPolicyAccepted' });
  }
  var plcy_isAccepted = 1;
}
