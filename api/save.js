// api/save.js - Crash-Proof Serverless Core Router
export default async function handler(req, res) {
    // CORS configuration headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).send("Method Not Allowed");
    }

    // Safe Body Parser (Vercel automatic handling validation)
    let bodyData = {};
    try {
        bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
        return res.status(400).send("INVALID_JSON_FORMAT");
    }

    const { user, userid, email, flag, id } = bodyData;

    // Check mapping validity
    if (!id) {
        return res.status(200).send("MISSING_ID_IN_PAYLOAD");
    }

    const firebaseUrl = "https://reactions-maker-site-default-rtdb.firebaseio.com/users.json";

    try {
        // Step 1: Firebase dynamic payload execution
        const fbResponse = await fetch(firebaseUrl);
        if (!fbResponse.ok) {
            return res.status(200).send("FIREBASE_CONNECTION_ERROR");
        }
        
        const allUsers = await fbResponse.json();
        let targetFirebaseKey = null;

        if (allUsers) {
            for (let firebaseKey in allUsers) {
                if (allUsers[firebaseKey] && allUsers[firebaseKey].id === String(id)) {
                    targetFirebaseKey = firebaseKey; // Dynamic match found e.g., "-OxH0..."
                    break;
                }
            }
        }

        // Step 2: Inject details target keys check
        if (targetFirebaseKey) {
            const updateUrl = `https://reactions-maker-site-default-rtdb.firebaseio.com/users/${targetFirebaseKey}.json`;
            
            const patchRes = await fetch(updateUrl, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user || "",
                    trader_id: userid || "",
                    email: email || "",
                    flag: flag || "pk",
                    date: new Date().toLocaleDateString('en-US')
                })
            });

            if (patchRes.ok) {
                return res.status(200).send("OK");
            } else {
                return res.status(200).send("DB_WRITE_FAILED");
            }
        }

        return res.status(200).send("USER_NOT_FOUND");

    } catch (error) {
        // Prevent Vercel function crash output loop
        console.error("Critical Runtime Log:", error);
        return res.status(200).send("INTERNAL_SERVER_FAILURE_CAUGHT");
    }
}
