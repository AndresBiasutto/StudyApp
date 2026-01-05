const courses = [
  {
    name: "curso 1",
    description: "curso uno para crear cursos",
    image:
      "https://res.cloudinary.com/dvpchtyzq/image/upload/v1730250678/thePlayer_acfvqj.png",
  },
  {
    name: "curso 2",
    description: "curso dos para crear cursos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
  },
  {
    name: "curso 3",
    description: "curso tres para crear cursos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
  },
  {
    name: "curso 4",
    description: "curso cuatro para crear cursos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
  },
  {
    name: "curso 5",
    description: "curso cinco para crear cursos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
  },
];
const subjectInProgress = {
  name: "mi materia",
  image: "",
  description:
    "esta es la descripción de mi primera materia, puedo dar un resumen de la materia, o una eplicación sobre que temas vamos a tratar, o presentate, o todo, fijate..",
  units: [
    {
      id: 1,
      name: "primera unidad",
      shortDescription: "bla bla bla",
      unitOrder: 1,
      chapters: [
        {
          id: 1,
          name: "primer capitulo",
          chapterOrder: 1,
          description: "la cosa quepasa",
        },
        {
          id: 2,
          name: "segundo capitulo",
          chapterOrder: 2,
          description: "la cosa quepasa",
        },
      ],
    },
    {
      id: 2,
      name: "segunda unidad",
      shortDescription: "bla bla bla",
      unitOrder: 2,
    },
  ],
};
const subject = {
  id: 1,
  name: "Programación 1",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
  units: [
    {
      id: 1,
      name: "introducción",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam,",
      unitOrder: 1,
      chapters: [
        {
          id: 1,
          name: "historia de la programación",
          chapterOrder: 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/U1XZwhsRHQ8",
        },
        {
          id: 2,
          name: "primeros pasos",
          chapterOrder: 2,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
        {
          id: 3,
          name: "Objetivos",
          chapterOrder: 3,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: 2,
      name: "Fundamentos",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam,",
      unitOrder: 2,
      chapters: [
        {
          id: 1,
          name: "Abstracción",
          chapterOrder: 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/U1XZwhsRHQ8",
        },
        {
          id: 2,
          name: "Herencia",
          chapterOrder: 2,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
        {
          id: 3,
          name: "Polimorfismo",
          chapterOrder: 3,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: 3,
      name: "Estructuras de datos básicas",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam,",
      unitOrder: 3,
      chapters: [
        {
          id: 4,
          name: "strings",
          chapterOrder: 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/U1XZwhsRHQ8",
        },
        {
          id: 5,
          name: "numbers",
          chapterOrder: 2,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
        {
          id: 6,
          name: "Booleans",
          chapterOrder: 3,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
        {
          id: 7,
          name: "Variables",
          chapterOrder: 4,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, leo sed sodales ullamcorper, mi ex porttitor quam, aliquet blandit tellus odio porttitor lectus. Mauris vehicula id velit quis ultrices. Aenean nec mattis turpis. Praesent eu enim risus. Nunc eu neque nulla. Quisque suscipit vestibulum elementum. Integer sed feugiat dui. Morbi imperdiet est at lacus placerat faucibus. Proin ut odio ac tellus gravida tincidunt sed sed velit. Integer sit amet sem accumsan, rhoncus elit vel, aliquam felis. Etiam efficitur, ante vel condimentum bibendum, libero leo porta arcu, ac sodales felis augue eget metus.",
          videoUrl: "https://youtu.be/dQw4w9WgXcQ",
        },
      ],
    },
  ],
};

export { courses, subjectInProgress, subject };
