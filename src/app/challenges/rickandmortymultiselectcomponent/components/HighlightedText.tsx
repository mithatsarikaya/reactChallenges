const HighlightedText = ({
  name,
  searchedText,
}: {
  name: string;
  searchedText: string;
}) => {
  const parts = name.split(new RegExp(`(${searchedText})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === searchedText.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};

export default HighlightedText;

// function getHighlightedText(text: string, highlight: string) {
//   // Split on highlight term and include term into parts, ignore case
//   const parts = text.split(new RegExp(`(${highlight})`, "gi"));
//   return (
//     <span>
//       {parts.map((part, i) => (
//         <span
//           key={i}
//           style={
//             part.toLowerCase() === highlight.toLowerCase()
//               ? { fontWeight: "bold" }
//               : {}
//           }
//         >
//           {part}
//         </span>
//       ))}
//     </span>
//   );
// }
