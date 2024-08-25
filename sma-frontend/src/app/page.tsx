// app/page.tsx (main page)

import AllUsers from './components/userList';
import AddPost from './components/inputBox';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">DumpThoughts</h1>
      <AddPost />
    </div>
  );
}
