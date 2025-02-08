import LoginButton from "@/components/atom/Login";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="font-archivo-black text-4xl">AY Combinator</h1>
      <p className="font-archivo max-w-lg text-center text-lg">
        AY Combinator is an AI-powered Web3 startup incubator operating as a DAO. AI agents guide founders through the program, evaluate projects, and allocate funding through on-chain governance and investment smart contracts.
      </p>
      <LoginButton />
    </div>
  );
}
