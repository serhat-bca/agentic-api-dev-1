import { getAnnouncement } from "@/lib/announcements";

type AnnouncementRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: AnnouncementRouteContext,
) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    return Response.json(
      { error: "Announcement ID must be a positive integer" },
      { status: 400 },
    );
  }

  try {
    const announcement = await getAnnouncement(id);

    if (!announcement) {
      return Response.json(
        { error: "Announcement not found" },
        { status: 404 },
      );
    }

    return Response.json(announcement);
  } catch (error) {
    console.error(`Failed to retrieve announcement ${id}`, error);
    return Response.json(
      { error: "Failed to retrieve announcement" },
      { status: 500 },
    );
  }
}
