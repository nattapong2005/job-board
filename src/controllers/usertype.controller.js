const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// GET all users
exports.get = async (req, res) => {
    try {
        
        const usertype = await prisma.usertype.findMany({
        });
        res.json(usertype);

      
    } catch (error) {
        return res.status(400).json({error: "เกิดข้อผิดพลาด"});
    }
};

//  GET by Id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
    }

    const usertype = await prisma.usertype.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if(!usertype) {
        return res.status(404).json({error: "ไม่พบไอดี " + id});
      }
      
      res.json(usertype);
    
  } catch (error) {
    return res.status(400).json({error: "เกิดข้อผิดพลาด"});
  }

};

// POST 
exports.create = async (req, res) => {
  const { name } = req.body;
  const usertype = await prisma.usertype.create({
    data: {
      name,
    },
  });
  res.json({success: "สร้างประเภทผู้ใช้งานสำเร็จ"});
  res.json(usertype);
};



// PUT 
exports.update = async (req, res) => {

    try {

        const { id } = req.params;

        if(isNaN(id)) {
            return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
        }

        const { name } = req.body;
        const usertype = await prisma.usertype.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name,
          },
        });

        if(!usertype) {
            return res.status(404).json({error: "เกิดข้อผิดพลาดไอดี " + id});
        }

        res.json(usertype);
        
    } catch (error) {
        return res.status(400).json({error: "เกิดข้อผิดพลาด"});
    }

};


// DELETE by Id
exports.delete = async (req, res) => {

    try {
        const { id } = req.params;

        if(isNaN(id)) {
            res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
        }

        const usertype = await prisma.usertype.delete({
          where: {
            id: parseInt(id),
          },
        });

        if(!usertype) {
            return res.status(404).json({error: "เกิดข้อผิดพลาดไอดี " + id});
        }

        res.status(200).json({success: "ลบไอดี " + id});
        
    } catch (error) {
        return res.status(400).json({error: "เกิดข้อผิดพลาด"});
    }

};