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
    { id: 3,author:"test",language:"eng", category: "huvi hun", name: "Brain wash" },
    { id: 1,author:"test",language:"eng", category: "huvi hun", name: "7 habits of highly efective teens" },
    { id: 4,author:"test",language:"eng", category: "huvi hun", name: "Bring up bebe" },
    { id: 7,author:"test",language:"eng", category: "huvi hun", name: "Eat pray love" },
    { id: 8,author:"test",language:"eng", category: "huvi hun", name: "Educated" },
    { id: 2,author:"test",language:"eng", category: "namter", name: "Becomming" },
    { id: 9,author:"test",language:"eng", category: "huvi hun", name: "Ego is the enemy" },
    { id: 10,author:"test",language:"eng", category: "namter", name: "Elon Musk" },
    { id: 5,author:"test",language:"eng", category: "gadaad", name: "Cormac McCarthy" },
    { id: 6,author:"test",language:"eng", category: "huvi hun", name: "Creativity , Inc" },
    { id: 13,author:"test",language:"eng", category: "huvi hun", name: "Good to great" },
    { id: 14,author:"test",language:"eng", category: "huvi hun", name: "How woman rise" },
    { id: 15,author:"test",language:"eng", category: "huvi hun", name: "Identity" },
    { id: 16,author:"test",language:"eng", category: "huvi hun", name: "Ikigai" },
    { id: 17,author:"test",language:"eng", category: "namter", name: "Madame chig" },
    { id: 18,author:"test",language:"eng", category: "love", name: "Me before you" },
    { id: 19,author:"test",language:"eng", category: "huvi hun", name: "Meltdown" },
    { id: 20,author:"test",language:"eng", category: "huvi hun", name: "Miracle morning" },
    { id: 11,author:"test",language:"eng", category: "huvi hun", name: "Every thing is fucked" },
    { id: 12,author:"test",language:"eng", category: "huvi hun", name: "Girl, Wash your face" },
    { id: 21,author:"test",language:"eng", category: "gadaad", name: "Miss Peregrine_s peculiar children" },
    { id: 24,author:"test",language:"eng", category: "love", name: "Shameless" },
    { id: 26,author:"test",language:"eng", category: "huvi hun", name: "Ted talks" },
    { id: 25,author:"test",language:"eng", category: "namter", name: "Steve jobs" },
    { id: 27,author:"test",language:"eng", category: "huvi hun", name: "The art of thinking clearly" },
    { id: 28,author:"test",language:"eng", category: "huvi hun", name: "The basic laws of human stupidity" },
    { id: 29,author:"test",language:"eng", category: "gadaad", name: "The Black swan" },
    { id: 30,author:"test",language:"eng", category: "huvi hun", name: "The Charisma Myth" },
    { id: 31,author:"test",language:"eng", category: "huvi hun", name: "The goddes pose" },
    { id: 33,author:"test",language:"eng", category: "biznes", name: "The millionaire next door" },
    { id: 32,author:"test",language:"eng", category: "huvi hun", name: "The lean startup" },
    { id: 34,author:"test",language:"eng", category: "huvi hun", name: "The power of habit" },
    { id: 35,author:"test",language:"eng", category: "huvi hun", name: "The subtle art of not giving a fuck" },
    { id: 36,author:"test",language:"eng", category: "gadaad", name: "The unbearable lightness of being" },
    { id: 37,author:"test",language:"eng", category: "huvi hun", name: "What got you here won_t get you there" },
    { id: 38,author:"test",language:"eng", category: "namter", name: "What I know for sure" },
    { id: 39,author:"test",language:"eng", category: "gadaad", name: "When breath becomes air" },
    { id: 22,author:"test",language:"eng", category: "biznes", name: "Rich dad poor dad" },
    { id: 23,author:"test",language:"eng", category: "huvi hun", name: "Sapiens" },
    { id: 42,author:"test",language:"eng", category: "huvi hun", name: "Zero to one" },
    { id: 43,author:"test",language:"eng", category: "namter", name: "Zuck" },
    { id: 40,author:"test",language:"eng", category: "gadaad", name: "Wonder" },
    { id: 41,author:"test",language:"eng", category: "gadaad", name: "You are a badass" },
];
database.once("connected", async () => {
    console.log("Database Connected");
    const data = await Model.find();
    let a = 0;
    category.map(async (i, index) => {
        let ddd = {
            $set:{
                category:i.category,
                language:i.language,
                author:i.author
            }
        }
        let j = await Model.updateOne({_id:i.id}, ddd)
        a++
        console.log(a+":"+category.length);

    });
});
