import { User, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import PortfolioCatSet from "./PortfolioCatSet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserButton } from "@clerk/nextjs";

const Settings = () => {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">App settings</CardTitle>

        <CardDescription>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p>App settings page</p>
              <UserButton />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="px-6">
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users" className="flex items-center gap-1">
                <Users className="w-4 h-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="skills">Change your password here.</TabsContent>
            <TabsContent value="portfolio">
              <PortfolioCatSet />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
