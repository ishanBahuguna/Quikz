

interface OptionCardProps {
  option: string;
  title: string;
}

const OptionCard = ({ option, title }: OptionCardProps) => {
  return (
    <div className="bg-gray-800 border border-cyan-400 rounded-xl p-4 shadow-md hover:shadow-cyan-500/50 transition-all duration-300 text-white w-full">
      <h3 className="text-lg font-semibold text-cyan-300 mb-2">{title}</h3>
      <p className="text-md">{option}</p>
    </div>
  );
};

export default OptionCard;













     {/* <div className="space-y-2">
        {/* This creates an array-like object with optionCount number of empty elements.
        Example: { length: 3 } becomes [undefined, undefined, undefined]. */}

        {/* Second argument: (_, index) => (...)
        This is a mapping function applied to each element:

        _ is the placeholder for the current element (which is undefined, so we ignore it).

        index is the current index (0, 1, 2, ...). */}
        {/* {Array.from({ length: optionCount }, (_, index) => (
            <div>
                {`Option ${index+1}`}<input type="text" placeholder="Enter option here" 
                onChange={(e) => setQuizPayload((prev) => ({
                    ...prev,
                    payload:[
                        ...prev.payload,
                    ]
                }))} />
            </div>
        ))} */}
        // </div> */}