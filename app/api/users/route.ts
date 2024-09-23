import { NextResponse } from "next/server";

export const GET = () => {
  return new NextResponse("This a response from API users");
};
