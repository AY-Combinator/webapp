import LoginButton from "@/components/atom/Login";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="font-archivo-black text-4xl">AY Combinator</h1>
      <p className="font-archivo max-w-lg text-center text-lg">
        Officia tempor sit consequat adipisicing do adipisicing ut eu. Enim
        proident magna elit veniam reprehenderit non occaecat sunt fugiat do
        amet cupidatat labore. Proident exercitation cupidatat proident
        adipisicing ipsum aliquip reprehenderit irure. Dolor cupidatat minim
        dolor veniam incididunt.
      </p>
      <LoginButton />
    </div>
  );
}
