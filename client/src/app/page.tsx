import axios from "axios";
import Image from "next/image";
async function getData() {
  const res = await axios.post("http://localhost:3001/users", {
    name: "John",
    nickName: "John",

  });
}
export default function Home() {
  return <main></main>;
}
