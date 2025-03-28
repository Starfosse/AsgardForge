import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import { Star } from "lucide-react";

interface FakeComment {
  id: number;
  customerFullName: string;
  rating: number;
  review: string;
  date: string;
}

export default function LastReviews() {
  const fakeData: FakeComment[] = [
    {
      id: 1,
      customerFullName: "John Doe",
      rating: 4,
      review: "Excellent produit, je l'achèterais à nouveau.",
      date: "2021-09-20",
    },
    {
      id: 2,
      customerFullName: "Jane Doe",
      rating: 5,
      review: "Je l'adore, je le recommanderais à n'importe qui.",
      date: "2021-09-21",
    },
    {
      id: 3,
      customerFullName: "John Smith",
      rating: 3,
      review: "C'est correct, je suppose.",
      date: "2021-09-22",
    },
    {
      id: 4,
      customerFullName: "Jane Smith",
      rating: 2,
      review: "Je ne l'aime pas du tout.",
      date: "2021-09-23",
    },
    {
      id: 5,
      customerFullName: "John Doe",
      rating: 1,
      review: "Je le déteste, je veux être remboursé.",
      date: "2021-09-24",
    },
  ];

  return (
    <DashBoardAnalytics className="h-[300px] col-span-1 flex flex-col justify-center space-y-4 text-gray-400 overflow-x-auto whitespace-nowrap">
      <h2 className="font-semibold text-white pt-20">Derniers avis : </h2>
      <div className="flex flex-col space-y-2 divide-y divide-gray-200">
        {fakeData.map((comment) => (
          <div key={comment.id} className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <div className="flex">
                <span className="text-white whitespace-nowrap">
                  {comment.customerFullName}
                </span>
                <div className="pl-1 flex flex-row items-center tex">
                  {[...Array(comment.rating)].fill(Star).map((Icon, index) => (
                    <Icon
                      key={index}
                      size={16}
                      className="text-yellow-500 fill-current "
                    />
                  ))}
                </div>
              </div>
              <span className="text-white">{comment.date}</span>
            </div>
            <div className="flex justify-between"></div>
            <div className=" whitespace-nowrap">{comment.review}</div>
          </div>
        ))}
      </div>
    </DashBoardAnalytics>
  );
}
