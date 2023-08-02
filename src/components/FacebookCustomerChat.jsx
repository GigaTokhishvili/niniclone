import React, { useEffect } from 'react';

const FacebookCustomerChat = () => {
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      FB.init({
        xfbml: true,
        version: 'v17.0'
      });
    };

    // Load SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Set attributes for the chatbox
    const chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "2335308966726812");
    chatbox.setAttribute("attribution", "biz_inbox");
  }, []);

  return (
    <>
      {/* Messenger საუბრის დანამატი Code */}
      <div id="fb-root"></div>

      {/* Your საუბრის დანამატი code */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  );
};

export default FacebookCustomerChat;
