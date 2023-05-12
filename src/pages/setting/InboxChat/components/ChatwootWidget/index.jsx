import { useEffect } from "react";

function ChatwootWidget() {
    useEffect(()=>{
        (function(d,t) {
            var BASE_URL="https:/chat.onexus.net";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'ZTHLjUBHpRbyx5zbY42VNpJm',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");


    },[])
    return null;
}

export default ChatwootWidget;