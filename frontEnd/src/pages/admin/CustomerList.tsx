interface CustomerData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
}

export default function CustomerList() {
  const fakeCustomer: CustomerData[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "tesrt@test.fr",
      phone: "123456789",
      address: "123 rue de la paix",
      city: "Paris",
      zip: "75000",
      country: "France",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      email: "test2@tst.fr",
      phone: "123456789",
      address: "123 rue de la paix",
      city: "Paris",
      zip: "75000",
      country: "France",
    },
  ];

  return (
    <div className="p-4 relative rounded-lg border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#272E48]">
          <tr>
            {[
              "Nom",
              "Prénom",
              "Email",
              "Téléphone",
              "Adresse",
              "Ville",
              "Code Postal",
              "Pays",
            ].map((item, index) => (
              <th
                key={index}
                className="text-left px-8 py-4 text-sm font-semibold text-white uppercase"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {fakeCustomer.map((customer) => (
            <tr
              key={customer.id}
              className="hover:bg-[#0d101b] transition-colors duration-200"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.firstName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.lastName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.email}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.phone}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.address}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.city}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.zip}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {customer.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
