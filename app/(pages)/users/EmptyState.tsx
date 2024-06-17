const EmptyState = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-10 h-full">
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 font-semibold text-2xl text-gray-900">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
