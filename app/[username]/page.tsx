"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    username: string;
  };
};

interface User {
  avatar_url: string;
  login: string;
  html_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  twitter_username: string;
  company: string;
  blog: string;
  name: string;
  location: string;
  email: string;
}

function User({ params: { username } }: Props) {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    const res = await (
      await fetch(`https://api.github.com/users/${username}`)
    ).json();
    setUser(res);
    setLoading(false);
  };

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen">
      <>
        <Link
          passHref
          href="/"
          className="absolute top-[100px] left-[100px] px-6 border rounded-lg py-2 text-slate-500 hover:border-blue-400 transition-[border]"
        >
          Back
        </Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {user ? (
              <>
                <h1 className="text-3xl">git/{username}</h1>
                <div className="my-5"></div>
                <div className="border w-full max-w-4xl flex justify-between gap-5 relative h-full">
                  <div className="flex gap-5 px-7 py-7">
                    <a
                      href={user.html_url}
                      className="absolute -right-4 -top-4 bg-white px-3 py-2 rounded-lg border border-blue-400"
                    >
                      Git Link
                    </a>
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-[100px] rounded-full"
                    />
                    <div className="w-full flex flex-col justify-between">
                      <div>
                        <h1 className="text-2xl">{user.name}</h1>
                        <p className="text-[15px]">{user.bio}</p>
                        <p className="text-[14px]">
                          Site:{" "}
                          {user.blog ? (
                            <a
                              className="hover:underline"
                              target="_blank"
                              href={user.blog}
                            >
                              {user.blog}
                            </a>
                          ) : (
                            "not provided"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 px-4 py-2 border-l">
                    <p className="text-[15px]">
                      Email: {user.email ? user.email : "not provided"}
                    </p>
                    <p className="text-[15px]">
                      Location: {user.location ? user.location : "not provided"}
                    </p>
                    <p className="text-[15px]">
                      Twitter:{" "}
                      {user.twitter_username ? (
                        <a
                          href={user.twitter_username}
                          target="_blank"
                          className="hover:underline"
                        >
                          {user.twitter_username}
                        </a>
                      ) : (
                        "not provided"
                      )}
                    </p>
                  </div>
                </div>
                <p className="flex items-center gap-5 mt-4">
                  <span>Followers: {user.followers}</span>
                  <span>Following: {user.following}</span>
                  <span>Public Repos: {user.public_repos}</span>
                </p>
              </>
            ) : (
              <p>User not found with the username {username}</p>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default User;
