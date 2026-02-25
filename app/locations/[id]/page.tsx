interface Props {
  params: Promise<{ id: string }>;
}

export default async function LocationPage({ params }: Props) {
  const { id } = await params;
  console.log(id);
  return <div>Location ID: {id}</div>;
}
