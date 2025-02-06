"use client";

import { FormEvent, useState } from "react";
import { Profile } from "@/types";
import ProfileInfo from "@/components/ProfileInfo";

export default function Home() {
  const [data, setData] = useState<Profile[]>([]);
  const [username, setUsername] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`api/player?username=${username}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {data?.map(profile => <ProfileInfo key={profile.profile_id} profile={profile} />)}
    </div>
  );
}