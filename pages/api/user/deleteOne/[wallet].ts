import dbconnect from "database/dbconnect";
import type { NextApiRequest } from "next";
import { user } from "schemas/user.schema";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "DELETE" || req.method === "delete") {
    try {
      await dbconnect();
      const { wallet } = req.query;
      const currentUser = await user.findOneAndDelete({ wallet });
      res.status(200).json({
        status: "success",
        message: "User Deleted Successfully",
        data: currentUser,
      });
    } catch {
      res.status(500).json({
        status: "error",
        message: "Error deleting User",
      });
    }
  } else {
    res.status(500).json({
      status: "error",
      message: "Required DELETE method",
    });
  }
}
