# PolicyBannerWithGTM
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
