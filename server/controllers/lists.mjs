import { validationResult } from "express-validator";
import List from "../models/balances.mjs";
async function getList(req, res) {
  const lists = await List.find();
  res.json(lists)
}

async function registList(req, res) {
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(err);
  }
  const list = new List(req.body);
  const newList = await list.save();
  res.status(201).json(newList);
}

async function deleteList(req, res) {
  const _id = req.params.id;
  const {deletedCount} = await List.deleteOne({ _id })

  if (deletedCount === 0) return res.status(404).json({ msg: "Error Page Not Found" });
  console.log(_id)
  res.json({ _id });

}
async function updateList(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(err);
  }
  const {day,plus,minus,val} = req.body;
  const _id = req.params.id;
  const list = await List.findById(_id);

  if(list === null) return res.status(404).json({msg: 'Error Page Not Found'})
  if (day !== undefined) list.day = day;
  if (plus !== undefined) list.plus = plus;
  if (minus !== undefined) list.minus = minus;
  if (val !== undefined) list.val = val;
  await list.save();
  res.json(list);
}



export {registList,updateList,getList,deleteList}