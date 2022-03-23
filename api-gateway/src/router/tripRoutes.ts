import { Router, Request, Response } from "express";
import apiAdapter from "../utils/apiAdater";

const tripRoutes = Router();
const tripApiAdapter = apiAdapter("http://localhost:9000/trips");

tripRoutes.get(
  "/api/trips",
  async (req: Request<{ keyword: string }>, res: Response) => {
    try {
      const { keyword } = req.query;
      const { data } = await tripApiAdapter.get("/", {
        params: {
          tags_like: keyword,
        },
      });
      res.send(data);
    } catch (_) {
      res.status(500).send("Internal server error");
    }
  }
);

export default tripRoutes;
