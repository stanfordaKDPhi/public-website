import type { SisterClassPageDef } from "../types";

/**
 * Hero uses `heroImageFile` under `public/images/sisters/alpha-nu/`.
 * Portraits: `<#>-firstname-lastname.<ext>` (default `.jpg`; set `imageExt: "png"` etc. when needed).
 */
export const alphaNuClassPage: SisterClassPageDef = {
  heroImageFile: "alpha-nu-group.JPG",
  rushTerm: "Spring 2025",
  heroTitle: "Alpha Nu",
  members: [
    {
      lineNumber: 301,
      firstName: "Christina",
      lastName: "Duong",
      nickname: "Little Miss Daybreak",
      big: "Tina \"Little Miss Golden Hour\" Li",
      majorMinor: "Computer Science",
      talkToMeAbout: "Baking, philosophy, tech, and your passions",
    },
    {
      lineNumber: 302,
      firstName: "Gabi",
      lastName: "Guidero",
      nickname: "Fruit Punch",
      big: "Alyna \"Piña Colada\" Lu",
      majorMinor: "Mechanical Engineering",
      talkToMeAbout:
        "Martial arts, hiking, knitting, watercolor, and anything design",
    },
    {
      lineNumber: 303,
      firstName: "Jolie",
      lastName: "Li",
      nickname: "Bellflower",
      big: "Erika \"Lily of the Valley\" Li",
      majorMinor: "Symbolic Systems",
      talkToMeAbout: "Birds, filmmaking, and food spots",
    },
    {
      lineNumber: 308,
      firstName: "Nancy",
      lastName: "Zhang",
      nickname: "Peach Vibe",
      big: "Michelle \"Thai Tea\" Buyan",
      majorMinor:
        "Management Science and Engineering, Sustainability minor",
      talkToMeAbout:
        "Foraging, Google Calendar, Beli, Alt Proteins, being from the Midwest",
    },
    {
      lineNumber: 309,
      firstName: "Grace",
      lastName: "Zhao",
      nickname: "Cardi G",
      big: "Myan \"Myan Thee Stallion\" Ngo",
      majorMinor: "Computer Science",
      talkToMeAbout:
        "Pixar movies, Broadway musicals, and classic novels",
    },
  ],
};
