(function () {
        // Remove existing dialogs
        document.querySelectorAll("dialog").forEach(d => d.remove());
    
        // Create popup container
        const popup = document.createElement("div");
        popup.innerText = "⚠️ APPLY ON CORRECT URL ⚠️";
    
        // Style the popup
        Object.assign(popup.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0)",
            color: "white",
            padding: "18px 28px",
            borderRadius: "10px",
            fontSize: "16px",
            zIndex: "999999",
            opacity: "1",
            transition: "opacity 1s ease",
            width: "300px",
            textAlign: "center"
            
        });
    
        document.body.appendChild(popup);
    
        // Hide after 5 seconds
        setTimeout(() => {
            popup.style.opacity = "0";
            setTimeout(() => popup.remove(), 600);
        }, 3000);
    })();