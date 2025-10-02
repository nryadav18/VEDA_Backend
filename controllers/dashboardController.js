const deptData = require("../models/departmentModel");
const eventData = require("../models/events");
const studentCodData = require("../models/studentCordinatorsModel");
const facultyCodData = require("../models/facultyCordinatersModel");
const userData = require("../models/userModel");
const Payment = require("../models/payments");

const dataForTable = async (req, result) => {
  try {
    const originaldata = [];

    // Fetch all departments
    const departments = await deptData.find({});

    // Iterate over each department
    for (const department of departments) {
      const data = {
        departmentName: department.departmentName,
        logo: department.departmentLogo,
        events: 0,
        studentAdmins: 0,
        facultyAdmins: 0,
        individualReg: 0,
        teamReg: 0,
      };

      // Fetch events, faculty admins, student admins, individual registrations, and team registrations
      const [events, AEC, ACET, ACOE,Other,individualRegs, teamRegs] =
        await Promise.all([
          eventData.find({ departmentName: department.departmentName }),
          userData.find({ userCollege: "AdityaUniversity",userEventCategory: department.departmentName}),
          userData.find({ userCollege: "ACET",userEventCategory: department.departmentName }),
          userData.find({ userCollege: "ACOE",userEventCategory: department.departmentName }),
          userData.find({ userCollege: "Other",userEventCategory: department.departmentName }),
          userData.find({ userEventCategory: department.departmentName }),
          Payment.find({ departmentName: department.departmentName }),
        ]);

      // Populate data object
      data.events = events.length;
      data.AEC = AEC.length;
      data.ACET = ACET.length;
      data.ACOE = ACOE.length;
      data.Other = Other.length;
      data.individualReg = individualRegs.length;
      data.teamReg = teamRegs.length;

      // Push to originaldata array
      originaldata.push(data);
    }

    return result.status(201).json(originaldata);
  } catch (err) {
    console.error(err);
    return result.status(500).json({ message: "Internal Server Error" });
  }
};

