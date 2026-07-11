// api/save.js - Crash-Proof Vercel Serverless Endpoint
export default async function handler(req, res) {
    // Enable CORS taaki cross-origin requests block na hon
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Frontend se bheja hua data destruct kiya (vid ki jagah id pick ho raha hai)
    const { user, userid, email, flag, id } = req.body;

    if (!id) {
        return res.status(400).send("MISSING_DYNAMIC_ID");
    }

    const firebaseUrl = "https://reactions-maker-site-default-rtdb.firebaseio.com/users.json";

    try {
        // Step 1: Native global fetch call jo kabhi serverless environment crash nahi karega
        const fbResponse = await fetch(firebaseUrl);
        const allUsers = await fbResponse.json();

        let targetFirebaseKey = null;

        // Pure database entries check karke real matching parent node index key nikalna
        if (allUsers) {
            for (let firebaseKey in allUsers) {
                if (allUsers[firebaseKey] && allUsers[firebaseKey].id === id) {
                    targetFirebaseKey = firebaseKey; // Jaise "-OxH0FzskQjYLtKAIs-p" find ho jayega
                    break;
                }
            }
        }

        // Step 2: Agar index key mil gayi toh Firebase node update loop execute karna
        if (targetFirebaseKey) {
            const updateUrl = `https://reactions-maker-site-default-rtdb.firebaseio.com/users/${targetFirebaseKey}.json`;
            
            const patchRes = await fetch(updateUrl, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user,          // Map input name to firebase entry
                    trader_id: userid,   // Map input trader id to firebase entry
                    email: email,
                    flag: flag,
                    date: new Date().toLocaleDateString('en-US') // 2026 format update timestamp
                })
            });

            if (patchRes.ok) {
                return res.status(200).send("OK");
            } else {
                return res.status(500).send("FIREBASE_PATCH_FAILED");
            }
        }

        return res.status(404).send("USER_NOT_FOUND");

    } catch (error) {
        console.error("Vercel Function Error Log:", error);
        return res.status(500).send("SERVER_ERROR");
    }
}
