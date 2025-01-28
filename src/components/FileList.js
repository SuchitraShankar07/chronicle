// components/FileList.js
export default function FileList({ files }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Files</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Shared</th>
            <th className="py-2 border-b">File Size</th>
            <th className="py-2 border-b">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2">{file.name}</td>
              <td className="py-2">{file.shared}</td>
              <td className="py-2">{file.size}</td>
              <td className="py-2">{file.modified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
