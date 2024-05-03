
import FormEvent from "@/components/Events/FormEvent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TCE - Tribunal de Contas do Estado do Amapá",
  description:
    "TCE - Tribunal de Contas do Estado do Amapá",
};

export default async function Event() {

  // if (!session) {
  //   redirect("/auth/signin");
  // }
  
  return (
    <>
    {/* <ListEvent id={0} /> */}
    <FormEvent />
    </> 
  );
};