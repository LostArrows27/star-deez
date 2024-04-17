type PostItem = {
  id: string;
  avatar: string;
  name: string;
  time: Date;
  document: {
    cover?: string;
    name: string;
    unit: string;
  };
  learning_amount: number;
  learning_duration?: number; // in minutes
  like: number;
  media?: string;
};

export const postData: PostItem[] = [
  {
    id: "123",
    avatar:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/cabbee6b-0cb1-4e2a-a944-f4a4190f6926/profile-lohyuemq",
    name: "LostArrows27",
    time: new Date("2024-04-16T10:00:00Z"),
    document: {
      cover:
        "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/posts/ayaseSaki/43fa0cf8-166c-c4f0-29fd-f0850c92066f/lppp41je",
      name: "Kaiwa N0",
      unit: "Page",
    },
    learning_duration: 30,
    learning_amount: 10,
    like: 10,
  },
  {
    id: "12345",
    avatar:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/cabbee6b-0cb1-4e2a-a944-f4a4190f6926/profile-lohyuemq",
    name: "LostArrows27",
    time: new Date(),
    document: {
      name: "Kaiwa N0",
      unit: "Page",
    },
    learning_duration: 30,
    learning_amount: 10,
    like: 10,
    media:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/posts/thanhdung0207/6642dc59-5683-eb27-e972-91887280dc03/lno3ijyx",
  },
  {
    id: "1234",
    avatar:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/cabbee6b-0cb1-4e2a-a944-f4a4190f6926/profile-lohyuemq",
    name: "LostArrows27",
    time: new Date(),
    document: {
      name: "Kaiwa N0",
      unit: "Page",
    },
    learning_duration: 30,
    learning_amount: 10,
    like: 10,
    media:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/posts/thanhdung0207/6642dc59-5683-eb27-e972-91887280dc03/lno3ijyx",
  },
  {
    id: "12356",
    avatar:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/cabbee6b-0cb1-4e2a-a944-f4a4190f6926/profile-lohyuemq",
    name: "LostArrows27",
    time: new Date(),
    document: {
      name: "Kaiwa N0",
      unit: "Page",
    },
    learning_duration: 30,
    learning_amount: 10,
    like: 10,
    media:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/posts/thanhdung0207/6642dc59-5683-eb27-e972-91887280dc03/lno3ijyx",
  },
  {
    id: "123787",
    avatar:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/images/cabbee6b-0cb1-4e2a-a944-f4a4190f6926/profile-lohyuemq",
    name: "LostArrows27",
    time: new Date(),
    document: {
      name: "Kaiwa N0",
      unit: "Page",
    },
    learning_duration: 30,
    learning_amount: 10,
    like: 10,
    media:
      "https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/posts/thanhdung0207/6642dc59-5683-eb27-e972-91887280dc03/lno3ijyx",
  },
];
