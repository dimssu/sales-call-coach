import { notFound } from "next/navigation";
import { CALLS, callById } from "@/data/calls";
import { CallDetail } from "@/views/CallDetail";

export function generateStaticParams() {
  return CALLS.map((c) => ({ id: c.id }));
}

export default async function CallPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const call = callById(id);
  if (!call) notFound();
  return <CallDetail call={call} />;
}
