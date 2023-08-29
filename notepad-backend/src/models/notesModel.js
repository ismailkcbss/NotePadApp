import mongoose from "mongoose";

const { Schema } = mongoose;

const notesSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Başlık Girmediniz."],
    },
    Description: {
      type: String,
      required: [true, "Açıklama Girmediniz."],
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Mongoose da createdAt ile UpdatedAt oluşturur. Bunu kullanıcı kayıt tarihi vs için işe yarar.
  }
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
