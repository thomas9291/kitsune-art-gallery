import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailCart from "../../components/DetailCart";
import LoadingComponent from "../../components/loadingComponent";

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: artDetail, isLoading } = useSWR(`/api/artData/${id}`);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col items-center m-2">
      <DetailCart nameArt={artDetail.name} src={artDetail.url} />
    </div>
  );
}
