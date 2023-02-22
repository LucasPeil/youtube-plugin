chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

const isYoutubePage = "https://www.youtube.com"

chrome.action.onClicked.addListener(async (tab)=>{
    if(tab.url.startsWith(isYoutubePage)){
        //get the actual state
        const previousState = await chrome.action.getBadgeText({tabId: tab.id});

        // change the state to the opposite of actual state
        const nextState = previousState === 'ON' ? 'OFF': 'ON'

        // attribute nextState to action badge
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        })

        if (nextState ==='ON'){
            // Insert the CSS tha will hide the recommendation tab
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target: {tabId: tab.id}
            })
        }else if (nextState=== 'OFF'){
            // Remove the CSS tha will hide the recommendation tab
            await chrome.scripting.removeCSS({
                files: ["focus-mode.css"],
                target: {tabId: tab.id}
            })
        }

    }

})

