import Code from "../models/code-model.js";
import { generateRandomCode } from "../middlewares/generate-code.js";
export const GetAllCodes = async (_, res) => {
    try {
        const codes = await Code.find();
        res.status(200).json(codes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching codes', error });
    }
}



export const CreateCodes = async (req, res) => {
  const { value } = req.params;

  if (!value || isNaN(value)) {
    return res.status(400).json({ message: 'Valid value is required' });
  }

  const codesToGenerate = parseInt(value);
  const generatedCodes = new Set();
  const savedCodes = [];

  try {
    while (generatedCodes.size < codesToGenerate) {
      const code = generateRandomCode();
      if (!generatedCodes.has(code)) {
        const exists = await Code.findOne({ code });
        if (!exists) {
          generatedCodes.add(code);
          const newCode = new Code({ code });
          await newCode.save();
          savedCodes.push(newCode);
        }
      }
    }

    res.status(201).json(savedCodes);
  } catch (error) {
    res.status(500).json({ message: 'Error generating codes', error });
  }
};

export const ClearCodes = async (_, res) => {
  try {
    await Code.deleteMany({});
    console.log('All codes cleared successfully');
    res.status(200).json({ message: 'All codes cleared successfully' });
  } catch (error) {
    console.error('Error clearing codes:', error);
    res.status(500).json({ message: 'Error clearing codes', error });
  }
}
