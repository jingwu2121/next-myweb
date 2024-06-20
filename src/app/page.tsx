import Image from "next/image";
import Title from "./components/Title";
import HomeCards from "./components/HomeCards";

export default function Home() {
  return (
    <>
      <Title title="Wu Jing's Home" subtite=":D Welcome to 1990s world!" />
      <HomeCards />
    </>
  );
}
