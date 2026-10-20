import { listAnnouncements } from "@/lib/announcements";

export async function GET() {
  try {
    return Response.json(await listAnnouncements());
  } catch (error) {
    console.error("Failed to list announcements", error);
    return Response.json(
      { error: "Failed to retrieve announcements" },
      { status: 500 },
    );
  }
}
