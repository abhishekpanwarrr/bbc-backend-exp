import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { requireAuth } from "../../../middleware/auth.js";
export const authRouter = Router();

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({
    id: req.user!.id,
    role: req.user!.role,
  });
});
authRouter.post("/register", register);
authRouter.post("/login", login);
