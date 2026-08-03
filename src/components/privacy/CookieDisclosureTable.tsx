import { cookieCategories } from '../../data/cookieCategories'

export default function CookieDisclosureTable() {
  return (
    <div className="overflow-x-auto">
      <table className="privacy-table min-w-full text-left text-sm">
        <caption className="sr-only">Cookie and browser storage categories</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Purpose</th>
            <th scope="col">Examples</th>
            <th scope="col">Required?</th>
            <th scope="col">Typical duration</th>
            <th scope="col">Control</th>
          </tr>
        </thead>
        <tbody>
          {cookieCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.title}</td>
              <td>{category.purpose}</td>
              <td>{category.examples.join('; ')}</td>
              <td>{category.required ? 'Yes' : 'No'}</td>
              <td>{category.typicalDuration}</td>
              <td>{category.control}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
