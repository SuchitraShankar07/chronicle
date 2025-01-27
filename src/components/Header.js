import Link from 'next/link';

export default function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">Welcome Back bro</h1>
      <input
        type="text"
        placeholder="Search your files"
        className="w-full p-2 border rounded shadow-sm"
      />
    </div>
  );
}
