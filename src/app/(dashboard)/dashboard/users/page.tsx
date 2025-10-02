import UserList from "@/components/users/UserList";
import React, { Suspense } from "react";
import { fetchUsers } from "@/lib/dataFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddUser from "@/components/users/AddUser";
import { Skeleton } from "@/components/ui/skeleton";

const UserPage = () => {
  const userPromise = fetchUsers();
  return (
    <div className="p-2 w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User list</CardTitle>
        </CardHeader>
        <CardContent>
          <AddUser />

          <Suspense
            fallback={
              <div className="px-6 py-4 flex flex-col gap-4">
                <div>
                  <Skeleton className="h-[18px] w-[150px] rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[30px] w-[300px] rounded-full" />
                  <Skeleton className="h-[20px] w-[200px] rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[30px] w-[300px] rounded-full" />
                  <Skeleton className="h-[20px] w-[200px] rounded-full" />
                </div>
              </div>
            }
          >
            <UserList initialUsers={userPromise} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPage;
