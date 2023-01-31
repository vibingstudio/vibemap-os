import dbconnect from "database/dbconnect";
import type { NextApiRequest } from "next";
import { backupUser, user } from "schemas/user.schema";

export default async function handler(req: NextApiRequest, res: any) {
  // await connect();
  if (req.method === "POST" || req.method === "post") {
    try {
      await dbconnect();

      const { userData } = req.body;

      const addedUser = await user.findOneAndUpdate(
        { wallet: userData.wallet, collectionName: userData.collectionName },
        userData,
        { upsert: true, new: true }
      );

      const backupAddedUser = await backupUser.findOneAndUpdate(
        { wallet: userData.wallet },
        userData,
        { upsert: true, new: true }
      );

      res.status(200).json({
        status: "success",
        message: "User added Successfully",
        data: addedUser,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error adding User",
      });
      console.log(error);
    }
  } else {
    res.status(500).json({
      status: "error",
      message: "Required POST method",
    });
  }
}
