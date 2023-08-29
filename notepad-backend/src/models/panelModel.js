import mongoose from "mongoose";

const { Schema } = mongoose;

const panelSchema = new Schema(
  {
    TopTitle: {
      type: String,
      unique:true,
      required: [true, "Top Title Girmediniz"],
    },
    TopDesc: {
      type: String,
      required: [true, "Top Description Girmediniz"],
    },
    MidTitle: {
      type: String,
      required: [true, "Mid Title Girmediniz"],
    },
    MidDesc: {
      type: String,
      required: [true, "Mid Description Girmediniz"],
    },
    BotTitle: {
      type: String,
      required: [true, "Bottom Title Girmediniz"],
    },
    BotDesc: {
      type: String,
      required: [true, "Bottom Description Girmediniz"],
    },
  },
  {
    timestamps: true, // Mongoose da createdAt ile UpdatedAt oluşturur. Bunu kullanıcı kayıt tarihi vs için işe yarar.
  }
);

const Panel = mongoose.model("Panel", panelSchema);
export default Panel;
