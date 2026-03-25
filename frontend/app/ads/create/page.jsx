import CreateAdForm from "./_components/create-ad-form";

export default function CreateAdPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl text-center mb-8 font-bold">
        Create new ad listing
      </h1>

      <CreateAdForm />
    </div>
  )
}
