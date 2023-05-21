const { createUser, fetchUser, updateUserToken } = require("../Database/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUserInformation = (req, res) => {
    console.log("ALO")
    res.render('index', { title: 'Express' });
}


const signUpUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await fetchUser(email)

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await createUser(firstName, lastName, email, encryptedUserPassword)

        // Create token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        // save user token
        await updateUserToken(email, token)

        // return new user
        res.status(201).json('User created!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUserInformation,
    signUpUser
}