const adminLogin = require('../models/adminLogins');

// const getAdmin = async (req,res) => {
//     console.log(req.body);
//     const userName = req.body.email;
//     const password = req.body.password;
//     console.log(userName+" "+password);
//     try {
//         const user = await adminLogin.findOne({userName});
//         console.log(user);
//         if(user){
//             console.log(user);
//             if(user.userPassword === password){
//                 return res.status(200).json(user);
//             }
//             else{
//                 return res.status(404).json({ message: 'User not found' });
//             }
//         }
//     } catch (err) {
//         res.status(500).json({ message : 'Internal Server Error'});
//     }
// }

const getAdmin = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        
        const userName = req.body.email;
        const password = req.body.password;
        
        console.log("Username:", userName, "Password:", password);
        
        const user = await adminLogin.findOne({ userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User found:", user);

        if (user.userPassword === password) {
            // Ensure you remove sensitive information before sending it to the frontend
            return res.send({"userdt": user});
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (err) {
        console.error("Error occurred:", err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getAdmin = getAdmin;