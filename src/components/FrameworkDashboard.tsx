import { Technology } from "@/types/typedefs";

export default function ModelDashboard({ framework }: { framework: Technology }) {

  return (
    <>
      <div>{framework.name}</div>
      <div>{framework.description}</div>
      <div>{framework.whyGoodOption}</div>
      <div>{framework.link}</div>
    </>
  )
}