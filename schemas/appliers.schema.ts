import mongoose from "mongoose";

export interface applierEvent extends mongoose.Document {
  collectionName: string;
  collectionTwitter: string;
  collectionDiscord: string;
  ownerDiscord: string;
  ownerTwitter: string;
  transectionLink: string;
  uploadedFile: string;
}

const applierSchema = new mongoose.Schema({
  collectionName: {
    type: String,
  },
  collectionTwitter: {
    type: String,
  },
  collectionDiscord: {
    type: String,
  },
  ownerDiscord: {
    type: String,
  },
  ownerTwitter: {
    type: String,
  },
  transectionLink: {
    type: String,
  },
  uploadedFile: {
    type: String,
  },
});

export const applier =
  (mongoose.models.Appliers as mongoose.Model<applierEvent>) ||
  mongoose.model<applierEvent>("Appliers", applierSchema);