// campus wise different years
const getCampusYearsReg = async (req, res) => {
  const user = req.params.user;
  console.log(user);
  if (user === "Admin") {
    try {
      var obj = {
        AU: { first: 0, second: 0, third: 0, fourth: 0 },
        ACET: { first: 0, second: 0, third: 0, fourth: 0 },
        ACOE: { first: 0, second: 0, third: 0, fourth: 0 },
        others: { first: 0, second: 0, third: 0, fourth: 0 },
      };

      const [
        auFirst,
        auSecond,
        auThird,
        auFourth,
        acetFirst,
        acetSecond,
        acetThird,
        acetFourth,
        acoeFirst,
        acoeSecond,
        acoeThird,
        acoeFourth,
        othersFirst,
        othersSecond,
        othersThird,
        othersFourth,
      ] = await Promise.all([
        userData.find({ userCollege: "AdityaUniversity", userYear: 1 }),
        userData.find({ userCollege: "AdityaUniversity", userYear: 2 }),
        userData.find({ userCollege: "AdityaUniversity", userYear: 3 }),
        userData.find({ userCollege: "AdityaUniversity", userYear: 4 }),
        userData.find({ userCollege: "ACET", userYear: 1 }),
        userData.find({ userCollege: "ACET", userYear: 2 }),
        userData.find({ userCollege: "ACET", userYear: 3 }),
        userData.find({ userCollege: "ACET", userYear: 4 }),
        userData.find({ userCollege: "ACOE", userYear: 1 }),
        userData.find({ userCollege: "ACOE", userYear: 2 }),
        userData.find({ userCollege: "ACOE", userYear: 3 }),
        userData.find({ userCollege: "ACOE", userYear: 4 }),
        userData.find({ userCollege: "Other", userYear: 1 }),
        userData.find({ userCollege: "Other", userYear: 2 }),
        userData.find({ userCollege: "Other", userYear: 3 }),
        userData.find({ userCollege: "Other", userYear: 4 }),
      ]);

      // Assign the results to the object
      obj.AU.first = auFirst.length;
      obj.AU.second = auSecond.length;
      obj.AU.third = auThird.length;
      obj.AU.fourth = auFourth.length;

      obj.ACET.first = acetFirst.length;
      obj.ACET.second = acetSecond.length;
      obj.ACET.third = acetThird.length;
      obj.ACET.fourth = acetFourth.length;

      obj.ACOE.first = acoeFirst.length;
      obj.ACOE.second = acoeSecond.length;
      obj.ACOE.third = acoeThird.length;
      obj.ACOE.fourth = acoeFourth.length;

      obj.others.first = othersFirst.length;
      obj.others.second = othersSecond.length;
      obj.others.third = othersThird.length;
      obj.others.fourth = othersFourth.length;

      return res.status(201).json(obj);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    try {
      var obj = {
        AU: { first: 0, second: 0, third: 0, fourth: 0 },
        ACET: { first: 0, second: 0, third: 0, fourth: 0 },
        ACOE: { first: 0, second: 0, third: 0, fourth: 0 },
        others: { first: 0, second: 0, third: 0, fourth: 0 },
      };

      const [
        auFirst,
        auSecond,
        auThird,
        auFourth,
        acetFirst,
        acetSecond,
        acetThird,
        acetFourth,
        acoeFirst,
        acoeSecond,
        acoeThird,
        acoeFourth,
        othersFirst,
        othersSecond,
        othersThird,
        othersFourth,
      ] = await Promise.all([
        userData.find({
          userCollege: "AdityaUniversity",
          userYear: 1,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "AdityaUniversity",
          userYear: 2,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "AdityaUniversity",
          userYear: 3,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "AdityaUniversity",
          userYear: 4,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACET",
          userYear: 1,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACET",
          userYear: 2,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACET",
          userYear: 3,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACET",
          userYear: 4,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACOE",
          userYear: 1,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACOE",
          userYear: 2,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACOE",
          userYear: 3,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "ACOE",
          userYear: 4,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "Other",
          userYear: 1,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "Other",
          userYear: 2,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "Other",
          userYear: 3,
          userEventCategory: user,
        }),
        userData.find({
          userCollege: "Other",
          userYear: 4,
          userEventCategory: user,
        }),
      ]);

      // Assign the results to the object
      obj.AU.first = auFirst.length;
      obj.AU.second = auSecond.length;
      obj.AU.third = auThird.length;
      obj.AU.fourth = auFourth.length;

      obj.ACET.first = acetFirst.length;
      obj.ACET.second = acetSecond.length;
      obj.ACET.third = acetThird.length;
      obj.ACET.fourth = acetFourth.length;

      obj.ACOE.first = acoeFirst.length;
      obj.ACOE.second = acoeSecond.length;
      obj.ACOE.third = acoeThird.length;
      obj.ACOE.fourth = acoeFourth.length;

      obj.others.first = othersFirst.length;
      obj.others.second = othersSecond.length;
      obj.others.third = othersThird.length;
      obj.others.fourth = othersFourth.length;

      return res.status(201).json(obj);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const Chart1 = async (req, result) => {
  const user = req.params.department;
  console.log("userrr" + " " + user);

  if (user === "Admin") {
    try {
      const originaldata = [];

      // Fetch all departments
      const departments = await deptData.find({});

      // Iterate over each department
      for (const department of departments) {
        const data = {
          departmentName: department.departmentName,
          individualReg: 0,
          teamReg: 0,
        };

        const [individualRegs, teamRegs] = await Promise.all([
          userData.find({ userEventCategory: department.departmentName }),
          Payment.find({ departmentName: department.departmentName }),
        ]);

        // Populate data object
        data.individualReg = individualRegs.length;
        data.teamReg = teamRegs.length;

        // Push to originaldata array
        originaldata.push(data);
      }

      return result.status(201).json(originaldata);
    } catch (err) {
      console.error(err);
      return result.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    try {
      const originaldata = [];

      // Fetch all departments
      const events = await eventData.find({ departmentName: user });

      // Iterate over each department
      for (const event of events) {
        const data = {
          departmentName: event.eventName,
          individualReg: 0,
          teamReg: 0,
        };

        const [individualRegs, teamRegs] = await Promise.all([
          userData.find({
            userEventCategory: event.departmentName,
            userEvent: event.eventName,
          }),
          Payment.find({
            departmentName: event.departmentName,
            eventName: event.eventName,
          }),
        ]);

        // Populate data object
        data.individualReg = individualRegs.length;
        data.teamReg = teamRegs.length;

        // Push to originaldata array
        originaldata.push(data);
      }

      return result.status(201).json(originaldata);
    } catch (err) {
      console.error(err);
      return result.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getUserYears = async (req, res) => {
  const user = req.params.user;
  console.log("userrr" + " " + user);

  if (user === "Admin") {
    try {
      const exist = await userData.find({});
      if (exist) {
        var year1 = 0,
          year2 = 0,
          year3 = 0,
          year4 = 0;
        exist.map((i) => {
          if (i.userYear === 1) year1 += 1;
          else if (i.userYear === 2) year2 += 1;
          else if (i.userYear === 3) year3 += 1;
          else if (i.userYear === 4) year4 += 1;
        });
        res.status(201).json({
          firstYear: year1,
          secondYear: year2,
          thirdYear: year3,
          fourthYear: year4,
          total: year1 + year2 + year3 + year4,
        });
      } else {
        return res.status(404).json({ message: "data not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    try {
      const exist = await userData.find({ userEventCategory: user });
      console.log(exist);
      if (exist) {
        var year1 = 0,
          year2 = 0,
          year3 = 0,
          year4 = 0;
        exist.map((i) => {
          if (i.userYear === 1) year1 += 1;
          else if (i.userYear === 2) year2 += 1;
          else if (i.userYear === 3) year3 += 1;
          else if (i.userYear === 4) year4 += 1;
        });
        res.status(201).json({
          firstYear: year1,
          secondYear: year2,
          thirdYear: year3,
          fourthYear: year4,
          total: year1 + year2 + year3 + year4,
        });
      } else {
        return res.status(404).json({ message: "data not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

const campusCount = async (req, res) => {
  const user = req.params.user;
  console.log("userrr" + user);
  if (user == "Admin") {
    try {
      const exist = await userData.find({});
      if (exist) {
        const hashMap = {
          ACET: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
          AdityaUniversity: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
          ACOE: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
          Other: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
        };
        exist.map((i) => {
          if (i.userYear == 1) {
            hashMap[i.userCollege.trim()].firstyear++;
          } else if (i.userYear == 2) {
            hashMap[i.userCollege.trim()].secondyear++;
          } else if (i.userYear == 3) {
            hashMap[i.userCollege.trim()].thirdyear++;
          } else {
            hashMap[i.userCollege.trim()].finalyear++;
          }
        });
        return res.status(201).json(hashMap);
      } else {
        return res.status(404).json({ message: "data not found" });
      }
    } catch (err) {
      return res.status(500).json({ mesasage: "Internal server error" });
    }
  } else {
    try {
      const exist = await userData.find({ userEventCategory: user });
      if (exist) {
        const hashMap = {
          ACET: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
          AdityaUniversity: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
          ACOE: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
          Other: {
            firstyear: 0,
            secondyear: 0,
            thirdyear: 0,
            finalyear: 0,
          },
        };
        exist.map((i) => {
          if (i.userYear == 1) {
            hashMap[i.userCollege.trim()].firstyear++;
          } else if (i.userYear == 2) {
            hashMap[i.userCollege.trim()].secondyear++;
          } else if (i.userYear == 3) {
            hashMap[i.userCollege.trim()].thirdyear++;
          } else {
            hashMap[i.userCollege.trim()].finalyear++;
          }
        });
        return res.status(201).json(hashMap);
      } else {
        return res.status(404).json({ message: "data not found" });
      }
    } catch (err) {
      return res.status(500).json({ mesasage: "Internal server error" });
    }
  }
};

// const GenderCount = async (req, res) => {
//   const user = req.params.user;
//   console.log("userrr" + user);
//   if (user == "Admin") {
//     try {
//       const maleCount = await userData.countDocuments({ userGender: "Male" });
//       const femaleCount = await userData.countDocuments({
//         userGender: "Female",
//       });
//       return res
//         .status(201)
//         .json({ Male: maleCount, FemaleCount: femaleCount });
//     } catch (err) {
//       return res.status(500).json({ mesasage: "Internal server error" });
//     }
//   } else {
//     try {
//       const maleCount = await userData.countDocuments({
//         userGender: "Male",
//         userEventCategory: user,
//       });
//       const femaleCount = await userData.countDocuments({
//         userGender: "Female",
//         userEventCategory: user,
//       });
//       return res
//         .status(201)
//         .json({ Male: maleCount, FemaleCount: femaleCount });
//     } catch (err) {
//       return res.status(500).json({ mesasage: "Internal server error" });
//     }
//   }
// };

const GenderCount = async (req, res) => {
  const { user } = req.params;
  console.log("userrr: " + user);

  let query = { userGender: { $in: ["Male", "Female"] } };
  
  if (user !== "Admin") {
    query.userEventCategory = user;
  }

  try {
    const [maleCount, femaleCount] = await Promise.all([
      userData.countDocuments({ ...query, userGender: "Male" }),
      userData.countDocuments({ ...query, userGender: "Female" })
    ]);

    return res.status(200).json({ Male: maleCount, Female: femaleCount });
  } catch (err) {
    console.error("Error counting genders:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const AccomodationGenderCount = async (req, res) => {
  const user = req.params.user;
  console.log("userrr" + user);
  if (user == "Admin") {
    try {
      const maleCount = await userData.countDocuments({
        userGender: "Male",
        userAccomodation: "Yes",
      });
      const femaleCount = await userData.countDocuments({
        userGender: "Female",
        userAccomodation: "Yes",
      });
      return res
        .status(201)
        .json({ Male: maleCount, FemaleCount: femaleCount });
    } catch (err) {
      return res.status(500).json({ mesasage: "Internal server error" });
    }
  } else {
    try {
      const maleCount = await userData.countDocuments({
        userGender: "Male",
        userEventCategory: user,
        userAccomodation: "Yes",
      });
      const femaleCount = await userData.countDocuments({
        userGender: "Female",
        userEventCategory: user,
        userAccomodation: "Yes",
      });
      return res
        .status(201)
        .json({ Male: maleCount, FemaleCount: femaleCount });
    } catch (err) {
      return res.status(500).json({ mesasage: "Internal server error" });
    }
  }
};

const Campuswisegender = async (req, res) => {
  const user = req.params.user;
  console.log("userrr" + user);
  if (user == "Admin") {
    try {
      const ACETmaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "ACET",
      });
      const ACETfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "ACET",
      });
      const ACOEmaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "ACOE",
      });
      const ACOEfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "ACOE",
      });
      const AECmaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "AdityaUniversity",
      });
      const AECfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "AdityaUniversity",
      });
      const OthermaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "Other",
      });
      const OtherfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "Other",
      });

      return res
        .status(201)
        .json({
          AEC: { Male: AECmaleCount, Female: AECfemaleCount },
          ACET: { Male: ACETmaleCount, Female: ACETfemaleCount },
          ACOE: { Male: ACOEmaleCount, Female: ACOEfemaleCount },
          Other: { Male: OthermaleCount, Female: OtherfemaleCount },
        });
    } catch (err) {
      return res.status(500).json({ mesasage: "Internal server error" });
    }
  } else {
    try {
      const ACETmaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "ACET",
        userEventCategory: user,
      });
      const ACETfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "ACET",
        userEventCategory: user,
      });
      const ACOEmaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "ACOE",
        userEventCategory: user,
      });
      const ACOEfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "ACOE",
        userEventCategory: user,
      });
      const AECmaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "AdityaUniversity",
        userEventCategory: user,
      });
      const AECfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "AdityaUniversity",
        userEventCategory: user,
      });
      const OthermaleCount = await userData.countDocuments({
        userGender: "Male",
        userCollege: "Other",
        userEventCategory: user,
      });
      const OtherfemaleCount = await userData.countDocuments({
        userGender: "Female",
        userCollege: "Other",
        userEventCategory: user,
      });

      return res
        .status(201)
        .json({
          AEC: { Male: AECmaleCount, Female: AECfemaleCount },
          ACET: { Male: ACETmaleCount, Female: ACETfemaleCount },
          ACOE: { Male: ACOEmaleCount, Female: ACOEfemaleCount },
          Other: { Male: OthermaleCount, Female: OtherfemaleCount },
        });
    } catch (err) {
      return res.status(500).json({ mesasage: "Internal server error" });
    }
  }
};

