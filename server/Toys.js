const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

class Toys {
    constructor(client) {
        this.collection = client.db('kidsKraft').collection('toys');
    }

    async getToys(req, res) {
        try {
            const pageSize = Number(req.query.limit);
            const pageNumber = Number(req.query.page);
            const skip = pageNumber * pageSize;

            const sort = req.query.sort || 1;

            const query = { name: { $regex: req.query.search, $options: 'i' } };

            const count = await this.collection.countDocuments();
            const toys = await this.collection.find(query).skip(skip).limit(pageSize).sort({ price: Number(sort) }).toArray();

            return res.json({ total: count, toys });
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }
    }

    async getSingleToy(req, res) {
        try {
            const { id } = req.params;
            const toy = await this.collection.findOne({ _id: new ObjectId(id) });

            if (toy) {
                res.status(200).json(toy);
            } else {
                res.status(404).json({ msg: 'No toy found!' });
            }
        } catch (error) {

        }
    }

    async allToys(req, res) {
        try {
            const toys = await this.collection.find({}).toArray();

            return res.json(toys);
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }
    }

    async myToys(req, res) {
        try {
            const barer = req.headers.authorization;

            if (barer) {
                const token = barer.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                if (!decoded) return res.status(401).json({ msg: 'Unauthorized' });

                const toys = await this.collection.find({ sellerEmail: decoded.email }).toArray();

                res.status(200).json(toys);
            } else {
                return res.status(401).json({ msg: 'Unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });

        }
    }

    async addToy(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const {
                availableQuantity,
                detailDescription,
                name,
                picture,
                price,
                rating,
                sellerEmail,
                sellerName,
                subCategory, } = req.body;

            const newToy = {
                availableQuantity: Number(availableQuantity),
                detailDescription,
                name,
                picture,
                price: Number(price),
                rating: Number(rating),
                sellerEmail,
                sellerName,
                subCategory,
            };

            if (decoded.email !== sellerEmail) {
                return res.status(401).send({ msg: 'Unauthorized' });
            }

            const toy = await this.collection.insertOne(newToy);
            return res.status(201).json(toy);
        } catch (error) {
            res.status(500).json({ msg: 'server Error' });

        }
    }

    async updateToy(req, res) {
        try {
            const { id } = req.params;

            const {
                availableQuantity,
                detailDescription,
                name,
                picture,
                price,
                rating,
                subCategory, } = req.body;


            const barer = req.headers.authorization;
            if (barer) {
                const token = barer.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                if (!decoded) return res.status(401).json({ msg: 'Unauthorized' });

                const newToy = {
                    availableQuantity: Number(availableQuantity),
                    detailDescription,
                    name,
                    picture,
                    price: Number(price),
                    rating: Number(rating),
                    sellerEmail: decoded.email,
                    sellerName: decoded.name,
                    subCategory,
                };

                const toy = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newToy });

                return res.status(201).json(toy);
            } else {
                return res.status(401).send({ msg: 'Unauthorized' });
            }

        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }
    }

    async deleteToy(req, res) {
        try {
            const { id } = req.params;

            const barer = req.headers.authorization;
            if (barer) {
                const token = barer.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                if (!decoded) return res.status(401).json({ msg: 'Unauthorized' });


                const toy = await this.collection.deleteOne({ _id: new ObjectId(id) });

                return res.status(201).json(toy);
            } else {
                return res.status(401).send({ msg: 'Unauthorized' });
            }

        } catch (error) {
            res.status(500).json({ msg: 'server Error' });
        }
    }
}

module.exports = Toys;