const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  GET all posts
exports.get = async (req, res) => {

    try {
        const jobpost = await prisma.jobpost.findMany({
        });
    
        if(!jobpost || jobpost == "") {
            return res.status(404).json({error: "ไม่พบโพสต์งาน"});
        }
    
        res.json(jobpost);

    } catch (error) {
        console.log(error);
        res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }
  };

// GET post by Id
exports.getById = async (req, res) => {

    try {

        const { id } = req.params;

        if(isNaN(id)) {
            return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
        }

        const jobpost = await prisma.jobpost.findUnique({
          where: {
            id: parseInt(id),
          },
        });

        if(!jobpost) {
            return res.status(404).json({error: "ไม่พบไอดี " + id});
        }

        res.json(jobpost);
        
    } catch (error) {
        console.log(error);
        res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }

  };
  
// POST create a post  
exports.create = async (req, res) => {

    try {
        const { id, userID, description, requirement, salary, location, jobtypeID, status } = req.body;
        const jobpost = await prisma.jobpost.create({
          data: {
            id,
            userID,
            description,
            requirement,
            salary,
            location,
            jobtypeID,
            status,
          },
        });
    
        if(!jobpost) {
            return res.status(404).json({error: "ไม่สามารถสร้างโพสต์ได้"});
        }
    
        res.json(jobpost);
        
    } catch (error) {
        console.log(error);
        res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }
  };
  
// PUT edit by Id
exports.update = async (req, res) => {

    try {

    const { id } = req.params;

    if(isNaN(id)) {
        res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
    }    
    
    const { userID, description, requirement, salary, location, jobtypeID, status } = req.body;
    const jobpost = await prisma.jobpost.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userID,
        description,
        requirement,
        salary,
        location,
        jobtypeID,
        status,
      },
    });

    if(!jobpost) {
        res.status(404).json({error: "ไม่สามารถอัพเดทไอดี " + id});
    }

    res.json(jobpost);

    } catch (error) {
        console.log(error);
        res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }

  };
  
// DELETE post by Id  
exports.delete = async (req, res) => {
    try {

        const { id } = req.params;

        if(isNaN(id)) {
            res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
        }    

        const jobpost = await prisma.jobpost.delete({
          where: {
            id: parseInt(id),
          },
        });

        if(!jobpost) {
            res.status(404).json({error: "ไม่สามารถลบไอดี " + id});
        }

        res.status(200).json({success: "ลบไอดี " + id});

    } catch (error) {
        console.log(error);
        res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }
  };