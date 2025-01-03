const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

  const { name, lastname, email, password, phone } = req.body;
  const usertypeID = 2;
  const hasUser = await prisma.users.findUnique({ where: { email } });

  if (hasUser) {
    return res.status(400).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const users = await prisma.users.create({
      data: {
        name,
        lastname,
        email,
        password: hashPassword,
        phone,
        img: "",
        usertypeID,
      },
    });
    return res.status(201).json({message: "ลงทะเบียนเรียบร้อย"})
  } catch (error) {
    res.status(500).json({ error: "เกิดผิดพลาดในการสมัคร" });
  }
};
