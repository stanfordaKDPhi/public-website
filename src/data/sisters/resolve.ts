import { discoverMemberPortraitSrc } from "./discoverPortrait";
import { classHeroPath } from "./paths";
import type {
  ClassMemberBio,
  ClassMemberRecord,
  SisterClassPageData,
  SisterClassPageDef,
} from "./types";

function resolveMember(slug: string, m: ClassMemberRecord): ClassMemberBio {
  const portraitSrc =
    m.portraitOverride?.trim() ||
    discoverMemberPortraitSrc(slug, {
      lineNumber: m.lineNumber,
      firstName: m.firstName,
      lastName: m.lastName,
      imageExt: m.imageExt,
    });

  const name = `${m.firstName} ${m.lastName}`.replace(/\s+/g, " ").trim();

  return {
    portraitSrc,
    lineNumber: m.lineNumber,
    name,
    nickname: m.nickname,
    big: m.big,
    little: m.little,
    majorMinor: m.majorMinor,
    talkToMeAbout: m.talkToMeAbout,
  };
}

export function resolveSisterClassPage(
  slug: string,
  def: SisterClassPageDef,
): SisterClassPageData {
  return {
    heroImageSrc: classHeroPath(slug, def.heroImageFile),
    heroAlt: def.heroAlt,
    rushTerm: def.rushTerm,
    heroTitle: def.heroTitle,
    members: def.members.map((m) => resolveMember(slug, m)),
  };
}
