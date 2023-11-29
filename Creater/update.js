const fs = require("fs");
const Model = require("./model");
const mongoose = require("mongoose");
let num = 0;
require("dotenv").config();
const mongoString = "mongodb://localhost";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});

let category = [
    { id: 1, category: "huvi hun", name: "7 habits of highly efective teens" },
    { id: 3, category: "huvi hun", name: "Brain wash" },
    { id: 4, category: "huvi hun", name: "Bring up bebe" },
    { id: 7, category: "huvi hun", name: "Eat pray love" },
    { id: 8, category: "huvi hun", name: "Educated" },
    { id: 2, category: "namter", name: "Becomming" },
    { id: 9, category: "huvi hun", name: "Ego is the enemy" },
    { id: 10, category: "namter", name: "Elon Musk" },
    { id: 5, category: "gadaad", name: "Cormac McCarthy" },
    { id: 6, category: "huvi hun", name: "Creativity , Inc" },
    { id: 13, category: "huvi hun", name: "Good to great" },
    { id: 14, category: "huvi hun", name: "How woman rise" },
    { id: 15, category: "huvi hun", name: "Identity" },
    { id: 16, category: "huvi hun", name: "Ikigai" },
    { id: 17, category: "namter", name: "Madame chig" },
    { id: 18, category: "love", name: "Me before you" },
    { id: 19, category: "huvi hun", name: "Meltdown" },
    { id: 20, category: "huvi hun", name: "Miracle morning" },
    { id: 11, category: "huvi hun", name: "Every thing is fucked" },
    { id: 12, category: "huvi hun", name: "Girl, Wash your face" },
    { id: 21, category: "gadaad", name: "Miss Peregrine_s peculiar children" },
    { id: 24, category: "love", name: "Shameless" },
    { id: 26, category: "huvi hun", name: "Ted talks" },
    { id: 25, category: "namter", name: "Steve jobs" },
    { id: 27, category: "huvi hun", name: "The art of thinking clearly" },
    { id: 28, category: "huvi hun", name: "The basic laws of human stupidity" },
    { id: 29, category: "gadaad", name: "The Black swan" },
    { id: 30, category: "huvi hun", name: "The Charisma Myth" },
    { id: 31, category: "huvi hun", name: "The goddes pose" },
    { id: 33, category: "biznes", name: "The millionaire next door" },
    { id: 32, category: "huvi hun", name: "The lean startup" },
    { id: 34, category: "huvi hun", name: "The power of habit" },
    { id: 35, category: "huvi hun", name: "The subtle art of not giving a fuck" },
    { id: 36, category: "gadaad", name: "The unbearable lightness of being" },
    { id: 37, category: "huvi hun", name: "What got you here won_t get you there" },
    { id: 38, category: "namter", name: "What I know for sure" },
    { id: 39, category: "gadaad", name: "When breath becomes air" },
    { id: 22, category: "biznes", name: "Rich dad poor dad" },
    { id: 23, category: "huvi hun", name: "Sapiens" },
    { id: 42, category: "huvi hun", name: "Zero to one" },
    { id: 43, category: "namter", name: "Zuck" },
    { id: 40, category: "gadaad", name: "Wonder" },
    { id: 41, category: "gadaad", name: "You are a badass" },
];
database.once("connected", async () => {
    console.log("Database Connected");
    const data = await Model.find();
    let a = 0;
    category.map(async (i, index) => {
        let ddd = {
            $set:{
                category:i.category
            }
        }
        let j = await Model.updateOne({_id:i.id}, ddd)
        a++
        console.log(a+":"+category.length);

    });
});

let caetegory = [
    { id: 1, category: "huvi hun", name: "7 habits of highly efective teens" },
    { id: 3, category: "huvi hun", name: "Brain wash" },
    { id: 4, category: "huvi hun", name: "Bring up bebe" },
    { id: 7, category: "huvi hun", name: "Eat pray love" },
    { id: 8, category: "huvi hun", name: "Educated" },
    { id: 2, category: "namter", name: "Becomming" },
    { id: 9, category: "huvi hun", name: "Ego is the enemy" },
    { id: 10, category: "namter", name: "Elon Musk" },
    { id: 5, category: "gadaad", name: "Cormac McCarthy" },
    { id: 6, category: "huvi hun", name: "Creativity , Inc" },
    { id: 13, category: "huvi hun", name: "Good to great" },
    { id: 14, category: "huvi hun", name: "How woman rise" },
    { id: 15, category: "huvi hun", name: "Identity" },
    { id: 16, category: "huvi hun", name: "Ikigai" },
    { id: 17, category: "namter", name: "Madame chig" },
    { id: 18, category: "love", name: "Me before you" },
    { id: 19, category: "huvi hun", name: "Meltdown" },
    { id: 20, category: "huvi hun", name: "Miracle morning" },
    { id: 11, category: "huvi hun", name: "Every thing is fucked" },
    { id: 12, category: "huvi hun", name: "Girl, Wash your face" },
    { id: 21, category: "gadaad", name: "Miss Peregrine_s peculiar children" },
    { id: 24, category: "love", name: "Shameless" },
    { id: 26, category: "huvi hun", name: "Ted talks" },
    { id: 25, category: "namter", name: "Steve jobs" },
    { id: 27, category: "huvi hun", name: "The art of thinking clearly" },
    { id: 28, category: "huvi hun", name: "The basic laws of human stupidity" },
    { id: 29, category: "gadaad", name: "The Black swan" },
    { id: 30, category: "huvi hun", name: "The Charisma Myth" },
    { id: 31, category: "huvi hun", name: "The goddes pose" },
    { id: 33, category: "biznes", name: "The millionaire next door" },
    { id: 32, category: "huvi hun", name: "The lean startup" },
    { id: 34, category: "huvi hun", name: "The power of habit" },
    { id: 35, category: "huvi hun", name: "The subtle art of not giving a fuck" },
    { id: 36, category: "gadaad", name: "The unbearable lightness of being" },
    { id: 37, category: "huvi hun", name: "What got you here won_t get you there" },
    { id: 38, category: "namter", name: "What I know for sure" },
    { id: 39, category: "gadaad", name: "When breath becomes air" },
    { id: 22, category: "biznes", name: "Rich dad poor dad" },
    { id: 23, category: "huvi hun", name: "Sapiens" },
    { id: 42, category: "huvi hun", name: "Zero to one" },
    { id: 43, category: "namter", name: "Zuck" },
    { id: 40, category: "gadaad", name: "Wonder" },
    { id: 41, category: "gadaad", name: "You are a badass" },
];
