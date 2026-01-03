import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser } from "./auth.service.js";
import { Role } from "@prisma/client";

export async function register(req: Request, res: Response) {
  // const body = registerSchema.parse(req.body);
  // const role: Role = body.role === Role.ADMIN ? Role.ADMIN : Role.USER;
  // const user = await registerUser(body.name, body.email, body.password, role);

  // res.status(201).json({
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   role: user.role,
  // });
  try {
    const body = registerSchema.parse(req.body);

    // 🔒 SECURITY: never trust frontend role blindly
    const role: Role = body.role === Role.ADMIN ? Role.ADMIN : Role.USER;

    const user = await registerUser(body.name, body.email, body.password, role);

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // 👈 return role
      },
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Registration failed",
    });
  }
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
