// import connect from "database/connection";
import dbconnect from "database/dbconnect";
import type { NextApiRequest } from "next";
import { user } from "schemas/user.schema";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    await dbconnect();

    const allUsers = await user.find({});
    res.status(200).json({
      status: "success",
      message: "Users Fetched Successfully",
      data: allUsers,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Error fetching Users",
    });
  }
}
