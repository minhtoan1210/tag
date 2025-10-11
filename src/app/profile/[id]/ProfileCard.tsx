"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CardProfileComponent from "./CardProfileComponent";
import { useTranslation } from "react-i18next";

export default function ProfileCardComponent() {
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  const {t} = useTranslation()

  useEffect(() => {
    fetch(`/api/profile/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>{t("profile_page.loading")}</div>;

  return (
    <>
      <Card className="max-w-sm mx-auto p-4 bg-[#1E1E1E] text-white rounded-2xl shadow-md">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-20 w-20 border-2 border-gray-500 mb-3">
            <AvatarImage src={"/default-avatar.png"} alt={""} />
          </Avatar>
          <h2 className="text-lg font-semibold">{list?.data?.user?.email}</h2>
        </CardHeader>

        <Separator className="my-4 bg-gray-700" />

        <CardContent className="flex justify-around">
          <div className="text-center mr-2">
            <p className="text-xl font-bold">{list?.data?.snippets.length}</p>
            <p className="text-gray-400 text-sm">{t("snippets")}</p>
          </div>
        </CardContent>
      </Card>
      <div className="max-w-5xl mx-auto p-6 text-white">
        <CardProfileComponent list={list?.data?.snippets} />
      </div>
    </>
  );
}
