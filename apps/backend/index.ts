import { prisma } from "@repo/db/client";
import express, {
  urlencoded,
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();

const PORT = 3000;
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({});
  const todo = await prisma.todo.findMany({});

  return res.json({ message: "Server is runinng", user, todo });
});

app.post("/user", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return res.json({ message: "Server is runinng", user });
});

app.post("/todo", async (req: Request, res: Response) => {
  const { title, description, completed = false, userId } = req.body;

  const user = await prisma.todo.create({
    data: {
      userId,
      title,
      description,
      completed,
    },
  });

  return res.json({ message: "Server is runinng", user });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
