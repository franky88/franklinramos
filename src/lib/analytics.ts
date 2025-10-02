import prisma from "@/lib/prisma";

export async function getVisitsByDate() {
  const visits = await prisma.visitor.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const grouped: Record<string, number> = {};
  visits.forEach((v) => {
    const date = v.createdAt.toISOString().split("T")[0]; // yyyy-mm-dd
    grouped[date] = (grouped[date] || 0) + 1;
  });

  return Object.entries(grouped).map(([date, count]) => ({
    date,
    visits: count,
  }));
}
