import React from "react";

const renderData = (someData) => {
  if (!someData) return <div>Hi</div>;

  function reformatString(input) {
    const words = input?.split(/(?=[A-Z])/); // Split the string at each capital letter
    const formattedWords = words?.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    });
    return formattedWords?.join(" ");
  }
  return Object.entries(someData)?.map(([key, value]) => {
    if (value) {
      //  console.log(key, value);
      return (
        <div
          className="flex flex-col flex-wrap border rounded-md text-sm p-2 gap-2 text-gray-500 min-w-[8rem]"
          key={key}
        >
          <p className="font-semibold text-purple-500">{reformatString(key)}</p>
          {key == "exercises" && <>Treatment Plan shown below ⬇</>}
          {typeof value === "object" && !Array.isArray(value) ? (
            // Render nested objects recursively
            renderData(value)
          ) : Array.isArray(value) ? (
            // Render array of objects
            value?.map((obj, index) => (
              <p className="text-sm" key={index}>
                {reformatString(obj?.value)}
              </p>
            ))
          ) : (
            // Render regular key-value pairs
            <p className="text-sm">{value ? reformatString(value) : "null"}</p>
          )}
        </div>
      );
    } else return <></>;
  });
};

function AnyAssesment({ data }) {
  // console.log(data);

  if (!data || Object.keys(data).length === 0)
    return (
      <p className="text-3xl transition-opacity  text-center text-red-500 mx-auto mt-4">
        No Assesment added
      </p>
    );
  return (
    <div className="flex flex-wrap w-full p-4 gap-4 h-[40rem] overflow-y-auto">{renderData(data)}</div>
  );
}

export default AnyAssesment;
