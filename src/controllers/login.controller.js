const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const JWT_SECRET = "GAY$#@$@#@#43543434343365655";

exports.login = async (req,res) => {

    try {

        const {email,password} = req.body;
        
        const user = await prisma.users.findUnique({where:{email}});
        if(!user) {
            return res.status(400).json({message: "ผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง"});
        }
        
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            return res.status(400).json({message: "ผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง"});
        }

        const token = jwt.sign({userID: user.id}, JWT_SECRET, {expiresIn: "1h"});
        return res.status(200).json({ message: "เข้าสู่ระบบเรียบร้อย", token });

    } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
    }

}