import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";

const Cards = () => {
  const { loading, data, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card
              cardType={transaction.category}
              key={transaction._id}
              transaction={transaction}
              // authUser={authUser.authUser}
            />
          ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="text-2xl font-bold text-center w-full">
          No transaction history found.
        </p>
      )}
    </div>
  );
};
export default Cards;
