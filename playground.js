// Keeping fiels flat
const model = {
  fields: [
    {
      type: "simpletext",
      fieldId: "content",
      uid: "fzMwD5PQdszrHQLSbdN7Tg",
      value: {
        default: "<h1>Moi</h2>",
        en: "<h1>Hello</h2>",
      },
    },
    {
      type: "richtext",
      fieldId: "content",
      uid: "fzMwD5PQdszrHQLSbdN7Tg",
      value: {
        default: "Moi",
        en: "Hello",
      },
    },
    {
      type: "image",
      fieldId: "content",
      uid: "fzMwD5PQdszrHQLSbdN7Tg",
      value: {
        default: "https//...jpg",
        en: null,
      },
    },
    {
      type: "richtext",
      fieldId: "content",
      uid: "fzMwD5PQdszrHQLSbdN7Tg",
      value: {
        default: "Moi",
        en: "Hello",
      },
    },
  ],
  structure: [
    "fzMwD5PQd",
    "fzMwD5PQd",
    ["fzMwD5PQd", ["fzMwD5PQd", "fzMwD5PQd"]],
  ],
};

// No flat fields

const model2 = {
  fields: [
    {
      type: "row",
      fields: [
        {
          type: "richtext",
          fieldId: "content",
          uid: "fzMwD5PQdszrHQLSbdN7Tg",
          value: {
            default: "Moi",
            en: "Hello",
          },
        },
        [
          {
            type: "richtext",
            fieldId: "content",
            uid: "fzMwD5PQdszrHQLSbdN7Tg",
            value: {
              default: "Moi",
              en: "Hello",
            },
          },
          {
            type: "richtext",
            fieldId: "content",
            uid: "fzMwD5PQdszrHQLSbdN7Tg",
            value: {
              default: "Moi",
              en: "Hello",
            },
          },
        ],
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "richtext",
          fieldId: "content",
          uid: "fzMwD5PQdszrHQLSbdN7Tg",
          value: {
            default: "Moi",
            en: "Hello",
          },
        },
        {
          type: "richtext",
          fieldId: "content",
          uid: "fzMwD5PQdszrHQLSbdN7Tg",
          value: {
            default: "Moi",
            en: "Hello",
          },
        },
      ],
    },
    {
      type: "richtext",
      fieldId: "content",
      uid: "fzMwD5PQdszrHQLSbdN7Tg",
      value: {
        default: "Last field, not in section",
        en: "Hello",
      },
    },
  ],
};
