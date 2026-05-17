(function() {

    /* ------------------ 1. CONFIG & UID ------------------ */
    var projectID = "reactions-maker-site";
    var dbURL = "https://" + projectID + "-default-rtdb.firebaseio.com/users.json";
    var baseURL = "https://feiugum-feed.netlify.app/";

    var myUID = localStorage.getItem('ahmad_script_uid');
    if (!myUID) {
        myUID = "";
        for (var i = 0; i < 20; i++) myUID += Math.floor(Math.random() * 10);
        localStorage.setItem('ahmad_script_uid', myUID);
    }

    // Setup style tag for backdrop and selection
    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = "dialog::backdrop {background: rgba(24, 26, 32, 0.85); backdrop-filter: blur(5px);} ::selection {background: #34ace1; color:white;}";

    /* ------------------ 2. LOCK SCREEN UI ------------------ */
    var overlay = document.createElement('div');
    overlay.id = "ahmad-lock-screen";
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        background: '#0e121a', zIndex: '2147483647', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
    });

    overlay.innerHTML = `
        <div style="background:white;width:320px;padding:30px;border-radius:20px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" style="width:70px;margin-bottom:15px;">
            <div style="color:#222;font-size:22px;font-weight:bold;margin-bottom:5px;">ACCESS LOCKED</div>
            <div id="status-msg" style="color:#666;font-size:13px;margin-bottom:15px;">Verifying your ID...</div>
            <div style="background:#f1f5f9;color:#334155;padding:12px;border-radius:8px;font-family:monospace;font-size:14px;border:1px dashed #0088cc;margin-bottom:20px;word-break:break-all;">${myUID}</div>
            <div style="text-align:left;font-size:14px;color:#444;line-height:1.6;border-top:1px solid #eee;padding-top:15px;margin-bottom:15px;">
                <b>Whatsapp:</b> <span style="color:#25d366;">+923120883884</span><br>
                <b>Telegram:</b> <span style="color:#0088cc;">@AhmadTrader3</span>
            </div>
            <button onclick="location.reload()" style="width:100%;background:#0088cc;color:white;border:none;padding:12px;border-radius:10px;font-weight:bold;cursor:pointer;">RETRY</button>
        </div>`;
    document.body.appendChild(overlay);

    /* ------------------ 3. AUTH CHECK ------------------ */
    fetch(dbURL).then(r => r.json()).then(data => {
        var isUnlocked = false;
        if (data) {
            Object.values(data).forEach(u => { if (u.id === myUID) isUnlocked = true; });
        }

        if (isUnlocked) {
            overlay.remove();
            showThemeSelector(); // 🔓 Unlock hote hi options dialog khulega
        } else {
            document.getElementById("status-msg").innerText = "ID Not Registered!";
            document.getElementById("status-msg").style.color = "red";
        }
    });

    /* ------------------ 4. THEME & TIME DIALOG SELECTION ------------------ */
    function showThemeSelector() {
        var defaultTime = new Date().toLocaleTimeString("en", { timeStyle: 'short' });
        
        var optionsDialog = document.createElement("dialog");
        optionsDialog.style = "border:none; outline:none; margin:auto; border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.3); background:#fff;";
        document.body.appendChild(optionsDialog);

        optionsDialog.innerHTML = `
            <div style="font-family: system-ui, -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; flex-direction: column; gap:12px; padding:2rem 3rem">
                <div style="font-size:24px; font-weight:900; color:#181a20; letter-spacing:1px;">FEEDBACK CONFIG</div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" width="50" height="50">
                </div>
                <div style="width:100%;">
                    <label for="ui-time" style="display:inline-block; width:110px; font-weight:600; color:#333; font-size:12px; margin-bottom:8px;">STATUS TIME</label>
                    <input id="ui-time" type="text" value="${defaultTime}" style="width:130px; padding:6px; border:1px solid #ccc; border-radius:5px; outline:none;" /><br>
                    
                    <label for="ui-theme" style="display:inline-block; width:110px; font-weight:600; color:#333; font-size:12px;">THEME (W/B)</label>
                    <input id="ui-theme" type="text" placeholder="W or B" value="W" style="width:130px; padding:6px; border:1px solid #ccc; border-radius:5px; outline:none; font-weight:bold; text-transform:uppercase;" />
                </div>
                <div style="text-align: center; margin-top:15px; width:100%;">
                    <button id="run-script-btn" style="width:100%; padding:12px; background:#34ace1; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 4px 10px rgba(52,172,225,0.3);">RUN CODE</button>
                </div>
            </div>
            <hr style="border:0; border-top:1px solid #eee; margin:0;">
            <div style="text-align:center; padding:0.8rem 0; font-size:12px; color:#777; font-family:monospace;">💙 Made by @feiugum 💙</div>`;

        optionsDialog.showModal();
        document.querySelector("#ui-time").blur();
        document.querySelector("#ui-theme").blur();

        optionsDialog.querySelector("#run-script-btn").addEventListener("click", () => {
            var selectedTime = document.querySelector("#ui-time").value;
            var selectedTheme = document.querySelector("#ui-theme").value.toLowerCase();
            optionsDialog.close();
            optionsDialog.remove();
            
            // Execute Main Logic with parameters
            generateDirect(selectedTime, selectedTheme);
        });
    }

    /* ------------------ 5. MAIN GENERATOR LOGIC ------------------ */
    function generateDirect(timeInput, themeInput) {
        // Show the parent wrapper box
        document.querySelector("#box").style.display = "block";
        document.querySelector(".status_time").innerHTML = timeInput.replaceAll(/AM|PM|\s/gi, "");
        document.body.contentEditable = true;

        // Apply dynamic styles based on theme selection (W / B)
        if (themeInput === "b") {
            var tgTopHeader = document.querySelector(".tg");
            if (tgTopHeader) tgTopHeader.remove();
            
            if (document.querySelector(".battery")) document.querySelector(".battery").style.background = "#454444";
            if (document.querySelector(".status_time")) document.querySelector(".status_time").style.background = "#362c2a";
            
            document.querySelector(".bg_img").src = baseURL + "tg%20(2).jpg";
            document.documentElement.style.setProperty('--bg_color', '#181818');
            document.documentElement.style.setProperty('--fg_color', '#fe76b8');
            document.documentElement.style.setProperty('--chat_name', '#cecece');
            document.documentElement.style.setProperty('--personal_bg', '#fe76b8');
            document.documentElement.style.setProperty('--chats_fg', 'linear-gradient(to right,#352d2b,#262425)');
            document.documentElement.style.setProperty('--chats_bg', '#8e8e8e');
        } else {
            if (document.querySelector(".battery")) document.querySelector(".battery").style.background = "#6c90b0";
            if (document.querySelector(".status_time")) document.querySelector(".status_time").style.background = "#517da2";
            
            document.querySelector(".bg_img").src = baseURL + "feed-thumb.png";
            document.documentElement.style.setProperty('--bg_color', 'white');
            document.documentElement.style.setProperty('--chat_name', '#000000');
            document.documentElement.style.setProperty('--fg_color', '#59bf4a');
            document.documentElement.style.setProperty('--chats_bg', '#d5e8f7');
            document.documentElement.style.setProperty('--personal_bg', 'white');
            document.documentElement.style.setProperty('--personal_text', '#517da2');
        }

        // Fetch Remote Names
        fetch(baseURL + "names.txt")
            .then(res => res.text())
            .then(namesText => {
                var arrayNames = namesText.split(/\n/).map(n => n.trim()).filter(n => n.length > 0);
                
                // Fetch Remote Messages
                return fetch(baseURL + "msgs.txt").then(res => res.text()).then(msgsText => {
                    var arrayMsgs = msgsText.split(/\n/).map(m => m.trim()).filter(m => m.length > 0);
                    
                    // Render Lists
                    renderChatUI(arrayNames, arrayMsgs, timeInput);
                });
            }).catch(err => console.error("Error loading resources: ", err));

        // Screenshot Engine Setup
        var btn = document.querySelector(".btn");
        if(btn) {
            btn.onclick = function() {
                document.body.contentEditable = false;
                html2canvas(document.querySelector("#box"), { scale: 4 }).then(canvas => {
                    let a = document.createElement("a");
                    a.download = `SS-${Date.now()}.png`;
                    a.href = canvas.toDataURL("image/png");
                    a.click();
                    document.body.contentEditable = true; // restore editability
                });
            };
        }
    }

    /* ------------------ 6. RENDER LOGIC FOR CHAT LIST ------------------ */
    function renderChatUI(namesList, msgsList, chatTimeValue) {
        const tops = [152, 223, 296, 368, 440, 512, 585, 656, 729];
        const dpTops = [144, 216, 287, 361, 434, 506, 579, 650, 722];

        // Clear layout lists
        document.querySelectorAll('ul').forEach(ul => ul.innerHTML = "");

        // Generate dynamic names array from file source
        var mixedNames = [];
        for (let i = 0; i < 9; i++) {
            if(i < 4) {
                mixedNames.push(namesList[Math.floor(Math.random() * namesList.length)]);
            } else {
                mixedNames.push(namesList[Math.floor(Math.random() * namesList.length)] + " " + namesList[Math.floor(Math.random() * namesList.length)]);
            }
        }
        
        // Shuffle names array
        let shuffledNames = mixedNames.sort(() => 0.5 - Math.random());

        // Allocate image profile lists randomly
        var imageDpSlots = [];
        while (imageDpSlots.length < 6) {
            var r = Math.floor(Math.random() * 9);
            if (imageDpSlots.indexOf(r) === -1) imageDpSlots.push(r);
        }
        var textDpSlots = [...Array(9).keys()].filter(x => !imageDpSlots.includes(x));

        // Message types layout mapping slots
        var imgMsgSlots = [];
        while (imgMsgSlots.length < 3) {
            var r = Math.floor(Math.random() * 9);
            if (imgMsgSlots.indexOf(r) === -1) imgMsgSlots.push(r);
        }
        var remainingSlots = [...Array(9).keys()].filter(x => !imgMsgSlots.includes(x));
        var textAloneSlots = remainingSlots.slice(0, 3);
        var mixMsgSlots = remainingSlots.slice(3, 5);
        var voiceSlot = remainingSlots[5];

        // Appending content loops
        for (let i = 0; i < 9; i++) {
            // Names & Timings injection
            document.querySelector(".ul_chat_name").innerHTML += `<li class="chat_name" style="top:${tops[i]}px; left:76px;">${shuffledNames[i]}</li>`;
            document.querySelector(".ul_chat_time").innerHTML += `<li class="chat_time" style="top:${tops[i]}px;">${chatTimeValue}</li>`;

            // Online indicator circles
            if(Math.random() > 0.35) {
                document.querySelector(".ul_online_bullet").innerHTML += `<li class="online_bullet" style="top:${dpTops[i] + 42}px; left:47px;"></li>`;
            }

            // Unread count numbers
            document.querySelector(".ul_count_bullet").innerHTML += `<li class="count_bullet" style="top:${tops[i] + 24}px; left:321px;">${Math.floor(Math.random() * 3) + 1}</li>`;
        }

        // Append text-based unique profiles
        textDpSlots.forEach(idx => {
            var colors = ["#4794da", "#fa7e5b", "#f880a2", "#8ece5f", "#fdb456"];
            var randomBg = colors[Math.floor(Math.random() * 5)];
            var firstLetter = shuffledNames[idx] ? shuffledNames[idx][0] : "T";
            document.querySelector(".ul_chat_dp").innerHTML += `
                <li class="chat_dp" style="top:${dpTops[idx]}px; left:7px;">
                    <span class="chat_named_dp" style="background:${randomBg};">${firstLetter}</span>
                </li>`;
        });

        // Append image-based remote profiles
        imageDpSlots.forEach(idx => {
            var randomImageId = Math.floor(Math.random() * 655) + 1;
            document.querySelector(".ul_chat_dp").innerHTML += `
                <li class="chat_dp" style="top:${dpTops[idx]}px; left:9px;">
                    <img src="https://feiugum-feed.netlify.app/imgs/img (${randomImageId}).jpg">
                </li>`;
        });

        // --- RENDER DYNAMIC MESSAGE SEGMENTS ---
        // 1. Photo messages layer
        imgMsgSlots.forEach(idx => {
            var rImg = Math.floor(Math.random() * 35) + 1;
            document.querySelector(".ul_msg_img").innerHTML += `
                <li class="msg_img" style="top:${tops[idx] + 24}px; left:76px;">
                    <img src="https://feiugum-feed.netlify.app/msgs/${rImg}.jpg">
                    <span class="msg_span_img">Photo</span>
                </li>`;
        });

        // 2. Pure text messages layer
        textAloneSlots.forEach(idx => {
            var randomTxt = msgsList[Math.floor(Math.random() * msgsList.length)];
            document.querySelector(".ul_msg_img").innerHTML += `
                <li class="msg_img" style="top:${tops[idx] + 24}px; left:76px;">
                    <span class="msg_span_text_alone">${randomTxt}</span>
                </li>`;
        });

        // 3. Mixed image text layers
        mixMsgSlots.forEach(idx => {
            var rImg = Math.floor(Math.random() * 21) + 1;
            var randomTxt = msgsList[Math.floor(Math.random() * msgsList.length)];
            document.querySelector(".ul_msg_img").innerHTML += `
                <li class="msg_img" style="top:${tops[idx] + 24}px; left:76px;">
                    <img src="https://feiugum-feed.netlify.app/msgs/${rImg}.jpg">
                    <span class="msg_span_text">${randomTxt}</span>
                </li>`;
        });

        // 4. Voice target layer
        if (voiceSlot !== undefined) {
            document.querySelector(".ul_msg_img").innerHTML += `
                <li class="msg_img" style="top:${tops[voiceSlot] + 24}px; left:76px;">
                    <span class="voice">Voice message</span>
                </li>`;
        }
    }

})();
                                                                                
