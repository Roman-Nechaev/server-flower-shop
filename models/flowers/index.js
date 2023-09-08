const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const path = require("path");
const flowersPath = path.join(__dirname, "./flowers.json");

const getAllFlower = async () => {
  const data = await fs.readFile(flowersPath);
  return JSON.parse(data);
};

const getFlowersById = async (flowerId) => {
  const flowers = await getAllFlower();
  const result = flowers.find(({ id }) => id === flowerId);
  return result || null;
};

const deleteFlowerId = async (flowerId) => {
  const flowers = await getAllFlower();

  const index = flowers.findIndex(({ id }) => id === flowerId);
  if (index === -1) {
    return null;
  }

  const [result] = flowers.splice(index, 1);

  await fs.writeFile(flowersPath, JSON.stringify(flowers, null, 2));
  return result;
};

const addFlower = async (body) => {
  const flowers = await getAllFlower();

  const newFlower = {
    id: nanoid(),
    ...body,
  };

  flowers.push(newFlower);
  await fs.writeFile(flowersPath, JSON.stringify(flowers, null, 2));
  return newFlower;
};

const updateFlower = async (id, body) => {
  const flowers = await getAllFlower();

  const index = flowers.findIndex((flower) => flower.id === id);
  if (index === -1) {
    return null;
  }

  flowers[index] = { id, ...body };

  await fs.writeFile(flowersPath, JSON.stringify(flowers, null, 2));
  return flowers[index];
};

module.exports = {
  getAllFlower,
  getFlowersById,
  deleteFlowerId,
  addFlower,
  updateFlower,
};
