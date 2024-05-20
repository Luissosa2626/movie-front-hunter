import Nav from "@/components/Nav";

export default function Layout({children}) {
  return (
    <>
    <div className="bg-blue-500 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-0 rounded-lg p-4">
        {children}
      </div>
    </div>
    </>
  )
}
