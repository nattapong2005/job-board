const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  const user = await prisma.users.findMany({
  });
  res.json(user);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
};

exports.create = async (req, res) => {
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
  res.json(user);
};

exports.update = async (req, res) => {
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
  res.json(user);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
};
