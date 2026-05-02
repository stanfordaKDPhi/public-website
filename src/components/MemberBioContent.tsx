import { AsteriskItalic } from "@/components/AsteriskItalic";
import type { ClassMemberBio } from "@/data/sisters";

/** Category labels — primary brand purple (compassion). */
const labelCls =
  "font-[family-name:var(--font-sans-nav)] font-bold text-[var(--color-compassion)]";

const valueSerif =
  "font-[family-name:var(--font-serif)] text-[0.95rem] leading-relaxed text-neutral-900";

function BioBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className={`text-sm ${labelCls}`}>{label}</p>
      <p className={valueSerif}>
        <AsteriskItalic text={value} />
      </p>
    </div>
  );
}

/** Nickname, Big, Major/Minor, Talk To Me About (flip-card back). */
export function MemberBioFields({ member }: { member: ClassMemberBio }) {
  return (
    <div className="space-y-5 text-left">
      {member.nickname ? (
        <BioBlock label="Nickname:" value={`"${member.nickname}"`} />
      ) : null}
      {member.status ? (
        <BioBlock label="Status:" value={member.status} />
      ) : null}
      {member.big ? <BioBlock label="Big:" value={member.big} /> : null}
      {member.little ? <BioBlock label="Little:" value={member.little} /> : null}
      {member.majorMinor ? (
        <BioBlock label="Major/Minor:" value={member.majorMinor} />
      ) : null}
      {member.talkToMeAbout ? (
        <BioBlock label="Talk To Me About:" value={member.talkToMeAbout} />
      ) : null}
    </div>
  );
}
