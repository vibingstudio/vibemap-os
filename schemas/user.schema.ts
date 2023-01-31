import mongoose from "mongoose";

export interface userEvent extends mongoose.Document {
  name: string;
  discord: string;
  twitter: string;
  wallet: string;
  tags: string[];
  collectionName: string;
  country: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  tokens: any;
  nftmintaddresses: any;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  discord: {
    type: String,
  },
  twitter: {
    type: String,
  },
  wallet: {
    type: String,
  },
  tags: {
    type: Array,
  },
  isAdded: {
    type: Boolean,
    default: false,
  },
  collectionName: {
    type: String,
  },
  country: {
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  tokens: {
    type: Array,
  },
  nftmintaddresses: {
    type: Array,
  },
});

export const user =
  (mongoose.models.User as mongoose.Model<userEvent>) ||
  mongoose.model<userEvent>("User", userSchema);
export const backupUser =
  (mongoose.models.BackupUser as mongoose.Model<userEvent>) ||
  mongoose.model<userEvent>("BackupUser", userSchema);
