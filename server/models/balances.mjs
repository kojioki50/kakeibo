import { model, Schema } from "mongoose";



const balanceSchema = Schema(
  {
    day: {
      type: String,
      required: true,
    },
    plus: {
      type: String,
    },
    minus: {
      type: String,
    },
    val: {
      type: String,
    },
  },{timestamps: true}
)

const List = model("List", balanceSchema);
export default List;