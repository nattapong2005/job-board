const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
exports.get = async (req, res) => {
  try {

    const user = await prisma.users.findMany({
    });

    if(!user) {
      return res.status(404).json({error: "ไม่พบข้อมูลของผู้ใช้งาน"});
    }
    return res.json(user);

  }catch(error) {
    return res.status(404).json({error: "เกิดข้อผิดพลาด"});
  }
};

// GET user by Id
exports.getById = async (req, res) => {

  try {
    const { id } = req.params;

    if(isNaN(id)) {
      return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
    }

    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if(!user) {
      return res.status(404).json({error: "ไม่พบไอดี " + id});
    }
    
    res.json(user);

  } catch (error) {
    return res.status(404).json({error: "เกิดข้อผิดพลาด"});
  }

};

// POST user
exports.create = async (req, res) => {
  try {

    const { id, name, lastname, email, password, phone, img, usertypeID } = req.body;
    const user = await prisma.users.create({
      data: {
        id,
        name,
        lastname,
        email,
        password,
        phone,
        img,
        usertypeID,
      },
    });
  
    if(!user) {
      return res.status(404).json({error: "ไม่สามารถสร้างข้อมูลได้"});
    }
  
    res.json(user);

  } catch (error) {
    return res.status(404).json({error: "เกิดข้อผิดพลาด"});
  }
};

// PUT method by Id
exports.update = async (req, res) => {

  try {
    const { id } = req.params;
    const { name, lastname, email, password, phone, img, usertypeID } = req.body;
    const user = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        lastname,
        email,
        password,
        phone,
        img,
        usertypeID,
      },
    });

    if(!user) {
      return res.status(404).json({error: "ไม่สามารถอัพเดทไอดี " + id});
    }

    res.json(user);
  } catch (error) {
    return res.status(404).json({error: "เกิดข้อผิดพลาด"});
  }
};

// DELETE by Id
exports.delete = async (req, res) => {

  try {
    const { id } = req.params;

    if(isNaN(id)) {
      return res.status(404).json({error: "ไอดีไม่ถูกต้อง"});
    }

    const user = await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });

    if(!user) {
      return res.status(404).json({error: "ไม่สามารถลบไอดี " + id});
    }

    res.status(200).json({success: "ลบไอดี " + id});

  } catch (error) {
    return res.status(404).json({error: "เกิดข้อผิดพลาด"});
  }
};
