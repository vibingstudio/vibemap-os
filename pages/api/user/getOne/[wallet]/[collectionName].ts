import dbconnect from "database/dbconnect";
import type { NextApiRequest } from "next";
import { user } from "schemas/user.schema";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    await dbconnect();
    const { wallet, collectionName } = req.query;
    const currentUser = await user.findOne({
      wallet: wallet,
      collectionName: collectionName,
    });
    res.status(200).json({
      status: "success",
      message: "User Fetched Successfully",
      data: currentUser,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Error fetching User",
    });
  }
}
