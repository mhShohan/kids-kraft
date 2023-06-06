const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users {
    constructor(client) {
        this.collection = client.db('kidsKraft').collection('users');
    }

    async find(field) {
        return await this.collection.findOne(field);
    }


    async register(req, res) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const data = {
                name: req.body.name,
                email: req.body.email,
                photoURL: req.body.photoUrl,
                password: hashedPassword
            };

            const userExists = await this.find({ email: req.body.email });

            if (!userExists) {
                const user = await this.collection.insertOne(data);
                return res.status(201).json(user);
            } else {
                return res.status(203).send({ mgs: 'User Already Exist!' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }
    }

    async socialLogin(req, res) {
        try {
            const userExists = await this.find({ email: req.body.email });

            const newData = {
                name: req.body.displayName,
                email: req.body.email,
                photoURL: req.body.photoURL
            };

            if (!userExists) {
                const user = await this.collection.insertOne(newData);
                return res.status(201).json(user);
            } else {
                return res.status(203).send(userExists);
            }
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }
    }
    async token(req, res) {
        try {
            const { email, name } = req.body;
            const userExists = await this.find({ email });

            if (userExists) {
                const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: '10d' });
                return res.json({ token });
            } else {
                return res.status(203).send({ mgs: 'User Not Found!' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }

    }
}

module.exports = Users;