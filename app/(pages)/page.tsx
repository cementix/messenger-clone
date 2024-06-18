import AuthForm from "./AuthForm";

export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-gray-100 sm:px-6 lg:px-8 py-12 min-h-full">
      <AuthForm />
    </main>
  );
}
