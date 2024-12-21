const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// GET all jobtype
exports.get = async (req, res) => {
    try {
        
        const jobtype = await prisma.jobtype.findMany({
        });
        res.json(jobtype);
        
    } catch (error) {
        return res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }
};

//  GET by Id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
    }

    const jobtype = await prisma.jobtype.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if(!jobtype) {
        return res.status(404).send("ไม่พบไอดี " + id);
      }
      
      res.json(jobtype);
    
  } catch (error) {
    return res.status(404).json({error: "เกิดข้อผิดพลาด"});
  }

};



// POST 
exports.create = async (req, res) => {
  const { name,type } = req.body;
  const jobtype = await prisma.jobtype.create({
    data: {
      name,
      type,
    },
  });
  res.json({success: "สร้างประเภทงานสำเร็จ"});
  res.json(jobtype);
};



// PUT 
exports.update = async (req, res) => {

    try {

        const { id } = req.params;

        if(isNaN(id)) {
            return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
        }

        const { name } = req.body;
        const jobtype = await prisma.jobtype.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name,
          },
        });

        if(!jobtype) {
            return res.status(404).json({error: "เกิดข้อผิดพลาดไอดี " + id});
        }

        res.json(jobtype);
        
    } catch (error) {
      return res.status(404).json({error: "เกิดข้อผิดพลาด"});return res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }

};


// DELETE by Id
exports.delete = async (req, res) => {

    try {
        const { id } = req.params;

        if(isNaN(id)) {
            res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
        }

        const jobtype = await prisma.jobtype.delete({
          where: {
            id: parseInt(id),
          },
        });

        if(!jobtype) {
            return res.status(404).json({error: "เกิดข้อผิดพลาดไอดี " + id});
        }

        res.status(200).json({success: "ลบไอดี " + id});
        
    } catch (error) {
        return res.status(404).json({error: "เกิดข้อผิดพลาด"});
    }

};