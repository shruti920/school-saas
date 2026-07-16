export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Unauthorized
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}