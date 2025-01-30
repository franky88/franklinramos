import { useToast } from "@/hooks/use-toast";

export const useMyToaster = () => {
  const { toast } = useToast();

  return (myTitle: string, myDescription: string, isError: boolean = false) => {
    toast({
      title: myTitle,
      description: myDescription,
      variant: isError ? "destructive" : "default",
    });
  };
};
