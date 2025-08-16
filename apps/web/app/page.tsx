import { prisma } from "@repo/db/client";

export default async function Page() {
  const user = await prisma.user.findMany();
  const todo = await prisma.todo.findMany();

  return (
    <div>
      <div>user: {JSON.stringify(user)}</div>

      <div>Todo: {JSON.stringify(todo)}</div>
    </div>
  );
}

//  We can force next js to make this page dynamic
export const revalidate = 60; // refer to 60 seconds the page cache will be cleared every 60 seconds
// export const dynamic = "force-dynamic";  // this is the second way to make page dynamic during builds
