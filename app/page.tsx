"use client";

import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

interface User {
  avatar_url: string;
  login: string;
  html_url: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<User[] | null>(null);

  const search = async (username: string) => {
    let res = await (
      await fetch(`https://api.github.com/search/users?q=${username}`, {
        cache: "no-cache",
      })
    ).json();
    if (res.incomplete_results) return;
    setResults(res.items);
  };

  return (
    <main className="h-screen flex-col w-full flex max-w-[700px] mx-auto py-10">
      <div className="flex flex-col">
        <h1 className="text-2xl">Search Github Users</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 space-x-5 flex items-center"
        >
          <input
            type="text"
            placeholder="e.g iamajraj"
            className="w-full border outline-none rounded-lg py-3 px-3"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button
            onClick={() => search(username)}
            className="px-3 rounded-lg border h-full cursor-pointer hover:border-blue-400 transition-[border]"
          >
            Search
          </button>
          <button
            onClick={() => setResults(null)}
            className="px-3 rounded-lg border h-full cursor-pointer hover:border-blue-400 transition-[border]"
          >
            Clear
          </button>
        </form>
      </div>
      <div className="mt-5 pb-10 flex flex-col gap-4">
        {results && (
          <>
            <p className="mb-5">Searching for {username}</p>
            {results.map((user) => (
              <div className="border w-full max-w-4xl px-7 py-7 flex gap-5 relative">
                <Link
                  href={`/${user.login}`}
                  className="absolute -right-4 -top-4 bg-white px-3 py-2 rounded-lg border border-blue-400"
                >
                  Details
                </Link>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-[100px] rounded-full"
                />
                <div className="w-full flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl">{user.login}</h1>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
