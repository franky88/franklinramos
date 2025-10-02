import { use } from "react";
import { User } from "@prisma/client";
import { Mail } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import DeleteUser from "./DeleteUser";

interface UserListProps {
  initialUsers: Promise<User[]>;
}

const UserList = ({ initialUsers }: UserListProps) => {
  const users = use(initialUsers);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium px-6">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium px-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg font-bold">
                      {user.name?.toUpperCase()}
                    </h3>
                    <small className="text-muted-foreground">
                      <Badge
                        variant={"outline"}
                        className="px-2 rounded-full flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-400"
                        >
                          {user.email}
                        </a>
                      </Badge>
                    </small>
                  </div>
                  <DeleteUser userId={user.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserList;
