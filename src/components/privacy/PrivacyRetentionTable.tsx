import { privacyRetentionItems } from '../../data/privacyRetention'

export default function PrivacyRetentionTable() {
  return (
    <div className="overflow-x-auto">
      <table className="privacy-table min-w-full text-left text-sm">
        <caption className="sr-only">Data retention overview</caption>
        <thead>
          <tr>
            <th scope="col">Data type</th>
            <th scope="col">Where handled</th>
            <th scope="col">Purpose</th>
            <th scope="col">Intended retention</th>
            <th scope="col">Deletion trigger</th>
          </tr>
        </thead>
        <tbody>
          {privacyRetentionItems.map((item) => (
            <tr key={item.id}>
              <td>{item.dataType}</td>
              <td>{item.location}</td>
              <td>{item.purpose}</td>
              <td>{item.retention}</td>
              <td>{item.deletionTrigger}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
