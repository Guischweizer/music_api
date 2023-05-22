const { createUser, fetchUser, updateUserToken } = require("../Database/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUserInformation = (req, res) => {
    res.status(200).send("Welcome to MusicAPI 🙌");
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

const login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await fetchUser(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                }
            );

            // save user token
            await updateUserToken(email, token)

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getUserInformation,
    signUpUser,
    login
}