const totalRegEachDept = async (req, res) => {
  try {
    const exist = await Payment.find({});
    if (exist) {
      const hashMap = {
        ECE: 0,
        "AIML, IoT & DS": 0,
        CSE: 0,
        "IT_&_MCA": 0,
        "Mining Enginnering": 0,
        EEE: 0,
        CE: 0,
        AGRICULTURE: 0,
        "PETROLEUM TECHNOLOGY": 0,
        MECHANICAL: 0,
      };
      exist.map((i) => {
        if (hashMap[i.departmentName]) hashMap[i.departmentName] += 1;
        else hashMap[i.departmentName] = 1;
      });
      return res.status(201).json(hashMap);
    } else {
      return res.status(404).json({ message: "data not found" });
    }
  } catch (err) {
    return res.status(500).json({ mesasage: "Internal server error" });
  }
};

//

// department name registered team count for each event
// department name registered team count for each event
const getEachTeamCount = async (req, res) => {
  const dept = req.params.department;
  try {
    if (dept === "ALL" || dept === "all" || dept === "All") {
      const teamExist = await Payment.find({});
      const deptExist = await deptData.find({});
      var obj = {};
      teamExist.map((i) => {
        if (obj[i.departmentName]) obj[i.departmentName]++;
        else obj[i.departmentName] = 1;
      });
      deptExist.map((i) => {
        if (!obj[i.departmentName]) obj[i.departmentName] = 0;
      });
      return res.status(201).json(obj);
    } else {
      const eventNExist = await eventData.find({ departmentName: dept });
      const dataExist = await Payment.find({ departmentName: dept });
      var obj = {};
      dataExist.forEach((i) => {
        if (obj[i.eventName]) obj[i.eventName]++;
        else obj[i.eventName] = 1;
      });
      eventNExist.map((i) => {
        if (!obj[i.eventName]) obj[i.eventName] = 0;
      });
      res.status(200).json(obj);
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching team data" });
  }
};

// newwwwwww

// gender count { remaining }
const getGenderCount = async (req, res) => {
  const dept = req.params.department;
  console.log("genderrrrrr" + " " + dept);
  try {
    if (dept === "Admin") {
      const maleExist = await userData.find({ userGender: "Male" });
      const femaleExist = await userData.find({ userGender: "Female" });
      const othersExist = await userData.find({ userGender: "Others" });
      return res
        .status(201)
        .json([
          {
            male: maleExist.length,
            female: femaleExist.length,
            others: othersExist.length,
          },
        ]);
    } else {
      const maleExist = await userData.find({
        userEventCategory: dept,
        userGender: "Male",
      });
      const femaleExist = await userData.find({
        userEventCategory: dept,
        userGender: "Female",
      });
      const othersExist = await userData.find({
        userEventCategory: dept,
        userGender: "Others",
      });
      return res
        .status(201)
        .json([
          {
            male: maleExist.length,
            female: femaleExist.length,
            others: othersExist.length,
          },
        ]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Accomodation Yes
const getAccomodation = async (req, res) => {
  const dept = req.params.department;
  try {
    if (dept === "Admin") {
      const maleExist = await userData.find({
        userAccomodation: "Yes",
        userGender: "Male",
      });
      const femaleExist = await userData.find({
        userAccomodation: "Yes",
        userGender: "Female",
      });
      const othersExist = await userData.find({
        userAccomodation: "Yes",
        userGender: "Others",
      });
      return res
        .status(201)
        .json([
          {
            male: maleExist.length,
            female: femaleExist.length,
            others: othersExist.length,
          },
        ]);
    } else {
      const maleExist = await userData.find({
        userEventCategory: dept,
        userAccomodation: "Yes",
        userGender: "Male",
      });
      const femaleExist = await userData.find({
        userEventCategory: dept,
        userAccomodation: "Yes",
        userGender: "Female",
      });
      const othersExist = await userData.find({
        userEventCategory: dept,
        userAccomodation: "Yes",
        userGender: "Others",
      });
      return res
        .status(201)
        .json([
          {
            male: maleExist.length,
            female: femaleExist.length,
            others: othersExist.length,
          },
        ]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// campus wise gender bar graph
const getCampusGender = async (req, res) => {
  const dept = req.params.department;
  try {
    const obj = {
      AU: { male: 0, female: 0, others: 0 },
      ACET: { male: 0, female: 0, others: 0 },
      ACOE: { male: 0, female: 0, others: 0 },
      others: { male: 0, female: 0, others: 0 },
    };
    if (dept === "Admin") {
      const AUmaleExist = await userData.find({
        userGender: "Male",
        userCollege: "AdityaUniversity",
      });
      const AUfemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "AdityaUniversity",
      });
      const AUothersExist = await userData.find({
        userGender: "Others",
        userCollege: "AdityaUniversity",
      });

      const ACETmaleExist = await userData.find({
        userGender: "Male",
        userCollege: "ACET",
      });
      const ACETfemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "ACET",
      });
      const ACETothersExist = await userData.find({
        userGender: "Others",
        userCollege: "ACET",
      });

      const ACOEmaleExist = await userData.find({
        userGender: "Male",
        userCollege: "ACOE",
      });
      const ACOEfemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "ACOE",
      });
      const ACOEothersExist = await userData.find({
        userGender: "Others",
        userCollege: "ACOE",
      });

      const baytamaleExist = await userData.find({
        userGender: "Male",
        userCollege: "Other",
      });
      const baytafemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "Other",
      });
      const baytaothersExist = await userData.find({
        userGender: "Others",
        userCollege: "Other",
      });

      obj.AU.male = AUmaleExist.length;
      obj.AU.female = AUfemaleExist.length;
      obj.AU.others = AUothersExist.length;

      obj.ACET.male = ACETmaleExist.length;
      obj.ACET.female = ACETfemaleExist.length;
      obj.ACET.others = ACETothersExist.length;

      obj.ACOE.male = ACOEmaleExist.length;
      obj.ACOE.female = ACOEfemaleExist.length;
      obj.ACOE.others = ACOEothersExist.length;

      obj.others.male = baytamaleExist.length;
      obj.others.female = baytafemaleExist.length;
      obj.others.others = baytaothersExist.length;

      return res.status(201).json(obj);
    } else {
      const AUmaleExist = await userData.find({
        userGender: "Male",
        userCollege: "AdityaUniversity",
        userEventCategory: dept,
      });
      const AUfemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "AdityaUniversity",
        userEventCategory: dept,
      });
      const AUothersExist = await userData.find({
        userGender: "Others",
        userCollege: "AdityaUniversity",
        userEventCategory: dept,
      });

      const ACETmaleExist = await userData.find({
        userGender: "Male",
        userCollege: "ACET",
        userEventCategory: dept,
      });
      const ACETfemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "ACET",
        userEventCategory: dept,
      });
      const ACETothersExist = await userData.find({
        userGender: "Others",
        userCollege: "ACET",
        userEventCategory: dept,
      });

      const ACOEmaleExist = await userData.find({
        userGender: "Male",
        userCollege: "ACOE",
        userEventCategory: dept,
      });
      const ACOEfemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "ACOE",
        userEventCategory: dept,
      });
      const ACOEothersExist = await userData.find({
        userGender: "Others",
        userCollege: "ACOE",
        userEventCategory: dept,
      });

      const baytamaleExist = await userData.find({
        userGender: "Male",
        userCollege: "Other",
        userEventCategory: dept,
      });
      const baytafemaleExist = await userData.find({
        userGender: "Female",
        userCollege: "Other",
        userEventCategory: dept,
      });
      const baytaothersExist = await userData.find({
        userGender: "Others",
        userCollege: "Other",
        userEventCategory: dept,
      });

      obj.AU.male = AUmaleExist.length;
      obj.AU.female = AUfemaleExist.length;
      obj.AU.others = AUothersExist.length;

      obj.ACET.male = ACETmaleExist.length;
      obj.ACET.female = ACETfemaleExist.length;
      obj.ACET.others = ACETothersExist.length;

      obj.ACOE.male = ACOEmaleExist.length;
      obj.ACOE.female = ACOEfemaleExist.length;
      obj.ACOE.others = ACOEothersExist.length;

      obj.others.male = baytamaleExist.length;
      obj.others.female = baytafemaleExist.length;
      obj.others.others = baytaothersExist.length;

      return res.status(201).json(obj);
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// revenur generated
const getRevenue = async (req, res) => {
  const dept = req.params.department;
  try {
    if (dept === "ALL" || dept === "all" || dept === "All") {
      const revenueExist = await Payment.find({});
      const deptexist = await deptData.find({});
      var obj = {};
      revenueExist.map((i) => {
        if (obj[i.departmentName]) obj[i.departmentName] += i.amount;
        else obj[i.departmentName] = i.amount;
      });
      deptexist.map((i) => {
        if (!obj[i.departmentName]) obj[i.departmentName] = 0;
      });

      return res.status(201).json(obj);
    } else {
      const revenueExist = await Payment.find({ departmentName: dept });
      const eventexist = await eventData.find({ departmentName: dept });
      var obj = {};
      revenueExist.map((i) => {
        if (obj[i.eventName]) obj[i.eventName] += i.amount;
        else obj[i.eventName] = i.amount;
      });
      eventexist.map((i) => {
        if (!obj[i.eventName]) obj[i.eventName] = 0;
      });
      return res.status(201).json(obj);
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getpaymentdetails = async (req, res) => {
  const dept = req.params.department;
  try {
    // Fetch all users based on department
    const query = dept === "Admin" ? {} : { userEventCategory: dept };
    const paidUsers = await userData.find(query, {
      userRollNumber: 1,
      userName: 1,
      userDepartment:1,
      userEventCategory: 1,
      userEvent: 1,
      userTeamCode: 1,
      userCollege:1,
      userMobile:1,
      userEmail:1,
      userYear:1
    }).lean(); // Use lean to improve performance

    // Extract all unique team codes to fetch payments in a single query
    const teamCodes = paidUsers.map(user => user.userTeamCode);
    
    // Fetch all payments that match the team codes
    const payments = await Payment.find({
      teamCode: { $in: teamCodes }
    }).lean();

    // Create a mapping of teamCode to payment details
    const paymentMap = payments.reduce((acc, payment) => {
      acc[payment.teamCode] = payment;
      return acc;
    }, {});

    // Attach payment details and add serial number to the corresponding users
    const finalData = paidUsers.map((user, index) => {
      const payment = paymentMap[user.userTeamCode];
      if (payment) {
        user.createdAt = payment.createdAt;
      }
      return {
        SNo: index + 1, // Add serial number
        ...user
      };
    });

    return res.status(201).json(finalData);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// OTHER COLLEGES
const otherCollegePaymentdetails = async (req, res) => {
  const dept = req.params.department;
  try {
    // Fetch all users based on department
    const query = dept === "Admin" ? {userCollege: "Other"} : { userEventCategory: dept, userCollege: "Other" };
    const paidUsers = await userData.find(query,{
      userRollNumber: 1,
      userName: 1,
      userDepartment:1,
      userEventCategory: 1,
      userEvent: 1,
      userTeamCode: 1,
      otherCollege:1,
      userMobile:1,
      userEmail:1,
      userYear:1,
      _id:0
    }).lean(); // Use lean to improve performance

    // Extract all unique team codes to fetch payments in a single query
    const teamCodes = paidUsers.map(user => user.userTeamCode);
    
    // Fetch all payments that match the team codes
    const payments = await Payment.find({
      teamCode: { $in: teamCodes }
    }).lean();

    // Create a mapping of teamCode to payment details
    const paymentMap = payments.reduce((acc, payment) => {
      acc[payment.teamCode] = payment;
      return acc;
    }, {});

    // Attach payment details and add serial number to the corresponding users
    const finalData = paidUsers.map((user, index) => {
      const payment = paymentMap[user.userTeamCode];
      if (payment) {
        user.createdAt = payment.createdAt;
      }
      return {
        SNo: index + 1, // Add serial number
        ...user
      };
    });

    return res.status(201).json(finalData);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  

exports.totalRegEachDept = totalRegEachDept;
exports.getUserYears = getUserYears;
exports.dataForTable = dataForTable;
exports.getCampusYearsReg = getCampusYearsReg;
exports.campusCount = campusCount;
exports.GenderCount = GenderCount;
exports.AccomodationGenderCount = AccomodationGenderCount;
exports.Campuswisegender = Campuswisegender;
exports.getEachTeamCount = getEachTeamCount;

// newww
exports.getGenderCount = getGenderCount;
exports.getAccomodation = getAccomodation;
exports.getCampusGender = getCampusGender;
exports.getpaymentdetails = getpaymentdetails;
exports.getRevenue = getRevenue;
exports.Chart1 = Chart1;
exports.otherCollegePaymentdetails = otherCollegePaymentdetails;
