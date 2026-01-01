import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser } from "./auth.service.js";

export async function register(req: Request, res: Response) {
  const body = registerSchema.parse(req.body);

  const user = await registerUser(body.name, body.email, body.password);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}

export async function login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);

  const { user, token } = await loginUser(body.email, body.password);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
