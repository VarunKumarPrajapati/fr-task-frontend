export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-2 text-2xl text-gray-600">Page Not Found</p>
      <p className="text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
