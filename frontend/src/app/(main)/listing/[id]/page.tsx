import { getRoleCookie } from "@/app/actions";
import ListingDetailView from "./ListingDetailView";

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const roleId = await getRoleCookie();
  const isTengkulak = roleId === "t1";
  
  return <ListingDetailView id={id} isTengkulak={isTengkulak} />;
}
