"use client";

import { Profile } from "@/types";
import { useState } from "react";

export default function ProfileInfo({ profile }: Readonly<{ profile: Profile }>) {
  const [extended, setExtended] = useState(false);

  return (
    <div>
      <button onClick={() => setExtended(!extended)}>
        {profile.cute_name}
      </button>
      {extended && <ProfileInfoExtended profile={profile} />}
    </div>
  )
}

function ProfileInfoExtended({ profile }: Readonly<{ profile: Profile }>) {
  return (
    <div>
      <pre>
        {JSON.stringify(profile, undefined, 2)}
      </pre>
    </div>
  )
}