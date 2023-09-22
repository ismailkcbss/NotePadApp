import mongoose from "mongoose";

const { Schema } = mongoose;

const panelSchema = new Schema(
  {
    TopTitle: {
      type: String,
      unique:true,
      required: [true, "You Did Not Enter the Top Title"],
    },
    TopDesc: {
      type: String,
      required: [true, "You Did Not Enter the Explanation at the Top"],
    },
    MidTitle: {
      type: String,
      required: [true, "You have Not Entered the Middle Title"],
    },
    MidDesc: {
      type: String,
      required: [true, "You have Not Entered the Middle Explanation"],
    },
    BotTitle: {
      type: String,
      required: [true, "You have Not Entered the Bottom Title"],
    },
    BotDesc: {
      type: String,
      required: [true, "You Did Not Enter a Sub-Description"],
    },
  },
  {
    timestamps: true, // Mongoose da createdAt ile UpdatedAt oluşturur. Bunu kullanıcı kayıt tarihi vs için işe yarar.
  }
);

const Panel = mongoose.model("Panel", panelSchema);
export default Panel;
