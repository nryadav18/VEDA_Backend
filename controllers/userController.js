
const userData = require('../models/userModel');
const eventData = require('../models/events');
const { v4: uuidv4 } = require('uuid');

const generateUniqueTeamCode = async () => {
    let teamCode;
    let isUnique = false;

    while (!isUnique) {
        // Generate a new team code
        teamCode = Math.floor(10000 + Math.random() * 90000).toString();
        teamCode = "VD24-" + teamCode;
        // Check if the team code already exists in the database
        const existingTeam = await userData.findOne({ userTeamCode: teamCode });

        // If the team code does not exist, it is unique
        if (!existingTeam) {
            isUnique = true;
        }
    }
    return teamCode;
};

// const addUser = async (req, res) => {
//     try {
//         const users = req.body;

//         // Generate a unique team code that does not exist in the database
//         const teamCode = await generateUniqueTeamCode();

//         // Add the team code to each user in the array
//         const usersWithTeamCode = users.map(user => ({
//             ...user,
//             userTeamCode: teamCode
//         }));

//         // Save all users to the database
//         const createdUsers = await userData.insertMany(usersWithTeamCode);

//         // Send the created users as a response
//         res.status(201).json({
//             message: 'Users created successfully',
//             userTeamCode: teamCode
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: 'Error creating users',
//             error: error.message
//         });
//     }
// };

const addUser = async (req, res) => {
    try {
        const users = req.body;
        // console.log(req.body[0].userEvent,req.body[0].userEventCategory)
        const DATA = await eventData.find({ departmentName: req.body[0].userEventCategory, eventName: req.body[0].userEvent })
        // Generate a unique team code that does not exist in the database
        const teamCode = await generateUniqueTeamCode();

        // Add the team code to each user in the array
        const usersWithTeamCode = users.map(user => ({
            ...user,
            userTeamCode: teamCode
        }));

        // Save all users to the database
        const createdUsers = await userData.insertMany(usersWithTeamCode);

        // Send the created users as a response
        res.status(201).json({
            message: 'Users created successfully',
            userTeamCode: teamCode,
            amount: DATA[0].registrationFee
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating users',
            error: error.message
        });
    }
};

const getUserYears = async (req, res) => {
    try {
        const exist = await userData.find({});
        if (exist) {
            var year1 = 0, year2 = 0, year3 = 0, year4 = 0;
            exist.map(i => {
                if (i.userYear === 1) year1 += 1;
                else if (i.userYear === 2) year2 += 1;
                else if (i.userYear === 3) year3 += 1;
                else if (i.userYear === 4) year4 += 1;
            })
            res.status(201).json({
                firstYear: year1, secondYear: year2,
                thirdYear: year3, fourthYear: year4,
                total: (year1 + year2 + year3 + year4)
            });
        } else {
            return res.status(404).json({ message: 'data not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}




exports.addUser = addUser;

exports.getUserYears = getUserYears; // first year's count