import dbconnect from "database/dbconnect";
import type { NextApiRequest } from "next";
import { applier } from "schemas/appliers.schema";

export default async function handler(req: NextApiRequest, res: any) {
  // await connect();
  if (req.method === "POST" || req.method === "post") {
    try {
      await dbconnect();

      const { applierData } = req.body;

      const addedApplier = await applier.findOneAndUpdate(
        { collectionName: applierData.collectionName },
        applierData,
        { upsert: true, new: true }
      );

      //   const backupAddedUser = await backupUser.findOneAndUpdate(
      //     { wallet: userData.wallet },
      //     userData,
      //     { upsert: true, new: true }
      //   );

      res.status(200).json({
        status: "success",
        message: "Applier added Successfully",
        data: addedApplier,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error adding Applier",
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
