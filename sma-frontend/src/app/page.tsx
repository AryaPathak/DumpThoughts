// app/page.tsx (main page)

import AllUsers from './components/userList';
import AddPost from './home/page';
import LoginPage from './login/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-10 mb-0">DumpThoughts</h1>
      <div className="w-full max-w-lg">
        <LoginPage />
      </div>
    </div>
  );
}



