import { login, signup } from '../login/actions';

export default function AdminLoginPage({ searchParams }) {
  const message = searchParams?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736059252/foto5_drbzgu.png"
            className="h-25 w-40"
          />
        </div>
        <h2 className="text-center text-3xl font-bold text-blue-800">Login</h2>

        {message && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-center">
            {message}
          </div>
        )}

        <form className="space-y-6" action={login}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-pink-500 text-white py-2 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="flex-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
