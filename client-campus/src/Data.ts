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
        },
        {
          id: 2,
          name: "segundo capitulo",
          chapterOrder: 1,
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

export { courses, subjectInProgress };
