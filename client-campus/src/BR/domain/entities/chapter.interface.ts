export interface Chapter {
  id_chapter: string;
  name: string;
  order?: number | null;
  description?: string | null;
  id_unit?: string;
  content_html?: string | null;
  status?: "draft" | "published";
  video_url?: string | null;
  image_urls?: string[];
  resource_links?: string[];
}



