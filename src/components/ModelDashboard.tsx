import { Database } from "@/types/typedefs";

export default function ModelDashboard({ model }: { model: Database }) {

  return (
    <>
      <div>{model.name}</div>
      <div>{model.description}</div>
      <div>{model.whyGoodOption}</div>
      <div>{model.schema}</div>
      <div>{model.link}</div>
    </>
  )
}