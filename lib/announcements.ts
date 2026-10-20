import { getSupabaseAdmin } from "@/lib/supabase";

type AnnouncementRow = {
  announcement_id: number | string;
  title: string;
  body: string;
};

type AnnouncementClubRow = {
  announcement_id: number | string;
  club_id: number | string;
};

export type Announcement = AnnouncementRow & {
  clubIds: number[];
};

function mapAnnouncements(
  announcements: AnnouncementRow[],
  announcementClubs: AnnouncementClubRow[],
): Announcement[] {
  const clubIdsByAnnouncement = new Map<number, number[]>();

  for (const { announcement_id, club_id } of announcementClubs) {
    const announcementId = Number(announcement_id);
    const clubIds = clubIdsByAnnouncement.get(announcementId) ?? [];
    clubIds.push(Number(club_id));
    clubIdsByAnnouncement.set(announcementId, clubIds);
  }

  return announcements.map((announcement) => {
    const announcementId = Number(announcement.announcement_id);

    return {
      announcement_id: announcementId,
      title: announcement.title,
      body: announcement.body,
      clubIds: clubIdsByAnnouncement.get(announcementId) ?? [],
    };
  });
}

export async function listAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabaseAdmin();
  const [{ data: announcements, error: announcementsError }, { data: links, error: linksError }] =
    await Promise.all([
      supabase
        .from("announcements")
        .select("announcement_id, title, body"),
      supabase
        .from("announcement_clubs")
        .select("announcement_id, club_id"),
    ]);

  if (announcementsError) {
    throw announcementsError;
  }

  if (linksError) {
    throw linksError;
  }

  return mapAnnouncements(
    (announcements ?? []) as AnnouncementRow[],
    (links ?? []) as AnnouncementClubRow[],
  );
}

export async function getAnnouncement(id: number): Promise<Announcement | null> {
  const supabase = getSupabaseAdmin();
  const { data: announcement, error: announcementError } = await supabase
    .from("announcements")
    .select("announcement_id, title, body")
    .eq("announcement_id", id)
    .maybeSingle();

  if (announcementError) {
    throw announcementError;
  }

  if (!announcement) {
    return null;
  }

  const { data: links, error: linksError } = await supabase
    .from("announcement_clubs")
    .select("announcement_id, club_id")
    .eq("announcement_id", id);

  if (linksError) {
    throw linksError;
  }

  return mapAnnouncements(
    [announcement as AnnouncementRow],
    (links ?? []) as AnnouncementClubRow[],
  )[0];
}
