export type openGraphData = {
  image: string;
  title: string;
  websiteLink: string;
  link: string;
};
export type ApiPayload = {
  link: string;
  og_title: string;
  og_description: string;
  og_image: string;
  topic: string;
  description: string;
  website_name: string;
};
export type ApiPayloadHook = {
  link: string;
  og_title: string;
  og_description: string;
  og_image: string | File;
  topic: string;
  description: string;
  website_name: string;
};
