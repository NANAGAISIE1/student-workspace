import { auth } from "@/lib/auth";

const Home = async () => {
  const session = await auth();
  return (
    <div className="">
      <p>This is the homepage</p>
      <code>{JSON.stringify(session)}</code>
    </div>
  );
};

export default Home;
